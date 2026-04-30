import { useState, useEffect } from 'react';
import { MapPin, Home, Info, X, ChevronRight, Search, Download, Upload, ExternalLink, RefreshCw } from 'lucide-react';
import { fetchMunicipalityEvacData } from '../services/githubDataService';
import { fetchFloodRiskData, FloodRiskData } from '../services/floodRiskService';
import { fetchLandslideRiskData, LandslideRiskData } from '../services/raininducedlandslideRiskService';
import EvacuationCentersModal, { EvacuationCenter } from './EvacuationCentersModal';
import FloodRiskPopupCard from './FloodRiskPopupCard';
import LandslideRiskPopupCard from './RainInducedLandslideRiskPopupCard';

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
  const [selectedLandslideMunicipality, setSelectedLandslideMunicipality] = useState<MunicipalityProfile | null>(null);
  const [selectedEvacMunicipality, setSelectedEvacMunicipality] = useState<MunicipalityProfile | null>(null);
  const [floodRiskData, setFloodRiskData] = useState<FloodRiskData | null>(null);
  const [landslideRiskData, setLandslideRiskData] = useState<LandslideRiskData | null>(null);
  const [isFloodRiskLoading, setIsFloodRiskLoading] = useState(false);
  const [isLandslideRiskLoading, setIsLandslideRiskLoading] = useState(false);

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
        // Try fetching with the full name (e.g., "Antipolo City")
        let githubData = await fetchMunicipalityEvacData(municipality.name);

        // Fallback for "Antipolo City" -> "Antipolo" if the first one returns empty
        if (githubData.length === 0 && municipality.name === 'Antipolo City') {
          githubData = await fetchMunicipalityEvacData('Antipolo');
        }

        if (githubData.length > 0) {
          const mappedData = githubData.map(item => {
            // Helper to safely parse numbers from strings with commas
            const safeParseNum = (val: any) => {
              if (typeof val === 'number') return val;
              if (!val) return 0;
              const cleaned = String(val).replace(/[^\d.-]/g, '');
              return cleaned ? parseFloat(cleaned) : 0;
            };

            return {
              name: item.name,
              location: item.location,
              capacity_individuals: safeParseNum(item.capacity),
              capacity_family: safeParseNum(item.capacityFamily),
              floor_area: safeParseNum(item.floorArea),
              type: item.type,
              features: item.features,
              proximity: item.proximity,
              source_of_water: item.waterSource,
              remarks: item.remarks,
              lat: item.lat,
              lng: item.lng,
              contact_person_and_number: item.contact
            };
          });

          setEvacuationDataMap(prev => ({
            ...prev,
            [municipality.name]: mappedData
          }));
        }
      }
    };

    fetchAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only on mount

  const handleManualSync = async (municipalityName: string) => {
    let githubData = await fetchMunicipalityEvacData(municipalityName);

    // Fallback for Antipolo City
    if (githubData.length === 0 && municipalityName === 'Antipolo City') {
      githubData = await fetchMunicipalityEvacData('Antipolo');
    }

    if (githubData.length > 0) {
      const mappedData = githubData.map(item => {
        const safeParseNum = (val: any) => {
          if (typeof val === 'number') return val;
          if (!val) return 0;
          const cleaned = String(val).replace(/[^\d.-]/g, '');
          return cleaned ? parseFloat(cleaned) : 0;
        };

        return {
          name: item.name,
          location: item.location,
          capacity_individuals: safeParseNum(item.capacity),
          capacity_family: safeParseNum(item.capacityFamily),
          floor_area: safeParseNum(item.floorArea),
          type: item.type,
          features: item.features,
          proximity: item.proximity,
          source_of_water: item.waterSource,
          remarks: item.remarks,
          lat: item.lat,
          lng: item.lng,
          contact_person_and_number: item.contact
        };
      });

      setEvacuationDataMap(prev => ({
        ...prev,
        [municipalityName]: mappedData
      }));
    }
  };

  const handleOpenFloodRisk = async (municipality: MunicipalityProfile) => {
    setSelectedFloodRiskMunicipality(municipality);
    setIsFloodRiskLoading(true);
    const data = await fetchFloodRiskData(municipality.name);
    setFloodRiskData(data);
    setIsFloodRiskLoading(false);
  };

  const handleOpenLandslideRisk = async (municipality: MunicipalityProfile) => {
    setSelectedLandslideMunicipality(municipality);
    setIsLandslideRiskLoading(true);
    const data = await fetchLandslideRiskData(municipality.name);
    setLandslideRiskData(data);
    setIsLandslideRiskLoading(false);
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
                <p className="text-slate-400 uppercase tracking-wide text-[11px] sm:text-xs">Flood Risk:</p>
                <button
                  type="button"
                  onClick={() => handleOpenFloodRisk(item)}
                  className={`rounded-md border px-2.5 py-1 text-xs font-semibold transition-colors hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300/40 ${floodRiskNeutralStyle}`}
                >
                  Risk Analysis
                </button>
              </div>

              <div className="mt-2 rounded-md border border-slate-700/70 bg-slate-900/50 px-2.5 py-2 flex items-center justify-between gap-2">
                <p className="text-slate-400 uppercase tracking-wide text-[11px] sm:text-xs">Rain Induced Land Slide:</p>
                <button
                  type="button"
                  onClick={() => handleOpenLandslideRisk(item)}
                  className={`rounded-md border px-2.5 py-1 text-xs font-semibold transition-colors hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300/40 ${floodRiskNeutralStyle}`}
                >
                  Risk Analysis
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
        <>
          {isFloodRiskLoading ? (
            <div className="fixed inset-0 z-[9999] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 flex flex-col items-center gap-4 shadow-2xl">
                <RefreshCw className="w-8 h-8 text-blue-400 animate-spin" />
                <p className="text-white font-medium">Loading flood data for {selectedFloodRiskMunicipality.name}...</p>
              </div>
            </div>
          ) : floodRiskData ? (
            <FloodRiskPopupCard
              data={floodRiskData}
              isOpen={!!selectedFloodRiskMunicipality}
              onClose={() => {
                setSelectedFloodRiskMunicipality(null);
                setFloodRiskData(null);
              }}
            />
          ) : (
            <div className="fixed inset-0 z-[9999] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedFloodRiskMunicipality(null)}>
              <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-md w-full flex flex-col items-center gap-4 shadow-2xl relative">
                <button
                  onClick={() => setSelectedFloodRiskMunicipality(null)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
                <AlertTriangle className="w-12 h-12 text-amber-500" />
                <div className="text-center">
                  <h3 className="text-white text-lg font-bold">Data Unavailable</h3>
                  <p className="text-slate-400 mt-2 text-sm">Flood risk reports are currently unavailable for {selectedFloodRiskMunicipality.name}. Please check back later or access the full map.</p>
                </div>
                <button
                  onClick={() => setSelectedFloodRiskMunicipality(null)}
                  className="mt-2 px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}
        </>
      )}
      {selectedLandslideMunicipality && (
        <>
          {isLandslideRiskLoading ? (
            <div className="fixed inset-0 z-[9999] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 flex flex-col items-center gap-4 shadow-2xl">
                <RefreshCw className="w-8 h-8 text-amber-400 animate-spin" />
                <p className="text-white font-medium">Loading Rain Induced Land Slide data for {selectedLandslideMunicipality.name}...</p>
              </div>
            </div>
          ) : landslideRiskData ? (
            <LandslideRiskPopupCard
              data={landslideRiskData}
              isOpen={!!selectedLandslideMunicipality}
              onClose={() => {
                setSelectedLandslideMunicipality(null);
                setLandslideRiskData(null);
              }}
            />
          ) : (
            <div className="fixed inset-0 z-[9999] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedLandslideMunicipality(null)}>
              <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-md w-full flex flex-col items-center gap-4 shadow-2xl relative">
                <button
                  onClick={() => setSelectedLandslideMunicipality(null)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
                <AlertTriangle className="text-amber-500 w-12 h-12" />
                <div className="text-center">
                  <h3 className="text-white text-lg font-bold">Data Unavailable</h3>
                  <p className="text-slate-400 mt-2 text-sm">Rain Induced Land Slide reports are currently unavailable for {selectedLandslideMunicipality.name}. Please check back later.</p>
                </div>
                <button
                  onClick={() => setSelectedLandslideMunicipality(null)}
                  className="mt-2 px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}
        </>
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
