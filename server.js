import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'evacuation_centers_db.json');
const EVAC_DIR = path.join(__dirname, 'evacuation_centers');

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.text({ limit: '50mb' }));

// Initial data load/file creation
async function initDB() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify({}), 'utf8');
  }
  try {
    await fs.access(EVAC_DIR);
  } catch {
    await fs.mkdir(EVAC_DIR, { recursive: true });
  }
}

// GET all evacuation data
app.get('/api/evacuation-centers', async (req, res) => {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: 'Failed to read data' });
  }
});

// POST update evacuation data
app.post('/api/evacuation-centers', async (req, res) => {
  try {
    const newData = req.body;
    await fs.writeFile(DATA_FILE, JSON.stringify(newData, null, 2), 'utf8');
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save data' });
  }
});

// POST github sync (upload/replace)
app.post('/api/github/evac/:municipality', async (req, res) => {
  try {
    const { municipality } = req.params;
    const csvContent = req.body; // Expecting raw text
    
    if (!csvContent || typeof csvContent !== 'string') {
      return res.status(400).json({ error: 'Invalid CSV content' });
    }

    const fileName = `Evacuation_Centers_${municipality}.csv`;
    const filePath = path.join(EVAC_DIR, fileName);

    await fs.writeFile(filePath, csvContent, 'utf8');

    // Run git commands
    await execPromise(`git add "${filePath}"`, { cwd: __dirname });
    await execPromise(`git commit -m "Update evacuation centers for ${municipality}"`, { cwd: __dirname });
    await execPromise(`git push`, { cwd: __dirname });

    res.json({ success: true, message: `Successfully pushed ${fileName} to GitHub` });
  } catch (error) {
    console.error('GitHub Sync Error:', error);
    // Ignore error if nothing to commit
    if (error.stdout && error.stdout.includes('nothing to commit')) {
      return res.json({ success: true, message: 'No changes to commit' });
    }
    res.status(500).json({ error: 'Failed to sync to GitHub', details: error.message });
  }
});

// DELETE github sync (delete)
app.delete('/api/github/evac/:municipality', async (req, res) => {
  try {
    const { municipality } = req.params;
    const fileName = `Evacuation_Centers_${municipality}.csv`;
    const filePath = path.join(EVAC_DIR, fileName);

    try {
      await fs.access(filePath);
      await fs.unlink(filePath);
    } catch {
      // File doesn't exist, just return success
      return res.json({ success: true, message: 'File already deleted' });
    }

    // Run git commands
    await execPromise(`git add "${filePath}"`, { cwd: __dirname });
    await execPromise(`git commit -m "Remove evacuation centers for ${municipality}"`, { cwd: __dirname });
    await execPromise(`git push`, { cwd: __dirname });

    res.json({ success: true, message: `Successfully deleted and pushed ${fileName}` });
  } catch (error) {
    console.error('GitHub Sync Delete Error:', error);
    if (error.stdout && error.stdout.includes('nothing to commit')) {
      return res.json({ success: true, message: 'No changes to commit' });
    }
    res.status(500).json({ error: 'Failed to sync deletion to GitHub', details: error.message });
  }
});

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
  });
});
