import { useState, useEffect } from 'react';
import { MapPin, Home, Info, X, ChevronRight, Search, Download, Upload, ExternalLink, RefreshCw } from 'lucide-react';
import { fetchMunicipalityEvacData } from '../services/githubDataService';
import EvacuationCentersModal, { EvacuationCenter } from './EvacuationCentersModal';

interface BarangayPopulation {
  name: string;
  population: number;
}

interface MunicipalityProfile {
  name: string;
  district: string | null;
  totalPopulation: number;
  barangays: BarangayPopulation[];
}

const RIZAL_MUNICIPALITIES: MunicipalityProfile[] = [
  {
    name: 'Angono',
    district: '1st District',
    totalPopulation: 134975,
    barangays: [
      { name: 'Bagumbayan', population: 2594 },
      { name: 'Kalayaan', population: 20886 },
      { name: 'Poblacion Ibaba', population: 3747 },
      { name: 'Poblacion Itaas', population: 539 },
      { name: 'San Isidro', population: 35744 },
      { name: 'San Pedro', population: 1875 },
      { name: 'San Roque', population: 13071 },
      { name: 'San Vicente', population: 14518 },
      { name: 'Santo Nino', population: 2275 },
      { name: 'Mahabang Parang', population: 39726 },
    ],
  },
  {
    name: 'Antipolo City',
    district: null,
    totalPopulation: 913712,
    barangays: [
      { name: 'Calawis', population: 8935 },
      { name: 'Cupang', population: 135996 },
      { name: 'Dela Paz', population: 81538 },
      { name: 'Mayamot', population: 53654 },
      { name: 'San Isidro', population: 67433 },
      { name: 'San Jose', population: 129351 },
      { name: 'San Roque', population: 74242 },
      { name: 'Mambugan', population: 55664 },
      { name: 'Bagong Nayon', population: 50326 },
      { name: 'Beverly Hills', population: 1069 },
      { name: 'Dalig', population: 60743 },
      { name: 'Inarawan', population: 33061 },
      { name: 'San Juan', population: 10441 },
      { name: 'San Luis', population: 69136 },
      { name: 'Santa Cruz', population: 67447 },
      { name: 'Muntingdilaw', population: 14676 },
    ],
  },
  {
    name: 'Baras',
    district: '2nd District',
    totalPopulation: 91099,
    barangays: [
      { name: 'Evangelista', population: 4249 },
      { name: 'Rizal', population: 2451 },
      { name: 'San Jose', population: 5328 },
      { name: 'San Salvador', population: 12724 },
      { name: 'Santiago', population: 4204 },
      { name: 'Concepcion', population: 1413 },
      { name: 'San Juan', population: 4970 },
      { name: 'San Miguel', population: 1301 },
      { name: 'Mabini', population: 2925 },
      { name: 'Pinugay', population: 51534 },
    ],
  },
  {
    name: 'Binangonan',
    district: '1st District',
    totalPopulation: 321281,
    barangays: [
      { name: 'Bangad', population: 1472 },
      { name: 'Batingan', population: 14990 },
      { name: 'Bilibiran', population: 19911 },
      { name: 'Binitagan', population: 540 },
      { name: 'Bombong', population: 3215 },
      { name: 'Buhangin', population: 1881 },
      { name: 'Calumpang', population: 21095 },
      { name: 'Ginoong Sanay', population: 1805 },
      { name: 'Gulod', population: 1188 },
      { name: 'Habagatan', population: 1262 },
      { name: 'Ithan', population: 3775 },
      { name: 'Janosa', population: 2884 },
      { name: 'Kalawaan', population: 39979 },
      { name: 'Kalinawan', population: 1663 },
      { name: 'Kasile', population: 479 },
      { name: 'Kaytome', population: 2313 },
      { name: 'Kinaboogan', population: 1321 },
      { name: 'Kinagatan', population: 1379 },
      { name: 'Libis', population: 5012 },
      { name: 'Limbon-limbon', population: 1807 },
      { name: 'Lunsad', population: 11877 },
      { name: 'Mahabang Parang', population: 12665 },
      { name: 'Macamot', population: 11284 },
      { name: 'Mambog', population: 11814 },
      { name: 'Palangoy', population: 18060 },
      { name: 'Pantok', population: 18431 },
      { name: 'Pila Pila', population: 9659 },
      { name: 'Pinagdilawan', population: 767 },
      { name: 'Pipindan', population: 2605 },
      { name: 'Rayap', population: 1989 },
      { name: 'Sapang', population: 2381 },
      { name: 'Tabon', population: 688 },
      { name: 'Tagpos', population: 16161 },
      { name: 'Tatala', population: 17625 },
      { name: 'Tayuman', population: 12565 },
      { name: 'Layunan', population: 2409 },
      { name: 'Libid', population: 8072 },
      { name: 'Malakaban', population: 1255 },
      { name: 'Pag-Asa', population: 19387 },
      { name: 'San Carlos', population: 13616 },
    ],
  },
  {
    name: 'Cainta',
    district: '1st District',
    totalPopulation: 386321,
    barangays: [
      { name: 'San Andres', population: 122983 },
      { name: 'San Isidro', population: 89533 },
      { name: 'San Juan', population: 106450 },
      { name: 'San Roque', population: 10704 },
      { name: 'Santa Rosa', population: 1776 },
      { name: 'Santo Nino', population: 6349 },
      { name: 'Santo Domingo', population: 48526 },
    ],
  },
  {
    name: 'Cardona',
    district: '2nd District',
    totalPopulation: 51493,
    barangays: [
      { name: 'Balibago', population: 1792 },
      { name: 'Boor', population: 1341 },
      { name: 'Calahan', population: 5963 },
      { name: 'Dalig', population: 6955 },
      { name: 'Del Remedio', population: 2125 },
      { name: 'Iglesia', population: 1921 },
      { name: 'Lambac', population: 1789 },
      { name: 'Looc', population: 10433 },
      { name: 'Malanggam-Calubacan', population: 497 },
      { name: 'Nagsulo', population: 387 },
      { name: 'Navotas', population: 3375 },
      { name: 'Patunhay', population: 2098 },
      { name: 'Real', population: 337 },
      { name: 'Sampad', population: 2358 },
      { name: 'San Roque', population: 3071 },
      { name: 'Subay', population: 4080 },
      { name: 'Ticulio', population: 2269 },
      { name: 'Tuna', population: 702 },
    ],
  },
  {
    name: 'Jalajala',
    district: '2nd District',
    totalPopulation: 34901,
    barangays: [
      { name: 'Bagumbong', population: 3533 },
      { name: 'Bayugo', population: 5414 },
      { name: 'Second District', population: 2468 },
      { name: 'Third District', population: 3221 },
      { name: 'Lubo', population: 1981 },
      { name: 'Pagkalinawan', population: 2156 },
      { name: 'Palaypalay', population: 2370 },
      { name: 'Punta', population: 3027 },
      { name: 'Sipsipin', population: 5760 },
      { name: 'Special District', population: 4527 },
      { name: 'Paalaman', population: 444 },
    ],
  },
  {
    name: 'Morong',
    district: '2nd District',
    totalPopulation: 72262,
    barangays: [
      { name: 'Bombongan', population: 4003 },
      { name: 'Can-Cal-Lan', population: 4931 },
      { name: 'Lagundi', population: 10126 },
      { name: 'Maybancal', population: 18224 },
      { name: 'San Guillermo', population: 13089 },
      { name: 'San Jose', population: 4419 },
      { name: 'San Juan', population: 11258 },
      { name: 'San Pedro', population: 6212 },
    ],
  },
  {
    name: 'Pililla',
    district: '2nd District',
    totalPopulation: 72503,
    barangays: [
      { name: 'Bagumbayan', population: 13483 },
      { name: 'Halayhayin', population: 9806 },
      { name: 'Hulo', population: 12126 },
      { name: 'Imatong', population: 794 },
      { name: 'Malaya', population: 7546 },
      { name: 'Niogan', population: 5850 },
      { name: 'Quisao', population: 17361 },
      { name: 'Wawa', population: 3950 },
      { name: 'Takungan', population: 1587 },
    ],
  },
  {
    name: 'Rodriguez (Montalban)',
    district: '4th District',
    totalPopulation: 451383,
    barangays: [
      { name: 'Balite', population: 8302 },
      { name: 'Burgos', population: 50396 },
      { name: 'Geronimo', population: 6829 },
      { name: 'Macabud', population: 10657 },
      { name: 'Manggahan', population: 18394 },
      { name: 'Mascap', population: 5436 },
      { name: 'Puray', population: 3683 },
      { name: 'Rosario', population: 6521 },
      { name: 'San Isidro', population: 164822 },
      { name: 'San Jose', population: 143031 },
      { name: 'San Rafael', population: 33312 },
    ],
  },
  {
    name: 'San Mateo',
    district: '3rd District',
    totalPopulation: 276449,
    barangays: [
      { name: 'Ampid I', population: 26953 },
      { name: 'Dulong Bayan 1', population: 4875 },
      { name: 'Dulong Bayan 2', population: 12657 },
      { name: 'Guinayang', population: 10615 },
      { name: 'Guitnang Bayan I', population: 35943 },
      { name: 'Guitnang Bayan II', population: 19282 },
      { name: 'Malanday', population: 15438 },
      { name: 'Maly', population: 16744 },
      { name: 'Santa Ana', population: 10332 },
      { name: 'Ampid II', population: 4288 },
      { name: 'Banaba', population: 27532 },
      { name: 'Gulod Malaya', population: 13127 },
      { name: 'Pintong Bocawe', population: 6094 },
      { name: 'Santo Nino', population: 13285 },
      { name: 'Silangan', population: 59284 },
    ],
  },
  {
    name: 'Tanay',
    district: '2nd District',
    totalPopulation: 145597,
    barangays: [
      { name: 'Cayabu', population: 1116 },
      { name: 'Cuyambay', population: 4205 },
      { name: 'Daraitan', population: 5870 },
      { name: 'Katipunan-Bayan', population: 6246 },
      { name: 'Kaybuto', population: 9166 },
      { name: 'Laiban', population: 2425 },
      { name: 'Mag-Ampon', population: 1989 },
      { name: 'Mamuyao', population: 919 },
      { name: 'Pinagkamaligan', population: 3629 },
      { name: 'Plaza Aldea', population: 33322 },
      { name: 'Sampaloc', population: 32624 },
      { name: 'San Andres', population: 1477 },
      { name: 'San Isidro', population: 3288 },
      { name: 'Santa Inez', population: 2460 },
      { name: 'Santo Nino', population: 1549 },
      { name: 'Tabing Ilog', population: 1891 },
      { name: 'Tandang Kutyo', population: 21243 },
      { name: 'Tinucan', population: 1230 },
      { name: 'Wawa', population: 8106 },
      { name: 'Madilay-dilay', population: 2842 },
    ],
  },
  {
    name: 'Taytay',
    district: '1st District',
    totalPopulation: 397111,
    barangays: [
      { name: 'Dolores', population: 75883 },
      { name: 'Muzon', population: 34422 },
      { name: 'San Isidro', population: 42362 },
      { name: 'San Juan', population: 135535 },
      { name: 'Santa Ana', population: 108909 },
    ],
  },
  {
    name: 'Teresa',
    district: '2nd District',
    totalPopulation: 67454,
    barangays: [
      { name: 'Bagumbayan', population: 14732 },
      { name: 'Dalig', population: 15146 },
      { name: 'Dulumbayan', population: 10027 },
      { name: 'May-Iba', population: 7134 },
      { name: 'Poblacion', population: 1100 },
      { name: 'Prinza', population: 7790 },
      { name: 'San Gabriel', population: 6101 },
      { name: 'San Roque', population: 4097 },
      { name: 'Calumpang Santo Cristo', population: 1327 },
    ],
  },
];

