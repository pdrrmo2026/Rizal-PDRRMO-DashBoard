
import { FALLBACK_HAZARDS } from './floodRiskFallbackData'; // We can use the same fallback structure if needed, or create a separate one for landslides

export interface LandslideRiskData {
  municipality: string;
  totalLandArea: string;
  proneArea: string;
  pronePercentage: string;
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

export async function fetchLandslideRiskData(municipalityName: string): Promise<LandslideRiskData | null> {
  const endpoints = {
    barangays: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQrrRhqUirLX4bQXFYT_AqRRCH7yA4Ef1KVUfZIXoEg0ktR89Uk7nq4Ar97bQZX9hGYSyLVAVBQyDSi/pub?gid=1238424975&single=true&output=csv',
    population: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQrrRhqUirLX4bQXFYT_AqRRCH7yA4Ef1KVUfZIXoEg0ktR89Uk7nq4Ar97bQZX9hGYSyLVAVBQyDSi/pub?gid=914833487&single=true&output=csv',
    schools: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQrrRhqUirLX4bQXFYT_AqRRCH7yA4Ef1KVUfZIXoEg0ktR89Uk7nq4Ar97bQZX9hGYSyLVAVBQyDSi/pub?gid=1469042460&single=true&output=csv',
    buildings: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQrrRhqUirLX4bQXFYT_AqRRCH7yA4Ef1KVUfZIXoEg0ktR89Uk7nq4Ar97bQZX9hGYSyLVAVBQyDSi/pub?gid=573547214&single=true&output=csv'
  };

  try {
    const [bRes, pRes, sRes, buildRes] = await Promise.all([
      fetch(endpoints.barangays).then(r => r.text()),
      fetch(endpoints.population).then(r => r.text()),
      fetch(endpoints.schools).then(r => r.text()),
      fetch(endpoints.buildings).then(r => r.text())
    ]);

    const isMatchingMunicipality = bRes.toLowerCase().includes(municipalityName.toLowerCase());

    if (!isMatchingMunicipality) {
      // For now, if not matching, we return null or handle fallback
      // Since landslide specific fallback isn't provided yet, we'll return null or a basic structure
      return null;
    }

    const data: LandslideRiskData = {
      municipality: municipalityName,
      totalLandArea: '---',
      proneArea: '---',
      pronePercentage: '0%',
      barangays: parseReportCSV(bRes, 'Name,Assessment').map(b => ({ name: b.name, risk: b.value })),
      population: {
        total: '---',
        prone: '---',
        percentage: '0%',
        breakdown: parseReportCSV(pRes, 'Assessment,Population').map(p => ({
          assessment: p.name,
          count: parseInt(p.value.replace(/,/g, '')) || 0
        }))
      },
      schools: parseReportCSV(sRes, 'Name,Assessment').map(s => ({ name: s.name, risk: s.value })),
      buildings: parseReportCSV(buildRes, 'Name,Assessment').map(b => ({ name: b.name, risk: b.value }))
    };

    // Extract area metadata
    const areaLine = bRes.split(/\r?\n/).find(l => l.includes('sqkm out of'));
    if (areaLine) {
      // "Angono, Rizal, Region IV-A (CALABARZON)",11.6 sqkm out of 14.66 sqkm (79.12%)
      const match = areaLine.match(/,([\d.]+)\s*sqkm out of ([\d.]+)\s*sqkm\s*\(([\d.]+%)\)/);
      if (match) {
        data.proneArea = match[1] + ' sqkm';
        data.totalLandArea = match[2] + ' sqkm';
        data.pronePercentage = match[3];
      }
    }

    // Extract population metadata
    const popLine = pRes.split(/\r?\n/).find(l => l.includes('out of') && l.includes('%'));
    if (popLine) {
      const match = popLine.match(/"?([\d,]+)\s*out of ([\d,]+)\s*\(([\d.]+%)\)"?/);
      if (match) {
        data.population.prone = match[1];
        data.population.total = match[2];
        data.population.percentage = match[3];
      }
    }

    return data;
  } catch (error) {
    console.error('Error fetching landslide risk data:', error);
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
      const values: string[] = [];
      let current = '';
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          if (inQuotes && line[i + 1] === '"') {
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
