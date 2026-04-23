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

const POSTER_FILES = [
  'OCD_Disaster_Preparedness_Guidebook_page-0001.jpg',
  'OCD_Disaster_Preparedness_Guidebook_page-0002.jpg',
  'OCD_Disaster_Preparedness_Guidebook_page-0003.jpg',
  'OCD_Disaster_Preparedness_Guidebook_page-0004.jpg',
  'OCD_Disaster_Preparedness_Guidebook_page-0005.jpg',
  'OCD_Disaster_Preparedness_Guidebook_page-0006.jpg',
  'OCD_Disaster_Preparedness_Guidebook_page-0007.jpg',
  'OCD_Disaster_Preparedness_Guidebook_page-0008.jpg',
  'OCD_Disaster_Preparedness_Guidebook_page-0009.jpg',
  'OCD_Disaster_Preparedness_Guidebook_page-0010.jpg',
  'OCD_Disaster_Preparedness_Guidebook_page-0011.jpg',
  'OCD_Disaster_Preparedness_Guidebook_page-0012.jpg',
  'OCD_Disaster_Preparedness_Guidebook_page-0013.jpg',
];

const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/pdrrmo2026/Rizal-PDRRMO-DashBoard/main/educational_posters';

export default function MaghandaVideos() {
  const [activeTab, setActiveTab] = useState<'videos' | 'posters'>('videos');
  const [selectedPoster, setSelectedPoster] = useState<string | null>(null);

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
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-4 bg-red-500 rounded-full"></div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wide">OCD Disaster Preparedness Guidebook</h3>
            </div>
            <span className="text-[10px] text-slate-500">{POSTER_FILES.length} Pages Available</span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
            {POSTER_FILES.map((filename, i) => (
              <div 
                key={filename} 
                onClick={() => setSelectedPoster(`${GITHUB_RAW_BASE}/${filename}`)}
                className="group relative bg-gray-950 border border-slate-800 rounded-lg overflow-hidden flex flex-col aspect-[1/1.414] hover:border-red-500/50 transition-all cursor-pointer shadow-lg"
              >
                {/* Image Preview */}
                <div className="relative flex-1 bg-slate-900 overflow-hidden">
                  <img 
                    src={`${GITHUB_RAW_BASE}/${filename}`} 
                    alt={`Poster Page ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-3">
                    <div className="bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <PlayCircle className="w-3 h-3" /> View Large
                    </div>
                  </div>
                </div>
                
                {/* Info Bar */}
                <div className="px-3 py-2 bg-gray-900 flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold text-slate-400">Page {i + 1}</span>
                  <a 
                    href={`${GITHUB_RAW_BASE}/${filename}`} 
                    download 
                    onClick={(e) => e.stopPropagation()}
                    className="p-1 hover:text-red-400 text-slate-500 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Guidebook Card */}
          <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-red-600/10 to-transparent border border-red-500/20 flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shrink-0 shadow-lg shadow-red-600/20">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h4 className="text-sm font-bold text-white mb-1">OCD Disaster Preparedness Guidebook</h4>
              <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">This comprehensive guidebook from the Office of Civil Defense (OCD) provides essential information for community-level preparedness. Click any page to view it in full size and study the preparedness measures for various hazards including earthquakes, floods, and tropical cyclones.</p>
            </div>
            <div className="flex flex-col gap-2 shrink-0">
              <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-xs font-bold text-white rounded-xl transition-all shadow-lg shadow-red-600/20">
                <Download className="w-4 h-4" /> Download Full Guide
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Poster Lightbox Modal */}
      {selectedPoster && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300"
          onClick={() => setSelectedPoster(null)}
        >
          <div 
            className="relative w-full max-w-4xl max-h-full flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedPoster(null)}
              className="absolute -top-12 right-0 p-2 text-white hover:text-red-400 transition-colors flex items-center gap-2 font-bold text-xs"
            >
              <X className="w-5 h-5" /> Close View
            </button>
            
            <div className="relative w-full overflow-auto rounded-xl shadow-2xl border border-white/10 bg-white p-1 sm:p-2">
              <img 
                src={selectedPoster} 
                alt="Selected Educational Poster"
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-inner"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <a 
                href={selectedPoster} 
                download
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-xl flex items-center gap-2 transition-all"
              >
                <Download className="w-4 h-4" /> Download High-Res
              </a>
              <button 
                onClick={() => setSelectedPoster(null)}
                className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-xl transition-all"
              >
                Return to Gallery
              </button>
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
