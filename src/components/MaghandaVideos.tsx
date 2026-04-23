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

const POSTER_BASE_URL = "https://raw.githubusercontent.com/pdrrmo2026/Rizal-PDRRMO-DashBoard/main/educational_posters";

const POSTERS = [
  { id: 1, file: 'OCD_Disaster_Preparedness_Guidebook_page-0001.jpg', title: 'Disaster Preparedness Guidebook - Cover' },
  { id: 2, file: 'OCD_Disaster_Preparedness_Guidebook_page-0002.jpg', title: 'Emergency Hotlines & Contacts' },
  { id: 3, file: 'OCD_Disaster_Preparedness_Guidebook_page-0003.jpg', title: 'Earthquake Preparedness' },
  { id: 4, file: 'OCD_Disaster_Preparedness_Guidebook_page-0004.jpg', title: 'Fire Safety & Prevention' },
  { id: 5, file: 'OCD_Disaster_Preparedness_Guidebook_page-0005.jpg', title: 'Flood Safety Guide' },
  { id: 6, file: 'OCD_Disaster_Preparedness_Guidebook_page-0006.jpg', title: 'Tsunami & Storm Surge' },
  { id: 7, file: 'OCD_Disaster_Preparedness_Guidebook_page-0007.jpg', title: 'Volcanic Eruption Awareness' },
  { id: 8, file: 'OCD_Disaster_Preparedness_Guidebook_page-0008.jpg', title: 'Landslide Precautions' },
  { id: 9, file: 'OCD_Disaster_Preparedness_Guidebook_page-0009.jpg', title: 'Typhoon & Heavy Rainfall' },
  { id: 10, file: 'OCD_Disaster_Preparedness_Guidebook_page-0010.jpg', title: 'Emergency Go Bag Essentials' },
  { id: 11, file: 'OCD_Disaster_Preparedness_Guidebook_page-0011.jpg', title: 'First Aid Basic Skills' },
  { id: 12, file: 'OCD_Disaster_Preparedness_Guidebook_page-0012.jpg', title: 'Community Evacuation Plan' },
  { id: 13, file: 'OCD_Disaster_Preparedness_Guidebook_page-0013.jpg', title: 'Post-Disaster Recovery' },
];

export default function MaghandaVideos() {
  const [activeTab, setActiveTab] = useState<'videos' | 'posters'>('videos');
  const [selectedPoster, setSelectedPoster] = useState<typeof POSTERS[0] | null>(null);

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
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {POSTERS.map((poster) => (
              <div 
                key={poster.id} 
                onClick={() => setSelectedPoster(poster)}
                className="group relative bg-gray-950 border border-slate-800 rounded-xl overflow-hidden flex flex-col aspect-[3/4] hover:border-red-500 transition-all cursor-pointer shadow-lg"
              >
                <div className="flex-1 overflow-hidden relative bg-slate-900">
                  <img 
                    src={`${POSTER_BASE_URL}/${poster.file}`}
                    alt={poster.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <div className="flex items-center gap-2 text-white text-[10px] font-bold">
                      <PlayCircle className="w-4 h-4" /> Click to enlarge
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-gray-900/80 border-t border-slate-800">
                  <h4 className="text-[10px] font-bold text-slate-200 line-clamp-1">{poster.title}</h4>
                </div>
              </div>
            ))}
          </div>

          {/* Lightbox / Modal */}
          {selectedPoster && (
            <div 
              className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-in fade-in zoom-in duration-300"
              onClick={() => setSelectedPoster(null)}
            >
              <button 
                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/10 transition-colors z-10"
                onClick={() => setSelectedPoster(null)}
              >
                <X className="w-6 h-6" />
              </button>
              
              <div 
                className="relative max-w-6xl w-full h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-full mb-4 flex items-center justify-between bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10">
                  <div>
                    <h3 className="text-white font-bold text-lg leading-tight">{selectedPoster.title}</h3>
                    <p className="text-slate-400 text-[10px] uppercase tracking-widest mt-1">OCD Disaster Preparedness Guidebook</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <a 
                      href={`${POSTER_BASE_URL}/${selectedPoster.file}`}
                      download
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors"
                    >
                      <Download className="w-4 h-4" /> Download PDF
                    </a>
                    <button 
                      className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/10 transition-colors"
                      onClick={() => setSelectedPoster(null)}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div className="relative flex-1 w-full overflow-y-auto bg-slate-950 rounded-xl shadow-2xl border border-white/10 p-2 sm:p-4 flex justify-center items-start scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-slate-900">
                  <img 
                    src={`${POSTER_BASE_URL}/${selectedPoster.file}`}
                    alt={selectedPoster.title}
                    className="w-full max-w-4xl h-auto shadow-2xl"
                  />
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-8 p-6 rounded-xl bg-blue-500/5 border border-blue-500/20 flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
              <Info className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-blue-400 mb-1">More Posters Coming Soon</h4>
              <p className="text-xs text-slate-400 max-w-2xl">We are currently curating high-quality educational posters and infographics from PAGASA and PDRRMO. These materials will be available for download in high-resolution PDF format soon.</p>
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
