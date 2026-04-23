import { useState } from 'react';
import { Video, PlayCircle, BookOpen, Waves, CloudLightning, LifeBuoy, Image as ImageIcon, Info, Download } from 'lucide-react';

const PLAYLIST_ID = 'PLZHBSWDLr_J0LG_8GfuVYFyr9SKcbyBbb';
const PANATAG_PLAYLIST_ID = 'PLVjyOQDJ5woLGq7ef4VH0bJWviaafCZJS';

type MaghandaVideo = {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  embedSrc: string;
  Icon: React.ComponentType<{ className?: string }>;
  accent: string; // tailwind classes for icon container
  hashtag: string;
  hashtagColor: string;
  presenter?: string;
};

const VIDEOS: MaghandaVideo[] = [
  {
    id: 'ffws',
    title: 'Flood Forecasting and Warning System (FFWS)',
    shortTitle: 'FFWS',
    description:
      'Learn how PAGASA issues flood forecasts and warnings for major Philippine river basins, including the Marikina River system.',
    embedSrc: `https://www.youtube.com/embed/Hnj_FIUsiMc?list=${PLAYLIST_ID}&rel=0&modestbranding=1`,
    Icon: Waves,
    accent: 'from-blue-600 to-blue-800',
    hashtag: '#MAGHANDA',
    hashtagColor: 'text-red-300',
  },
  {
    id: 'heavy-rainfall',
    title: 'Heavy Rainfall and Thunderstorm Warning System',
    shortTitle: 'Heavy Rainfall & Thunderstorm',
    description:
      'Understand PAGASA\'s color-coded rainfall warnings (Yellow, Orange, Red) and thunderstorm advisories for community awareness, preparedness, and emergency response.',
    embedSrc: `https://www.youtube.com/embed/videoseries?list=${PLAYLIST_ID}&index=2&rel=0&modestbranding=1`,
    Icon: CloudLightning,
    accent: 'from-amber-500 to-orange-700',
    hashtag: '#MAGHANDA',
    hashtagColor: 'text-red-300',
  },
  {
    id: 'flood-safety',
    title: 'Flood Safety Reminders',
    shortTitle: 'Flood Safety',
    description:
      'Hosted by Dingdong Dantes, this video shares essential flood safety reminders — when to evacuate, what to prepare, and how to keep your family safe before, during, and after a flood event.',
    embedSrc: `https://www.youtube.com/embed/DmC1hYhT6p0?list=${PANATAG_PLAYLIST_ID}&rel=0&modestbranding=1`,
    Icon: LifeBuoy,
    accent: 'from-emerald-500 to-green-700',
    hashtag: '#PanatagAngMayAlam',
    hashtagColor: 'text-emerald-300',
    presenter: 'Dingdong Dantes',
  },
];

const POSTER_BASE_URL = 'https://raw.githubusercontent.com/pdrrmo2026/Rizal-PDRRMO-DashBoard/main/educational_posters';

const POSTERS = [
  { id: 1, title: 'Guidebook Cover', file: 'OCD_Disaster_Preparedness_Guidebook_page-0001.jpg' },
  { id: 2, title: 'Emergency Hotlines', file: 'OCD_Disaster_Preparedness_Guidebook_page-0002.jpg' },
  { id: 3, title: 'Earthquake Safety', file: 'OCD_Disaster_Preparedness_Guidebook_page-0003.jpg' },
  { id: 4, title: 'Tsunami Awareness', file: 'OCD_Disaster_Preparedness_Guidebook_page-0004.jpg' },
  { id: 5, title: 'Flood Preparedness', file: 'OCD_Disaster_Preparedness_Guidebook_page-0005.jpg' },
  { id: 6, title: 'Volcanic Eruption', file: 'OCD_Disaster_Preparedness_Guidebook_page-0006.jpg' },
  { id: 7, title: 'Landslide Warning', file: 'OCD_Disaster_Preparedness_Guidebook_page-0007.jpg' },
  { id: 8, title: 'Typhoon Safety', file: 'OCD_Disaster_Preparedness_Guidebook_page-0008.jpg' },
  { id: 9, title: 'Fire Safety', file: 'OCD_Disaster_Preparedness_Guidebook_page-0009.jpg' },
  { id: 10, title: 'Storm Surge', file: 'OCD_Disaster_Preparedness_Guidebook_page-0010.jpg' },
  { id: 11, title: 'Drought Awareness', file: 'OCD_Disaster_Preparedness_Guidebook_page-0011.jpg' },
  { id: 12, title: 'Basic First Aid', file: 'OCD_Disaster_Preparedness_Guidebook_page-0012.jpg' },
  { id: 13, title: 'Family Preparedness', file: 'OCD_Disaster_Preparedness_Guidebook_page-0013.jpg' },
];