const districtStyle: Record<string, string> = {
  '1st District': 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300',
  '2nd District': 'bg-blue-500/15 border-blue-500/30 text-blue-300',
  '3rd District': 'bg-violet-500/15 border-violet-500/30 text-violet-300',
  '4th District': 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
};

const floodRiskNeutralStyle = 'border-slate-300 bg-slate-100 text-slate-900';

const floodRiskSourceUrl = 'https://geoanalytics.georisk.gov.ph/';

const FLOOD_HAZARD_ORDER = ['Low', 'Moderate', 'High', 'Very High'] as const;

function buildHazardMap(entries: Array<{ name: string; level: (typeof FLOOD_HAZARD_ORDER)[number] }>): Record<string, string> {
  const buckets = new Map<string, Set<(typeof FLOOD_HAZARD_ORDER)[number]>>();

  for (const entry of entries) {
    const key = normalizeBarangayName(entry.name.replace(/\(.*?\)/g, ''));
    if (!buckets.has(key)) buckets.set(key, new Set());
    buckets.get(key)?.add(entry.level);
  }

  const result: Record<string, string> = {};
  for (const [key, levels] of buckets.entries()) {
    const merged = FLOOD_HAZARD_ORDER.filter((level) => levels.has(level)).join('/');
    result[key] = merged;
  }

  return result;
}

