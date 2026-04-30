
export interface PopulationAgeBreakdown {
  ageGroup: string;
  maleNotProne: string;
  maleProne: string;
  femaleNotProne: string;
  femaleProne: string;
}

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
    ageBreakdown: PopulationAgeBreakdown[];
  };
  schools: { name: string; risk: string }[];
  buildings: { name: string; risk: string }[];
}

import { FALLBACK_HAZARDS } from './floodRiskFallbackData';

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
    const isMatchingMunicipality = bRes.toLowerCase().includes(municipalityName.toLowerCase());
    
    if (!isMatchingMunicipality) {
      // Fallback to hardcoded data if live data is not for this municipality
      const fallbackBarangays = FALLBACK_HAZARDS[municipalityName] || FALLBACK_HAZARDS[municipalityName.replace(' City', '')] || {};
      const fallbackList = Object.entries(fallbackBarangays).map(([name, risk]) => ({ name, risk }));
      
      if (fallbackList.length > 0) {
        return {
          municipality: municipalityName,
          totalLandArea: '---',
          floodProneArea: '---',
          floodPronePercentage: '0%',
          barangays: fallbackList,
          population: { total: '---', prone: '---', percentage: '0%', breakdown: [], ageBreakdown: [] },
          schools: [],
          buildings: []
        };
      }
      return null;
    }

    const data: FloodRiskData = {
      municipality: municipalityName,
      totalLandArea: '---',
      floodProneArea: '---',
      floodPronePercentage: '0%',
      barangays: parseReportCSV(bRes, 'Name,Assessment').map(b => ({ name: b.name, risk: b.value })),
      population: {
        total: '---',
        prone: '---',
        percentage: '0%',
        breakdown: parseReportCSV(pRes, 'Assessment,Population').map(p => ({
          assessment: p.name,
          count: parseInt(p.value.replace(/,/g, '')) || 0
        })),
        ageBreakdown: parseAgeGroupCSV(pRes)
      },
      schools: parseReportCSV(sRes, 'Name,Assessment').map(s => ({ name: s.name, risk: s.value })),
      buildings: parseReportCSV(buildRes, 'Name,Assessment').map(b => ({ name: b.name, risk: b.value }))
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

function parseAgeGroupCSV(csvText: string): PopulationAgeBreakdown[] {
  const lines = csvText.split(/\r?\n/);
  const headerIndex = lines.findIndex(l => l.toLowerCase().includes('age group'));
  if (headerIndex === -1) return [];

  return lines.slice(headerIndex + 1)
    .filter(l => l.trim() && l.includes(','))
    .map(line => {
      const values: string[] = [];
      let current = '';
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          if (inQuotes && line[i+1] === '"') {
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
        ageGroup: values[0]?.replace(/^"|"$/g, '') || '', 
        maleNotProne: values[1]?.replace(/^"|"$/g, '') || '0',
        maleProne: values[2]?.replace(/^"|"$/g, '') || '0',
        femaleNotProne: values[3]?.replace(/^"|"$/g, '') || '0',
        femaleProne: values[4]?.replace(/^"|"$/g, '') || '0'
      };
    })
    .filter(item => item.ageGroup && (item.maleProne !== '0' || item.femaleProne !== '0' || item.maleNotProne !== '0' || item.femaleNotProne !== '0'));
}

function parseReportCSV(csvText: string, headerMatch: string): { name: string; value: string }[] {
  const lines = csvText.split(/\r?\n/);
  const tableHeaderIndex = lines.findIndex(l => l.toLowerCase().includes(headerMatch.toLowerCase()));
  if (tableHeaderIndex === -1) return [];

  const results: { name: string; value: string }[] = [];
  
  // Start from the line after the header
  for (let i = tableHeaderIndex + 1; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // STOP if we hit an empty line or a line that only contains commas
    if (!line || line.replace(/,/g, '').trim() === '') break;
    
    if (line.includes(',')) {
      const values: string[] = [];
      let current = '';
      let inQuotes = false;
      for (let j = 0; j < line.length; j++) {
        const char = line[j];
        if (char === '"') {
          if (inQuotes && line[j+1] === '"') {
            current += '"';
            j++;
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
      
      const name = values[0]?.replace(/^"|"$/g, '') || '';
      const value = values[1]?.replace(/^"|"$/g, '') || '';
      
      if (name && value) {
        results.push({ name, value });
      }
    }
  }
  
  return results;
}
