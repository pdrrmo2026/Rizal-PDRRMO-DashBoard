
export interface FloodRiskData {
  municipality: string;
  totalLandArea: string;
  floodProneArea: string;
  floodPronePercentage: string;
  barangays: { name: string; risk: string }[];
  population: {
    total: string;
    prone: string;
    percentage: string;
    breakdown: { assessment: string; count: number }[];
  };
  schools: { name: string; risk: string }[];
  buildings: { name: string; risk: string }[];
}

export async function fetchFloodRiskData(municipalityName: string): Promise<FloodRiskData | null> {
  const endpoints = {
    barangays: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQrrRhqUirLX4bQXFYT_AqRRCH7yA4Ef1KVUfZIXoEg0ktR89Uk7nq4Ar97bQZX9hGYSyLVAVBQyDSi/pub?gid=671810359&single=true&output=csv',
    population: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQrrRhqUirLX4bQXFYT_AqRRCH7yA4Ef1KVUfZIXoEg0ktR89Uk7nq4Ar97bQZX9hGYSyLVAVBQyDSi/pub?gid=349739599&single=true&output=csv',
    schools: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQrrRhqUirLX4bQXFYT_AqRRCH7yA4Ef1KVUfZIXoEg0ktR89Uk7nq4Ar97bQZX9hGYSyLVAVBQyDSi/pub?gid=1370833021&single=true&output=csv',
    buildings: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQrrRhqUirLX4bQXFYT_AqRRCH7yA4Ef1KVUfZIXoEg0ktR89Uk7nq4Ar97bQZX9hGYSyLVAVBQyDSi/pub?gid=1528254251&single=true&output=csv'
  };

  try {
    const [bRes, pRes, sRes, buildRes] = await Promise.all([
      fetch(endpoints.barangays).then(r => r.text()),
      fetch(endpoints.population).then(r => r.text()),
      fetch(endpoints.schools).then(r => r.text()),
      fetch(endpoints.buildings).then(r => r.text())
    ]);

    // Check if the CSV is for the requested municipality
    // Line 7 or 6 usually has the location
    if (!bRes.toLowerCase().includes(municipalityName.toLowerCase())) {
      // If the CSV doesn't match the municipality, we might be using the wrong sheets
      // For now, if it's Angono, we proceed. For others, we might return null or handle differently.
      if (municipalityName.toLowerCase() !== 'angono') {
         // return null; // Or return mocked/empty data if user expects a card for all
      }
    }

    const data: FloodRiskData = {
      municipality: municipalityName,
      totalLandArea: '14.66 sqkm',
      floodProneArea: '3.06 sqkm',
      floodPronePercentage: '20.88%',
      barangays: parseReportCSV(bRes, 'Name,Assessment'),
      population: {
        total: '130,494',
        prone: '51,223',
        percentage: '39.253%',
        breakdown: parseReportCSV(pRes, 'Assessment,Population').map(p => ({
          assessment: p.name,
          count: parseInt(p.value.replace(/,/g, '')) || 0
        }))
      },
      schools: parseReportCSV(sRes, 'Name,Assessment'),
      buildings: parseReportCSV(buildRes, 'Name,Assessment')
    };

    // Extract area metadata if available in the CSV
    const areaLine = bRes.split(/\r?\n/).find(l => l.includes('sqkm out of'));
    if (areaLine) {
      // ,3.06 sqkm out of 14.66 sqkm (20.88%)
      const match = areaLine.match(/,([\d.]+)\s*sqkm out of ([\d.]+)\s*sqkm\s*\(([\d.]+%)\)/);
      if (match) {
        data.floodProneArea = match[1] + ' sqkm';
        data.totalLandArea = match[2] + ' sqkm';
        data.floodPronePercentage = match[3];
      }
    }

    // Extract population metadata
    const popLine = pRes.split(/\r?\n/).find(l => l.includes('out of') && l.includes('%'));
    if (popLine) {
      // Total Population Prone: ,"51,223 out of 130,494 (39.253%)",,,
      const match = popLine.match(/"?([\d,]+)\s*out of ([\d,]+)\s*\(([\d.]+%)\)"?/);
      if (match) {
        data.population.prone = match[1];
        data.population.total = match[2];
        data.population.percentage = match[3];
      }
    }

    return data;
  } catch (error) {
    console.error('Error fetching flood risk data:', error);
    return null;
  }
}

function parseReportCSV(csvText: string, headerMatch: string): { name: string; value: string }[] {
  const lines = csvText.split(/\r?\n/);
  const tableHeaderIndex = lines.findIndex(l => l.toLowerCase().includes(headerMatch.toLowerCase()));
  if (tableHeaderIndex === -1) return [];

  return lines.slice(tableHeaderIndex + 1)
    .filter(l => l.trim() && l.includes(','))
    .map(line => {
      // Handle quoted values (e.g. "Carlos ""Botong"" Francisco")
      const values: string[] = [];
      let current = '';
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          if (inQuotes && line[i+1] === '"') { // Escaped quote
            current += '"';
            i++;
          } else {
            inQuotes = !inQuotes;
          }
        } else if (char === ',' && !inQuotes) {
          values.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      values.push(current.trim());
      
      return { 
        name: values[0]?.replace(/^"|"$/g, '') || '', 
        value: values[1]?.replace(/^"|"$/g, '') || '' 
      };
    })
    .filter(item => item.name && item.value);
}