const ANGONO_FLOOD_HAZARD = buildHazardMap([
  { name: 'Bagumbayan', level: 'Very High' },
  { name: 'Kalayaan', level: 'Very High' },
  { name: 'Poblacion Ibaba', level: 'Very High' },
  { name: 'Poblacion Itaas', level: 'Very High' },
  { name: 'San Isidro', level: 'Very High' },
  { name: 'San Pedro', level: 'Very High' },
  { name: 'San Vicente', level: 'Very High' },
  { name: 'Santo Nino', level: 'Very High' },
  { name: 'Kalayaan', level: 'High' },
  { name: 'Mahabang Parang', level: 'High' },
  { name: 'Poblacion Itaas', level: 'High' },
  { name: 'San Isidro', level: 'High' },
  { name: 'San Pedro', level: 'High' },
  { name: 'San Roque', level: 'High' },
  { name: 'Santo Nino', level: 'High' },
]);

const ANTIPOLO_FLOOD_HAZARD = buildHazardMap([
  { name: 'Mayamot', level: 'Very High' },
  { name: 'Mayamot', level: 'High' },
  { name: 'San Jose (Pob.)', level: 'High' },
  { name: 'Calawis', level: 'High' },
  { name: 'Dalig', level: 'High' },
  { name: 'Inarawan', level: 'High' },
  { name: 'San Isidro (Pob.)', level: 'High' },
  { name: 'San Luis', level: 'High' },
  { name: 'Beverly Hills', level: 'High' },
  { name: 'Cupang', level: 'High' },
  { name: 'Dela Paz (Pob.)', level: 'High' },
  { name: 'Mambugan', level: 'High' },
  { name: 'Muntingdilaw', level: 'High' },
  { name: 'San Roque (Pob.)', level: 'High' },
  { name: 'Santa Cruz', level: 'High' },
  { name: 'San Juan', level: 'High' },
  { name: 'Bagong Nayon', level: 'High' },
  { name: 'San Jose (Pob.)', level: 'Moderate' },
  { name: 'Beverly Hills', level: 'Moderate' },
  { name: 'Dalig', level: 'Moderate' },
  { name: 'Dela Paz (Pob.)', level: 'Moderate' },
  { name: 'San Roque (Pob.)', level: 'Moderate' },
  { name: 'Cupang', level: 'Moderate' },
  { name: 'Mayamot', level: 'Moderate' },
  { name: 'San Juan', level: 'Moderate' },
  { name: 'Calawis', level: 'Moderate' },
  { name: 'San Isidro (Pob.)', level: 'Moderate' },
  { name: 'San Luis', level: 'Moderate' },
  { name: 'Santa Cruz', level: 'Moderate' },
  { name: 'Cupang', level: 'Low' },
]);

