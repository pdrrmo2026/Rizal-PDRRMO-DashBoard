const GITHUB_BASE_URL = "https://raw.githubusercontent.com/pdrrmo2026/Rizal-PDRRMO-DashBoard/main/evacuation_centers";

export interface EvacuationCenter {
  name: string;
  location: string;
  capacity: string | number;
  capacityFamily: string | number;
  floorArea: string | number;
  type: string;
  features: string;
  proximity: string;
  waterSource: string;
  remarks: string;
  lat: number;
  lng: number;
  contact: string;
}

export async function fetchMunicipalityEvacData(municipalityName: string): Promise<EvacuationCenter[]> {
  const fileName = `Evacuation_Centers_${municipalityName}.csv`;
  const url = `${GITHUB_BASE_URL}/${encodeURIComponent(fileName)}?t=${Date.now()}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data for ${municipalityName}`);
    }
    
    const csvText = await response.text();
    return parseEvacCSV(csvText);
  } catch (error) {
    console.error(`Error fetching GitHub data for ${municipalityName}:`, error);
    return [];
  }
}

function parseEvacCSV(csvText: string): EvacuationCenter[] {
  // Handle different line endings (\r\n or \n)
  const lines = csvText.split(/\r?\n/);
  if (lines.length < 2) return [];
  
  // Skip header
  const dataLines = lines.slice(1);
  
  return dataLines
    .filter(line => line.trim() !== '')
    .map(line => {
      // Simple CSV parser handling quotes
      const values: string[] = [];
      let currentValue = '';
      let inQuotes = false;
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(currentValue.trim());
          currentValue = '';
        } else {
          currentValue += char;
        }
      }
      values.push(currentValue.trim());
      
      // Helper to clean numeric strings (remove commas, spaces, etc.)
      const cleanNum = (val: any) => {
        if (typeof val !== 'string') return val;
        const cleaned = val.replace(/[^\d.-]/g, '');
        return cleaned || 0;
      };

      return {
        name: values[0]?.replace(/^"|"$/g, '') || '',
        location: values[1]?.replace(/^"|"$/g, '') || '',
        capacity: cleanNum(values[2]),
        capacityFamily: cleanNum(values[3]),
        floorArea: cleanNum(values[4]),
        type: values[5]?.replace(/^"|"$/g, '') || '',
        features: values[6]?.replace(/^"|"$/g, '') || '',
        proximity: values[7]?.replace(/^"|"$/g, '') || '',
        waterSource: values[8]?.replace(/^"|"$/g, '') || '',
        remarks: values[9]?.replace(/^"|"$/g, '') || '',
        lat: parseFloat(cleanNum(values[10])) || 0,
        lng: parseFloat(cleanNum(values[11])) || 0,
        contact: values[12]?.replace(/^"|"$/g, '') || ''
      };
    });
}