export default function MaghandaVideos() {
  const [activeTab, setActiveTab] = useState<'videos' | 'posters'>('videos');

  return (
    <section className="bg-gradient-to-br from-red-950/40 via-gray-900 to-slate-900 border border-red-700/40 rounded-xl p-3 sm:p-4 md:p-6 shadow-xl">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-2 sm:gap-3 mb-6">
        <div className="flex items-start gap-2 sm:gap-3 min-w-0 flex-1">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white shadow-lg shrink-0">
            <BookOpen className="w-5 h-5 sm:w-7 sm:h-7" />
          </div>
          <div className="min-w-0">
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-white leading-tight">
              Information, Education & Communication (IEC)
            </h2>
            <p className="text-[11px] sm:text-sm text-gray-400 mt-1 uppercase tracking-wider">
              Disaster Awareness & Preparedness
            </p>
          </div>
        </div>
        
        {/* Tab Switcher */}
        <div className="flex bg-black/40 p-1 rounded-xl border border-slate-700/50">
          <button
            onClick={() => setActiveTab('videos')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'videos' 
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            Videos
          </button>
          <button
            onClick={() => setActiveTab('posters')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'posters' 
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            Posters
          </button>
        </div>
      </div>

      {activeTab === 'videos' ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-2 mb-4 px-2">
            <div className="w-1.5 h-4 bg-red-500 rounded-full"></div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">Educational Videos</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {VIDEOS.map((v) => (
              <article
                key={v.id}
                className="bg-gray-950/60 border border-slate-700/50 rounded-xl overflow-hidden flex flex-col"
              >
                {/* Title bar */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-700/50 bg-gray-900/50">
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${v.accent} flex items-center justify-center text-white shrink-0 shadow-md`}
                  >
                    <v.Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-white text-sm leading-tight">
                      {v.title}
                    </h3>
                    <p className={`text-[11px] font-semibold mt-0.5 ${v.hashtagColor}`}>
                      {v.hashtag}
                      {v.presenter && (
                        <span className="text-gray-400 font-normal"> · with {v.presenter}</span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Embedded YouTube player */}
                <div
                  className="relative w-full bg-black"
                  style={{ paddingBottom: '56.25%' }}
                >
                  <iframe
                    src={v.embedSrc}
                    title={`${v.title} - #MAGHANDA`}
                    className="absolute inset-0 w-full h-full"
                    frameBorder={0}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>

                {/* Description */}
                <div className="p-4 flex-1">
                  <h4 className="text-xs font-semibold text-white mb-1.5 flex items-center gap-1.5">
                    <PlayCircle className="w-3.5 h-3.5 text-red-400" />
                    About this video
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {v.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-2 mb-4 px-2">
            <div className="w-1.5 h-4 bg-red-500 rounded-full"></div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">Educational Posters</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {POSTERS.map((poster) => (
              <div key={poster.id} className="group relative bg-gray-950/60 border border-slate-700/50 rounded-xl overflow-hidden flex flex-col hover:border-red-500/50 transition-all shadow-lg hover:shadow-red-500/10">
                {/* Image Preview */}
                <div className="aspect-[3/4] relative overflow-hidden bg-slate-900 flex items-center justify-center">
                  <img 
                    src={`${POSTER_BASE_URL}/${poster.file}`} 
                    alt={poster.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <a 
                      href={`${POSTER_BASE_URL}/${poster.file}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-red-600 text-white hover:bg-red-500 transition-colors shadow-xl"
                      title="View Full Size"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                    <a 
                      href={`${POSTER_BASE_URL}/${poster.file}`} 
                      download 
                      className="p-3 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-colors shadow-xl border border-slate-600"
                      title="Download Image"
                    >
                      <Download className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Info */}
                <div className="p-3 border-t border-slate-800 bg-gray-900/80">
                  <h4 className="text-[11px] font-bold text-white uppercase tracking-wider line-clamp-1">{poster.title}</h4>
                  <p className="text-[9px] text-slate-500 mt-0.5">OCD Disaster Preparedness Guide</p>
                </div>

                {/* Label */}
                <div className="absolute top-2 right-2">
                  <div className="bg-red-600/90 backdrop-blur-sm text-white text-[8px] font-black px-2 py-0.5 rounded shadow-lg uppercase tracking-tighter">
                    IEC Poster
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-6 rounded-xl bg-red-500/5 border border-red-500/20 flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-red-400 mb-1">OCD Disaster Preparedness Guidebook</h4>
              <p className="text-xs text-slate-400 max-w-2xl">
                These posters are sourced from the Office of Civil Defense (OCD) Disaster Preparedness Guidebook. 
                They provide essential information for community awareness and family safety during various disaster scenarios.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="text-[11px] text-gray-500 text-center pt-4 mt-2 border-t border-slate-800">
        Sources: PAGASA-DOST Official YouTube Channel (#MAGHANDA) · #PanatagAngMayAlam Campaign
      </div>
    </section>
  );
}