const BARAS_FLOOD_HAZARD = buildHazardMap([
  { name: 'Concepcion', level: 'Very High' },
  { name: 'Evangelista', level: 'Very High' },
  { name: 'Mabini', level: 'Very High' },
  { name: 'Santiago', level: 'Very High' },
  { name: 'Concepcion', level: 'High' },
  { name: 'Evangelista', level: 'High' },
  { name: 'Mabini', level: 'High' },
  { name: 'Rizal (Pob.)', level: 'High' },
  { name: 'San Jose', level: 'High' },
  { name: 'San Juan', level: 'High' },
  { name: 'San Salvador', level: 'High' },
  { name: 'San Miguel', level: 'High' },
  { name: 'Santiago', level: 'High' },
  { name: 'Pinugay', level: 'High' },
  { name: 'Concepcion', level: 'Moderate' },
  { name: 'Evangelista', level: 'Moderate' },
  { name: 'Mabini', level: 'Moderate' },
  { name: 'San Juan', level: 'Moderate' },
  { name: 'San Miguel', level: 'Moderate' },
]);

const BINANGONAN_FLOOD_HAZARD = buildHazardMap([
  { name: 'Pag-Asa', level: 'Very High' },
  { name: 'Tagpos', level: 'Very High' },
  { name: 'Tayuman', level: 'Very High' },
  { name: 'Kasile', level: 'High' },
  { name: 'Batingan', level: 'High' },
  { name: 'Calumpang', level: 'High' },
  { name: 'Macamot', level: 'High' },
  { name: 'Kalawaan', level: 'High' },
  { name: 'Pantok', level: 'High' },
  { name: 'Bilibiran', level: 'High' },
  { name: 'Palangoy', level: 'High' },
  { name: 'San Carlos', level: 'High' },
  { name: 'Sapang', level: 'Moderate' },
  { name: 'Bombong', level: 'Moderate' },
  { name: 'Kinaboogan', level: 'Moderate' },
  { name: 'Kinagatan', level: 'Moderate' },
  { name: 'Malakaban', level: 'Moderate' },
  { name: 'Layunan (Pob.)', level: 'Moderate' },
  { name: 'Libid (Pob.)', level: 'Moderate' },
  { name: 'Libis (Pob.)', level: 'Moderate' },
  { name: 'Mahabang Parang', level: 'Moderate' },
  { name: 'Tatala', level: 'Moderate' },
  { name: 'Mambog', level: 'Moderate' },
  { name: 'Habagatan', level: 'Moderate' },
  { name: 'Rayap', level: 'Moderate' },
  { name: 'Lunsad', level: 'Moderate' },
]);

const CAINTA_FLOOD_HAZARD = buildHazardMap([
  { name: 'San Andres (Pob.)', level: 'Very High' },
  { name: 'San Juan', level: 'Very High' },
  { name: 'San Roque', level: 'Very High' },
  { name: 'Santa Rosa', level: 'Very High' },
  { name: 'Santo Domingo', level: 'Very High' },
  { name: 'Santo Nino', level: 'Very High' },
  { name: 'San Isidro', level: 'Very High' },
  { name: 'San Andres (Pob.)', level: 'High' },
  { name: 'San Isidro', level: 'High' },
  { name: 'San Juan', level: 'High' },
  { name: 'San Roque', level: 'High' },
  { name: 'Santa Rosa', level: 'High' },
  { name: 'Santo Domingo', level: 'High' },
  { name: 'Santo Nino', level: 'High' },
  { name: 'San Andres (Pob.)', level: 'Moderate' },
  { name: 'San Isidro', level: 'Moderate' },
  { name: 'San Juan', level: 'Moderate' },
  { name: 'Santo Domingo', level: 'Moderate' },
]);

