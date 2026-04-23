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
  const url = `${GITHUB_BASE_URL}/${encodeURIComponent(fileName)}`;
  
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
  const lines = csvText.split('\n');
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
          values.push(currentValue);
          currentValue = '';
        } else {
          currentValue += char;
        }
      }
      values.push(currentValue);
      
      return {
        name: values[0] || '',
        location: values[1] || '',
        capacity: values[2] || 0,
        capacityFamily: values[3] || 0,
        floorArea: values[4] || 0,
        type: values[5] || '',
        features: values[6] || '',
        proximity: values[7] || '',
        waterSource: values[8] || '',
        remarks: values[9] || '',
        lat: parseFloat(values[10]) || 0,
        lng: parseFloat(values[11]) || 0,
        contact: values[12] || ''
      };
    });
}
