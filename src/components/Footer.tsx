import { Phone, MapPin, ExternalLink } from 'lucide-react';

type Contact = { label: string; tel: string; display: string };
type Area = string;
type Source = { label: string; url: string };

const CONTACTS: Contact[] = [
  { label: 'NDRRMC Hotline', tel: '911', display: '911' },
  { label: 'PAGASA', tel: '+6328284-0800', display: '(02) 8284-0800' },
  { label: 'Antipolo CDRRMO', tel: '+6328650-6790', display: '(02) 8650-6790' },
  { label: 'Marikina CDRRMO', tel: '+6328942-4053', display: '(02) 8942-4053' },
  { label: 'LLDA Hotline', tel: '+6328641-4025', display: '(02) 8641-4025' },
  { label: 'Rizal PDRRMO', tel: '+6328539-1721', display: '8539-1721' },
  { label: 'Laguna Provincial DRRMO', tel: '+63427112222', display: '(042) 711-2222' },
];

const AREAS: Area[] = [
  'Antipolo City, Rizal',
  'Marikina City, Metro Manila',
  'Rodriguez (Montalban), Rizal',
  'Cainta & Taytay, Rizal',
  'Laguna de Bay (Bay, Lumban, Cardona, Muntinlupa)',
];

const SOURCES: Source[] = [
  { label: 'PAGASA Flood Information', url: 'https://www.pagasa.dost.gov.ph/flood' },
  { label: 'PAGASA FFWS - Water Level', url: 'https://pasig-marikina-tullahanffws.pagasa.dost.gov.ph/' },
  { label: 'Open-Meteo Weather API', url: 'https://open-meteo.com/' },
  { label: 'PAGASA PANaHON Network', url: 'https://www.panahon.gov.ph/' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-8 sm:mt-12">
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          {/* Emergency Contacts & Coverage Image */}
          <div className="lg:col-span-2">
            <div className="bg-gray-950/40 border border-gray-800 rounded-xl overflow-hidden shadow-lg group">
              <img
                src="/emergency_contact_numbers.jpg"
                alt="Emergency Contact Numbers and Coverage Areas"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
            <p className="text-[10px] text-gray-500 mt-2 italic flex items-center gap-1">
              <Phone className="w-3 h-3" /> Source: Rizal PDRRMO Official Directory
            </p>
          </div>

          {/* Data Sources */}
          <div className="bg-gray-950/20 p-4 rounded-xl border border-gray-800/50">
            <h3 className="text-sm font-semibold text-gray-200 mb-4 flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-cyan-400" />
              Data Sources
            </h3>
            <ul className="space-y-3">
              {SOURCES.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 text-xs sm:text-sm text-blue-400 hover:text-blue-300 active:text-blue-200 transition-colors group"
                  >
                    <div className="w-6 h-6 rounded bg-blue-500/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-500/20 transition-colors">
                      <ExternalLink className="w-3 h-3" />
                    </div>
                    <span>{s.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-800 space-y-2">
          <p className="text-[11px] sm:text-xs text-gray-500 text-center leading-relaxed">
            ⚠️ This monitoring system uses real-time data from Open-Meteo API, PAGASA FFWS, and LLDA.
            Water level data is estimated based on precipitation patterns for river basins. For official flood
            warnings, always refer to PAGASA bulletins, LLDA advisories, and local government notices.
          </p>
          <p className="text-[10px] sm:text-xs text-gray-600 text-center">
            Data: Open-Meteo (CC BY 4.0) | PAGASA FFWS | Last Updated:{' '}
            {new Date().toLocaleDateString('en-PH', { timeZone: 'Asia/Manila' })}
          </p>
        </div>
      </div>
    </footer>
  );
}