const CARDONA_FLOOD_HAZARD = buildHazardMap([
  { name: 'Boor', level: 'High' },
  { name: 'Lambac', level: 'High' },
  { name: 'Malanggam-Calubacan', level: 'High' },
  { name: 'Navotas', level: 'High' },
  { name: 'Subay', level: 'High' },
  { name: 'Balibago', level: 'High' },
  { name: 'Tuna', level: 'High' },
  { name: 'Calahan', level: 'High' },
  { name: 'Dalig', level: 'High' },
  { name: 'Iglesia (Pob.)', level: 'High' },
  { name: 'Patunhay', level: 'High' },
  { name: 'Real (Pob.)', level: 'High' },
  { name: 'San Roque (Pob.)', level: 'High' },
  { name: 'Looc', level: 'High' },
  { name: 'Sampad', level: 'High' },
  { name: 'Nagsulo', level: 'High' },
  { name: 'Ticulio', level: 'High' },
  { name: 'Calahan', level: 'Moderate' },
]);

const JALAJALA_FLOOD_HAZARD = buildHazardMap([
  { name: 'Punta', level: 'Very High' },
  { name: 'Bagumbong', level: 'High' },
  { name: 'Bayugo', level: 'High' },
  { name: 'Lubo', level: 'High' },
  { name: 'Paalaman', level: 'High' },
  { name: 'Pagkalinawan', level: 'High' },
  { name: 'Palaypalay', level: 'High' },
  { name: 'Punta', level: 'High' },
  { name: 'Second District (Pob.)', level: 'High' },
  { name: 'Sipsipin', level: 'High' },
  { name: 'Special District (Pob.)', level: 'High' },
  { name: 'Third District (Pob.)', level: 'High' },
]);

const MORONG_FLOOD_HAZARD = buildHazardMap([
  { name: 'Can-Cal-Lan (Caniogan-Calero-Lanang)', level: 'Very High' },
  { name: 'San Juan (Pob.)', level: 'Very High' },
  { name: 'San Pedro (Pob.)', level: 'Very High' },
  { name: 'Bombongan', level: 'High' },
  { name: 'Can-Cal-Lan (Caniogan-Calero-Lanang)', level: 'High' },
  { name: 'Lagundi', level: 'High' },
  { name: 'Maybancal', level: 'High' },
  { name: 'San Guillermo', level: 'High' },
  { name: 'San Jose (Pob.)', level: 'High' },
  { name: 'San Juan (Pob.)', level: 'High' },
  { name: 'San Pedro (Pob.)', level: 'High' },
  { name: 'San Jose (Pob.)', level: 'Moderate' },
  { name: 'San Juan (Pob.)', level: 'Moderate' },
  { name: 'San Pedro (Pob.)', level: 'Moderate' },
  { name: 'Can-Cal-Lan (Caniogan-Calero-Lanang)', level: 'Moderate' },
  { name: 'Maybancal', level: 'Moderate' },
  { name: 'San Guillermo', level: 'Moderate' },
]);

const PILILLA_FLOOD_HAZARD = buildHazardMap([
  { name: 'Hulo (Pob.)', level: 'Very High' },
  { name: 'Halayhayin', level: 'High' },
  { name: 'Malaya', level: 'High' },
  { name: 'Niogan', level: 'High' },
  { name: 'Quisao', level: 'High' },
  { name: 'Bagumbayan (Pob.)', level: 'High' },
  { name: 'Hulo (Pob.)', level: 'High' },
  { name: 'Imatong (Pob.)', level: 'High' },
  { name: 'Takungan (Pob.)', level: 'High' },
  { name: 'Wawa (Pob.)', level: 'High' },
]);

const RODRIGUEZ_FLOOD_HAZARD = buildHazardMap([
  { name: 'Burgos', level: 'Very High' },
  { name: 'San Jose', level: 'Very High' },
  { name: 'Manggahan', level: 'Very High' },
  { name: 'San Jose', level: 'High' },
  { name: 'Macabud', level: 'High' },
  { name: 'Puray', level: 'High' },
  { name: 'Mascap', level: 'High' },
  { name: 'San Isidro', level: 'High' },
  { name: 'Balite (Pob.)', level: 'High' },
  { name: 'Burgos', level: 'High' },
  { name: 'Geronimo', level: 'High' },
  { name: 'Rosario', level: 'High' },
  { name: 'San Rafael', level: 'High' },
  { name: 'San Jose', level: 'Moderate' },
  { name: 'San Isidro', level: 'Moderate' },
  { name: 'Balite (Pob.)', level: 'Moderate' },
  { name: 'Burgos', level: 'Moderate' },
  { name: 'Geronimo', level: 'Moderate' },
  { name: 'Manggahan', level: 'Moderate' },
  { name: 'Rosario', level: 'Moderate' },
  { name: 'San Rafael', level: 'Moderate' },
  { name: 'Macabud', level: 'Low' },
]);

