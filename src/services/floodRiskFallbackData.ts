
const FLOOD_HAZARD_ORDER = ['Low', 'Moderate', 'High', 'Very High'] as const;

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

export const FALLBACK_HAZARDS: Record<string, Record<string, string>> = {
  'Angono': buildHazardMap([
    { name: 'Bagumbayan', level: 'Very High' }, { name: 'Kalayaan', level: 'Very High' }, { name: 'Poblacion Ibaba', level: 'Very High' },
    { name: 'Poblacion Itaas', level: 'Very High' }, { name: 'San Isidro', level: 'Very High' }, { name: 'San Pedro', level: 'Very High' },
    { name: 'San Vicente', level: 'Very High' }, { name: 'Santo Nino', level: 'Very High' }, { name: 'Kalayaan', level: 'High' },
    { name: 'Mahabang Parang', level: 'High' }, { name: 'Poblacion Itaas', level: 'High' }, { name: 'San Isidro', level: 'High' },
    { name: 'San Pedro', level: 'High' }, { name: 'San Roque', level: 'High' }, { name: 'Santo Nino', level: 'High' },
  ]),
  'Antipolo City': buildHazardMap([
    { name: 'Mayamot', level: 'Very High' }, { name: 'Mayamot', level: 'High' }, { name: 'San Jose (Pob.)', level: 'High' },
    { name: 'Calawis', level: 'High' }, { name: 'Dalig', level: 'High' }, { name: 'Inarawan', level: 'High' },
    { name: 'San Isidro (Pob.)', level: 'High' }, { name: 'San Luis', level: 'High' }, { name: 'Beverly Hills', level: 'High' },
    { name: 'Cupang', level: 'High' }, { name: 'Dela Paz (Pob.)', level: 'High' }, { name: 'Mambugan', level: 'High' },
    { name: 'Muntingdilaw', level: 'High' }, { name: 'San Roque (Pob.)', level: 'High' }, { name: 'Santa Cruz', level: 'High' },
    { name: 'San Juan', level: 'High' }, { name: 'Bagong Nayon', level: 'High' }, { name: 'San Jose (Pob.)', level: 'Moderate' },
    { name: 'Beverly Hills', level: 'Moderate' }, { name: 'Dalig', level: 'Moderate' }, { name: 'Dela Paz (Pob.)', level: 'Moderate' },
    { name: 'San Roque (Pob.)', level: 'Moderate' }, { name: 'Cupang', level: 'Moderate' }, { name: 'Mayamot', level: 'Moderate' },
    { name: 'San Juan', level: 'Moderate' }, { name: 'Calawis', level: 'Moderate' }, { name: 'San Isidro (Pob.)', level: 'Moderate' },
    { name: 'San Luis', level: 'Moderate' }, { name: 'Santa Cruz', level: 'Moderate' }, { name: 'Cupang', level: 'Low' },
  ]),
  'Baras': buildHazardMap([
    { name: 'Concepcion', level: 'Very High' }, { name: 'Evangelista', level: 'Very High' }, { name: 'Mabini', level: 'Very High' },
    { name: 'Santiago', level: 'Very High' }, { name: 'Concepcion', level: 'High' }, { name: 'Evangelista', level: 'High' },
    { name: 'Mabini', level: 'High' }, { name: 'Rizal (Pob.)', level: 'High' }, { name: 'San Jose', level: 'High' },
    { name: 'San Juan', level: 'High' }, { name: 'San Salvador', level: 'High' }, { name: 'San Miguel', level: 'High' },
    { name: 'Santiago', level: 'High' }, { name: 'Pinugay', level: 'High' }, { name: 'Concepcion', level: 'Moderate' },
    { name: 'Evangelista', level: 'Moderate' }, { name: 'Mabini', level: 'Moderate' }, { name: 'San Juan', level: 'Moderate' },
    { name: 'San Miguel', level: 'Moderate' },
  ]),
  'Binangonan': buildHazardMap([
    { name: 'Pag-Asa', level: 'Very High' }, { name: 'Tagpos', level: 'Very High' }, { name: 'Tayuman', level: 'Very High' },
    { name: 'Kasile', level: 'High' }, { name: 'Batingan', level: 'High' }, { name: 'Calumpang', level: 'High' },
    { name: 'Macamot', level: 'High' }, { name: 'Kalawaan', level: 'High' }, { name: 'Pantok', level: 'High' },
    { name: 'Bilibiran', level: 'High' }, { name: 'Palangoy', level: 'High' }, { name: 'San Carlos', level: 'High' },
    { name: 'Sapang', level: 'Moderate' }, { name: 'Bombong', level: 'Moderate' }, { name: 'Kinaboogan', level: 'Moderate' },
    { name: 'Kinagatan', level: 'Moderate' }, { name: 'Malakaban', level: 'Moderate' }, { name: 'Layunan (Pob.)', level: 'Moderate' },
    { name: 'Libid (Pob.)', level: 'Moderate' }, { name: 'Libis (Pob.)', level: 'Moderate' }, { name: 'Mahabang Parang', level: 'Moderate' },
    { name: 'Tatala', level: 'Moderate' }, { name: 'Mambog', level: 'Moderate' }, { name: 'Habagatan', level: 'Moderate' },
    { name: 'Rayap', level: 'Moderate' }, { name: 'Lunsad', level: 'Moderate' },
  ]),
  'Cainta': buildHazardMap([
    { name: 'San Andres (Pob.)', level: 'Very High' }, { name: 'San Juan', level: 'Very High' }, { name: 'San Roque', level: 'Very High' },
    { name: 'Santa Rosa', level: 'Very High' }, { name: 'Santo Domingo', level: 'Very High' }, { name: 'Santo Nino', level: 'Very High' },
    { name: 'San Isidro', level: 'Very High' }, { name: 'San Andres (Pob.)', level: 'High' }, { name: 'San Isidro', level: 'High' },
    { name: 'San Juan', level: 'High' }, { name: 'San Roque', level: 'High' }, { name: 'Santa Rosa', level: 'High' },
    { name: 'Santo Domingo', level: 'High' }, { name: 'Santo Nino', level: 'High' }, { name: 'San Andres (Pob.)', level: 'Moderate' },
    { name: 'San Isidro', level: 'Moderate' }, { name: 'San Juan', level: 'Moderate' }, { name: 'Santo Domingo', level: 'Moderate' },
  ]),
  'Cardona': buildHazardMap([
    { name: 'Boor', level: 'High' }, { name: 'Lambac', level: 'High' }, { name: 'Malanggam-Calubacan', level: 'High' },
    { name: 'Navotas', level: 'High' }, { name: 'Subay', level: 'High' }, { name: 'Balibago', level: 'High' },
    { name: 'Tuna', level: 'High' }, { name: 'Calahan', level: 'High' }, { name: 'Dalig', level: 'High' },
    { name: 'Iglesia (Pob.)', level: 'High' }, { name: 'Patunhay', level: 'High' }, { name: 'Real (Pob.)', level: 'High' },
    { name: 'San Roque (Pob.)', level: 'High' }, { name: 'Looc', level: 'High' }, { name: 'Sampad', level: 'High' },
    { name: 'Nagsulo', level: 'High' }, { name: 'Ticulio', level: 'High' }, { name: 'Calahan', level: 'Moderate' },
  ]),
  'Jalajala': buildHazardMap([
    { name: 'Punta', level: 'Very High' }, { name: 'Bagumbong', level: 'High' }, { name: 'Bayugo', level: 'High' },
    { name: 'Lubo', level: 'High' }, { name: 'Paalaman', level: 'High' }, { name: 'Pagkalinawan', level: 'High' },
    { name: 'Palaypalay', level: 'High' }, { name: 'Punta', level: 'High' }, { name: 'Second District (Pob.)', level: 'High' },
    { name: 'Sipsipin', level: 'High' }, { name: 'Special District (Pob.)', level: 'High' }, { name: 'Third District (Pob.)', level: 'High' },
  ]),
  'Morong': buildHazardMap([
    { name: 'Can-Cal-Lan (Caniogan-Calero-Lanang)', level: 'Very High' }, { name: 'San Juan (Pob.)', level: 'Very High' },
    { name: 'San Pedro (Pob.)', level: 'Very High' }, { name: 'Bombongan', level: 'High' }, { name: 'Can-Cal-Lan (Caniogan-Calero-Lanang)', level: 'High' },
    { name: 'Lagundi', level: 'High' }, { name: 'Maybancal', level: 'High' }, { name: 'San Guillermo', level: 'High' },
    { name: 'San Jose (Pob.)', level: 'High' }, { name: 'San Juan (Pob.)', level: 'High' }, { name: 'San Pedro (Pob.)', level: 'High' },
    { name: 'San Jose (Pob.)', level: 'Moderate' }, { name: 'San Juan (Pob.)', level: 'Moderate' }, { name: 'San Pedro (Pob.)', level: 'Moderate' },
    { name: 'Can-Cal-Lan (Caniogan-Calero-Lanang)', level: 'Moderate' }, { name: 'Maybancal', level: 'Moderate' }, { name: 'San Guillermo', level: 'Moderate' },
  ]),
  'Pililla': buildHazardMap([
    { name: 'Hulo (Pob.)', level: 'Very High' }, { name: 'Halayhayin', level: 'High' }, { name: 'Malaya', level: 'High' },
    { name: 'Niogan', level: 'High' }, { name: 'Quisao', level: 'High' }, { name: 'Bagumbayan (Pob.)', level: 'High' },
    { name: 'Hulo (Pob.)', level: 'High' }, { name: 'Imatong (Pob.)', level: 'High' }, { name: 'Takungan (Pob.)', level: 'High' },
    { name: 'Wawa (Pob.)', level: 'High' },
  ]),
  'Rodriguez (Montalban)': buildHazardMap([
    { name: 'Burgos', level: 'Very High' }, { name: 'San Jose', level: 'Very High' }, { name: 'Manggahan', level: 'Very High' },
    { name: 'San Jose', level: 'High' }, { name: 'Macabud', level: 'High' }, { name: 'Puray', level: 'High' },
    { name: 'Mascap', level: 'High' }, { name: 'San Isidro', level: 'High' }, { name: 'Balite (Pob.)', level: 'High' },
    { name: 'Burgos', level: 'High' }, { name: 'Geronimo', level: 'High' }, { name: 'Rosario', level: 'High' },
    { name: 'San Rafael', level: 'High' }, { name: 'San Jose', level: 'Moderate' }, { name: 'San Isidro', level: 'Moderate' },
    { name: 'Balite (Pob.)', level: 'Moderate' }, { name: 'Burgos', level: 'Moderate' }, { name: 'Geronimo', level: 'Moderate' },
    { name: 'Manggahan', level: 'Moderate' }, { name: 'Rosario', level: 'Moderate' }, { name: 'San Rafael', level: 'Moderate' },
    { name: 'Macabud', level: 'Low' },
  ]),
  'San Mateo': buildHazardMap([
    { name: 'Ampid I', level: 'Very High' }, { name: 'Ampid II', level: 'Very High' }, { name: 'Banaba', level: 'Very High' },
    { name: 'Dulong Bayan 1', level: 'Very High' }, { name: 'Dulong Bayan 2', level: 'Very High' }, { name: 'Guinayang', level: 'Very High' },
    { name: 'Guitnang Bayan I (Pob.)', level: 'Very High' }, { name: 'Guitnang Bayan II (Pob.)', level: 'Very High' },
    { name: 'Malanday', level: 'Very High' }, { name: 'Maly', level: 'Very High' }, { name: 'Santa Ana', level: 'Very High' },
    { name: 'Santo Nino', level: 'Very High' }, { name: 'Silangan', level: 'Very High' }, { name: 'Ampid I', level: 'High' },
    { name: 'Banaba', level: 'High' }, { name: 'Dulong Bayan 1', level: 'High' }, { name: 'Dulong Bayan 2', level: 'High' },
    { name: 'Guinayang', level: 'High' }, { name: 'Guitnang Bayan I (Pob.)', level: 'High' }, { name: 'Guitnang Bayan II (Pob.)', level: 'High' },
    { name: 'Gulod Malaya', level: 'High' }, { name: 'Malanday', level: 'High' }, { name: 'Maly', level: 'High' },
    { name: 'Pintong Bocawe', level: 'High' }, { name: 'Santo Nino', level: 'High' }, { name: 'Silangan', level: 'High' },
    { name: 'Ampid I', level: 'Moderate' }, { name: 'Banaba', level: 'Moderate' }, { name: 'Dulong Bayan 1', level: 'Moderate' },
    { name: 'Dulong Bayan 2', level: 'Moderate' }, { name: 'Guinayang', level: 'Moderate' }, { name: 'Guitnang Bayan I (Pob.)', level: 'Moderate' },
    { name: 'Guitnang Bayan II (Pob.)', level: 'Moderate' }, { name: 'Gulod Malaya', level: 'Moderate' }, { name: 'Malanday', level: 'Moderate' },
    { name: 'Maly', level: 'Moderate' }, { name: 'Santo Nino', level: 'Moderate' }, { name: 'Dulong Bayan 1', level: 'Low' },
  ]),
  'Tanay': buildHazardMap([
    { name: 'Katipunan-Bayan (Pob.)', level: 'Very High' }, { name: 'Kaybuto (Pob.)', level: 'Very High' },
    { name: 'San Isidro (Pob.)', level: 'Very High' }, { name: 'Tandang Kutyo (Pob.)', level: 'Very High' },
    { name: 'Wawa (Pob.)', level: 'Very High' }, { name: 'Daraitan', level: 'High' }, { name: 'Sampaloc', level: 'High' },
    { name: 'Mamuyao', level: 'High' }, { name: 'Cuyambay', level: 'High' }, { name: 'Katipunan-Bayan (Pob.)', level: 'High' },
    { name: 'Kaybuto (Pob.)', level: 'High' }, { name: 'Pinagkamaligan (Pob.)', level: 'High' }, { name: 'Plaza Aldea (Pob.)', level: 'High' },
    { name: 'San Isidro (Pob.)', level: 'High' }, { name: 'Tabing Ilog (Pob.)', level: 'High' }, { name: 'Tandang Kutyo (Pob.)', level: 'High' },
    { name: 'Wawa (Pob.)', level: 'High' }, { name: 'Santo Nino', level: 'High' }, { name: 'Cayabu', level: 'High' },
    { name: 'Laiban', level: 'High' }, { name: 'San Andres', level: 'High' }, { name: 'Santa Inez', level: 'High' },
    { name: 'Tinucan', level: 'High' }, { name: 'Cayabu', level: 'Moderate' }, { name: 'Santo Nino', level: 'Moderate' },
    { name: 'Tinucan', level: 'Moderate' }, { name: 'Mamuyao', level: 'Moderate' }, { name: 'Laiban', level: 'Moderate' },
    { name: 'Santa Inez', level: 'Moderate' }, { name: 'San Andres', level: 'Moderate' },
  ]),
  'Taytay': buildHazardMap([
    { name: 'Santa Ana', level: 'Very High' }, { name: 'Muzon', level: 'Very High' }, { name: 'San Isidro', level: 'Very High' },
    { name: 'San Juan', level: 'Very High' }, { name: 'Dolores (Pob.)', level: 'High' }, { name: 'Muzon', level: 'High' },
    { name: 'San Isidro', level: 'High' }, { name: 'San Juan', level: 'High' }, { name: 'Santa Ana', level: 'High' },
    { name: 'Dolores (Pob.)', level: 'Moderate' }, { name: 'Santa Ana', level: 'Moderate' },
  ]),
};