const SAN_MATEO_FLOOD_HAZARD = buildHazardMap([
  { name: 'Ampid I', level: 'Very High' },
  { name: 'Ampid II', level: 'Very High' },
  { name: 'Banaba', level: 'Very High' },
  { name: 'Dulong Bayan 1', level: 'Very High' },
  { name: 'Dulong Bayan 2', level: 'Very High' },
  { name: 'Guinayang', level: 'Very High' },
  { name: 'Guitnang Bayan I (Pob.)', level: 'Very High' },
  { name: 'Guitnang Bayan II (Pob.)', level: 'Very High' },
  { name: 'Malanday', level: 'Very High' },
  { name: 'Maly', level: 'Very High' },
  { name: 'Santa Ana', level: 'Very High' },
  { name: 'Santo Nino', level: 'Very High' },
  { name: 'Silangan', level: 'Very High' },
  { name: 'Ampid I', level: 'High' },
  { name: 'Banaba', level: 'High' },
  { name: 'Dulong Bayan 1', level: 'High' },
  { name: 'Dulong Bayan 2', level: 'High' },
  { name: 'Guinayang', level: 'High' },
  { name: 'Guitnang Bayan I (Pob.)', level: 'High' },
  { name: 'Guitnang Bayan II (Pob.)', level: 'High' },
  { name: 'Gulod Malaya', level: 'High' },
  { name: 'Malanday', level: 'High' },
  { name: 'Maly', level: 'High' },
  { name: 'Pintong Bocawe', level: 'High' },
  { name: 'Santo Nino', level: 'High' },
  { name: 'Silangan', level: 'High' },
  { name: 'Ampid I', level: 'Moderate' },
  { name: 'Banaba', level: 'Moderate' },
  { name: 'Dulong Bayan 1', level: 'Moderate' },
  { name: 'Dulong Bayan 2', level: 'Moderate' },
  { name: 'Guinayang', level: 'Moderate' },
  { name: 'Guitnang Bayan I (Pob.)', level: 'Moderate' },
  { name: 'Guitnang Bayan II (Pob.)', level: 'Moderate' },
  { name: 'Gulod Malaya', level: 'Moderate' },
  { name: 'Malanday', level: 'Moderate' },
  { name: 'Maly', level: 'Moderate' },
  { name: 'Santo Nino', level: 'Moderate' },
  { name: 'Dulong Bayan 1', level: 'Low' },
]);

const TANAY_FLOOD_HAZARD = buildHazardMap([
  { name: 'Katipunan-Bayan (Pob.)', level: 'Very High' },
  { name: 'Kaybuto (Pob.)', level: 'Very High' },
  { name: 'San Isidro (Pob.)', level: 'Very High' },
  { name: 'Tandang Kutyo (Pob.)', level: 'Very High' },
  { name: 'Wawa (Pob.)', level: 'Very High' },
  { name: 'Daraitan', level: 'High' },
  { name: 'Sampaloc', level: 'High' },
  { name: 'Mamuyao', level: 'High' },
  { name: 'Cuyambay', level: 'High' },
  { name: 'Katipunan-Bayan (Pob.)', level: 'High' },
  { name: 'Kaybuto (Pob.)', level: 'High' },
  { name: 'Pinagkamaligan (Pob.)', level: 'High' },
  { name: 'Plaza Aldea (Pob.)', level: 'High' },
  { name: 'San Isidro (Pob.)', level: 'High' },
  { name: 'Tabing Ilog (Pob.)', level: 'High' },
  { name: 'Tandang Kutyo (Pob.)', level: 'High' },
  { name: 'Wawa (Pob.)', level: 'High' },
  { name: 'Santo Nino', level: 'High' },
  { name: 'Cayabu', level: 'High' },
  { name: 'Laiban', level: 'High' },
  { name: 'San Andres', level: 'High' },
  { name: 'Santa Inez', level: 'High' },
  { name: 'Tinucan', level: 'High' },
  { name: 'Cayabu', level: 'Moderate' },
  { name: 'Santo Nino', level: 'Moderate' },
  { name: 'Tinucan', level: 'Moderate' },
  { name: 'Mamuyao', level: 'Moderate' },
  { name: 'Laiban', level: 'Moderate' },
  { name: 'Santa Inez', level: 'Moderate' },
  { name: 'San Andres', level: 'Moderate' },
]);

const TAYTAY_FLOOD_HAZARD = buildHazardMap([
  { name: 'Santa Ana', level: 'Very High' },
  { name: 'Muzon', level: 'Very High' },
  { name: 'San Isidro', level: 'Very High' },
  { name: 'San Juan', level: 'Very High' },
  { name: 'Dolores (Pob.)', level: 'High' },
  { name: 'Muzon', level: 'High' },
  { name: 'San Isidro', level: 'High' },
  { name: 'San Juan', level: 'High' },
  { name: 'Santa Ana', level: 'High' },
  { name: 'Dolores (Pob.)', level: 'Moderate' },
  { name: 'Santa Ana', level: 'Moderate' },
]);

function normalizeBarangayName(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ñ/g, 'n')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export default function RizalMunicipalitiesDistricts() {
  const [selectedMunicipality, setSelectedMunicipality] = useState<MunicipalityProfile | null>(null);
  const [selectedFloodRiskMunicipality, setSelectedFloodRiskMunicipality] = useState<MunicipalityProfile | null>(null);
  const [selectedEvacMunicipality, setSelectedEvacMunicipality] = useState<MunicipalityProfile | null>(null);

  // Load data from LocalStorage on mount
  const [evacuationDataMap, setEvacuationDataMap] = useState<Record<string, EvacuationCenter[]>>(() => {
    try {
      const savedData = localStorage.getItem('rizal_evac_centers');
      return savedData ? JSON.parse(savedData) : {};
    } catch (err) {
      console.error('Failed to load evac data from local storage:', err);
      return {};
    }
  });

  // Save data to LocalStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('rizal_evac_centers', JSON.stringify(evacuationDataMap));
    } catch (err) {
      console.error('Failed to save evac data to local storage:', err);
    }
  }, [evacuationDataMap]);

  // Automatically fetch GitHub data for all municipalities on mount
  useEffect(() => {
    const fetchAllData = async () => {
      for (const municipality of RIZAL_MUNICIPALITIES) {
        const githubData = await fetchMunicipalityEvacData(municipality.name);
        
        const mappedData = githubData.map(item => ({
          name: item.name,
          location: item.location,
          capacity_individuals: Number(item.capacity) || 0,
          capacity_family: Number(item.capacityFamily) || 0,
          floor_area: Number(item.floorArea) || 0,
          type: item.type,
          features: item.features,
          proximity: item.proximity,
          source_of_water: item.waterSource,
          remarks: item.remarks,
          lat: item.lat,
          lng: item.lng,
          contact_person_and_number: item.contact
        }));

        setEvacuationDataMap(prev => ({
          ...prev,
          [municipality.name]: mappedData
        }));
      }
    };

    fetchAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only on mount

  const handleManualSync = async (municipalityName: string) => {
    const githubData = await fetchMunicipalityEvacData(municipalityName);
    if (githubData.length > 0) {
      const mappedData = githubData.map(item => ({
        name: item.name,
        location: item.location,
        capacity_individuals: Number(item.capacity) || 0,
        capacity_family: Number(item.capacityFamily) || 0,
        floor_area: Number(item.floorArea) || 0,
        type: item.type,
        features: item.features,
        proximity: item.proximity,
        source_of_water: item.waterSource,
        remarks: item.remarks,
        lat: item.lat,
        lng: item.lng,
        contact_person_and_number: item.contact
      }));

      setEvacuationDataMap(prev => ({
        ...prev,
        [municipalityName]: mappedData
      }));
    }
  };

  const formatPopulation = (value: number) => value.toLocaleString('en-PH');

  return (
    <>
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm overflow-hidden">
        <div className="px-4 sm:px-5 py-4 border-b border-slate-800 bg-gradient-to-r from-emerald-900/35 via-teal-900/25 to-slate-900/30">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-300" />
              Rizal Province Municipalities
            </h2>
            <p className="text-sm text-slate-300 mt-1">
              14 municipalities/city
            </p>
          </div>
        </div>

        <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {RIZAL_MUNICIPALITIES.map((item) => (
            <article
              key={item.name}
              className="rounded-lg border border-slate-700/90 bg-slate-950/60 px-3 py-3"
            >
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm sm:text-base font-semibold text-white leading-tight">{item.name}</h3>
                {item.district && (
                  <span
                    className={`rounded-md border px-2 py-0.5 text-[11px] font-semibold ${districtStyle[item.district]}`}
                  >
                    {item.district}
                  </span>
                )}
              </div>

              <div className="mt-3 rounded-md border border-slate-700/70 bg-slate-900/70 px-2.5 py-2 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <p className="text-slate-400 uppercase tracking-wide text-[11px] sm:text-xs">Barangays:</p>
                  <p className="text-cyan-300 font-semibold text-sm sm:text-base leading-tight">{item.barangays.length}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedMunicipality(item)}
                  className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-300 transition-colors hover:bg-emerald-500/20 focus:outline-none focus:ring-2 focus:ring-emerald-400/70"
                >
                  Population
                </button>
              </div>

              <div className="mt-2 rounded-md border border-slate-700/70 bg-slate-900/60 px-2.5 py-2 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Home className="w-3.5 h-3.5 text-cyan-400" />
                  <p className="text-slate-400 uppercase tracking-wide text-[11px] sm:text-xs">Evac Centers:</p>
                  <p className="text-cyan-300 font-semibold text-sm sm:text-base leading-tight">
                    {evacuationDataMap[item.name]?.length || 0}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleManualSync(item.name)}
                    className="rounded-md border border-slate-700 bg-slate-800 p-1.5 text-slate-400 transition-colors hover:text-cyan-300 hover:bg-slate-700"
                    title="Sync with GitHub"
                  >
                    <RefreshCw className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedEvacMunicipality(item)}
                    className="rounded-md border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-xs font-semibold text-cyan-300 transition-colors hover:bg-cyan-500/20 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
                  >
                    Manage
                  </button>
                </div>
              </div>

              <div className="mt-2 rounded-md border border-slate-700/70 bg-slate-900/50 px-2.5 py-2 flex items-center justify-between gap-2">
                <p className="text-slate-400 uppercase tracking-wide text-[11px] sm:text-xs">Flood:</p>
                <button
                  type="button"
                  onClick={() => setSelectedFloodRiskMunicipality(item)}
                  className={`rounded-md border px-2 py-0.5 text-xs font-semibold transition-colors hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300/40 ${floodRiskNeutralStyle}`}
                >
                  Risk
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {selectedMunicipality && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedMunicipality(null)}
        >
          <div
            className="w-full max-w-3xl rounded-xl border border-slate-200 bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-slate-900">{selectedMunicipality.name}</h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Total population: {formatPopulation(selectedMunicipality.totalPopulation)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedMunicipality(null)}
                className="rounded-md p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                aria-label="Close popup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4">
              <div className="rounded-lg border border-slate-200 overflow-hidden">
                <div className="grid grid-cols-[1fr_auto] gap-4 bg-slate-100 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-700">
                  <span>Barangay</span>
                  <span>Population</span>
                </div>
                <div className="max-h-[55vh] overflow-y-auto divide-y divide-slate-200">
                  {selectedMunicipality.barangays.map((barangay) => (
                    <div
                      key={barangay.name}
                      className="grid grid-cols-[1fr_auto] gap-4 px-3 py-2 text-sm text-slate-800 hover:bg-slate-50"
                    >
                      <span>{barangay.name}</span>
                      <span className="font-semibold text-emerald-600">{formatPopulation(barangay.population)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedFloodRiskMunicipality && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedFloodRiskMunicipality(null)}
        >
          <div
            className="w-full max-w-xl rounded-xl border border-slate-200 bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-slate-900">{selectedFloodRiskMunicipality.name}</h3>
                <p className="text-xs text-slate-600 mt-0.5">Flood Hazard Susceptibility · Source: GeoRiskPH</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedFloodRiskMunicipality(null)}
                className="rounded-md p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                aria-label="Close popup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4">
              <a
                href={floodRiskSourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-xs text-cyan-700 hover:text-cyan-800 underline decoration-cyan-500/50"
              >
                Source: geoanalytics.georisk.gov.ph
              </a>

              <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
                <div className="text-[11px] font-semibold tracking-[0.14em] text-slate-700 uppercase mb-2">
                  Barangays
                </div>
                <div className="max-h-56 overflow-y-auto rounded-md border border-slate-200 bg-white p-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {selectedFloodRiskMunicipality.barangays.map((barangay) => {
                      const hazardLabel = (() => {
                        const normalized = normalizeBarangayName(barangay.name);
                        if (selectedFloodRiskMunicipality.name === 'Angono') {
                          return ANGONO_FLOOD_HAZARD[normalized];
                        }
                        if (selectedFloodRiskMunicipality.name === 'Antipolo City') {
                          return ANTIPOLO_FLOOD_HAZARD[normalized];
                        }
                        if (selectedFloodRiskMunicipality.name === 'Baras') {
                          return BARAS_FLOOD_HAZARD[normalized];
                        }
                        if (selectedFloodRiskMunicipality.name === 'Binangonan') {
                          return BINANGONAN_FLOOD_HAZARD[normalized];
                        }
                        if (selectedFloodRiskMunicipality.name === 'Cainta') {
                          return CAINTA_FLOOD_HAZARD[normalized];
                        }
                        if (selectedFloodRiskMunicipality.name === 'Cardona') {
                          return CARDONA_FLOOD_HAZARD[normalized];
                        }
                        if (selectedFloodRiskMunicipality.name === 'Jalajala') {
                          return JALAJALA_FLOOD_HAZARD[normalized];
                        }
                        if (selectedFloodRiskMunicipality.name === 'Morong') {
                          return MORONG_FLOOD_HAZARD[normalized];
                        }
                        if (selectedFloodRiskMunicipality.name === 'Pililla') {
                          return PILILLA_FLOOD_HAZARD[normalized];
                        }
                        if (selectedFloodRiskMunicipality.name === 'Rodriguez (Montalban)') {
                          return RODRIGUEZ_FLOOD_HAZARD[normalized];
                        }
                        if (selectedFloodRiskMunicipality.name === 'San Mateo') {
                          return SAN_MATEO_FLOOD_HAZARD[normalized];
                        }
                        if (selectedFloodRiskMunicipality.name === 'Tanay') {
                          return TANAY_FLOOD_HAZARD[normalized];
                        }
                        if (selectedFloodRiskMunicipality.name === 'Taytay') {
                          return TAYTAY_FLOOD_HAZARD[normalized];
                        }
                        return undefined;
                      })();

                      return (
                        <div
                          key={barangay.name}
                          className={`rounded-md border px-2 py-1.5 text-xs font-medium ${floodRiskNeutralStyle} flex items-center justify-between gap-2`}
                        >
                          <span>{barangay.name}</span>
                          {hazardLabel && (
                            <span className="font-semibold text-slate-900">{hazardLabel}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedEvacMunicipality && (
        <EvacuationCentersModal
          municipalityName={selectedEvacMunicipality.name}
          isOpen={!!selectedEvacMunicipality}
          onClose={() => setSelectedEvacMunicipality(null)}
          data={evacuationDataMap[selectedEvacMunicipality.name] || []}
          onDataUpdate={(newData) => {
            setEvacuationDataMap(prev => ({
              ...prev,
              [selectedEvacMunicipality.name]: newData
            }));
          }}
        />
      )}
    </>
  );
}
