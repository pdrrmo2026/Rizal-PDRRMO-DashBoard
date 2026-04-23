import { useState, useEffect, useCallback } from 'react';
import { Video, PlayCircle, BookOpen, Waves, CloudLightning, LifeBuoy, Image as ImageIcon, Info, Download, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

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

const POSTERS = Array.from({ length: 13 }, (_, i) => ({
  id: `poster-${i + 1}`,
  title: `Disaster Preparedness Guide - Page ${i + 1}`,
  description: `OCD Disaster Preparedness Guidebook for community awareness. Page ${i + 1} of 13.`,
  url: `https://raw.githubusercontent.com/pdrrmo2026/Rizal-PDRRMO-DashBoard/main/educational_posters/OCD_Disaster_Preparedness_Guidebook_page-${(i + 1).toString().padStart(4, '0')}.jpg`,
  thumbnail: `https://raw.githubusercontent.com/pdrrmo2026/Rizal-PDRRMO-DashBoard/main/educational_posters/OCD_Disaster_Preparedness_Guidebook_page-${(i + 1).toString().padStart(4, '0')}.jpg`,
}));

export default function MaghandaVideos() {
  const [activeTab, setActiveTab] = useState<'videos' | 'posters'>('videos');
  const [selectedPosterIndex, setSelectedPosterIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);

  const handleNext = useCallback(() => {
    if (selectedPosterIndex !== null) {
      setSelectedPosterIndex((prev) => (prev! + 1) % POSTERS.length);
      setZoom(1);
    }
  }, [selectedPosterIndex]);

  const handlePrev = useCallback(() => {
    if (selectedPosterIndex !== null) {
      setSelectedPosterIndex((prev) => (prev! - 1 + POSTERS.length) % POSTERS.length);
      setZoom(1);
    }
  }, [selectedPosterIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPosterIndex === null) return;
      if (e.key === 'Escape') setSelectedPosterIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPosterIndex, handleNext, handlePrev]);

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
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {POSTERS.map((poster, index) => (
              <div 
                key={poster.id} 
                onClick={() => setSelectedPosterIndex(index)}
                className="group relative bg-gray-950/60 border border-slate-700/50 rounded-xl overflow-hidden flex flex-col aspect-[3/4] hover:border-red-500/50 transition-all cursor-pointer ring-offset-black hover:ring-2 ring-red-500/30"
              >
                <div className="absolute inset-0 bg-slate-900 overflow-hidden">
                  <img 
                    src={poster.thumbnail} 
                    alt={poster.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                </div>
                
                <div className="absolute inset-0 flex flex-col justify-end p-3">
                  <h4 className="text-[10px] font-bold text-white mb-1 drop-shadow-md">{poster.title}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] text-slate-300 font-medium">Page {index + 1}</span>
                    <div className="p-1 rounded-md bg-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Lightbox Modal */}
          {selectedPosterIndex !== null && (
            <div 
              className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
              onClick={() => setSelectedPosterIndex(null)}
            >
              {/* Controls */}
              <div className="absolute top-4 right-4 flex items-center gap-2 z-10" onClick={e => e.stopPropagation()}>
                <button 
                  onClick={() => setZoom(prev => Math.min(prev + 0.2, 3))}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setZoom(prev => Math.max(prev - 0.2, 0.5))}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setSelectedPosterIndex(null)}
                  className="p-2 rounded-full bg-red-600/80 hover:bg-red-600 text-white transition-colors ml-2"
                  title="Close (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation */}
              <button 
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 hover:bg-white/15 text-white transition-all z-10 border border-white/10"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 hover:bg-white/15 text-white transition-all z-10 border border-white/10"
              >
                <ChevronRight className="w-8 h-8" />
              </button>

              {/* Image Container */}
              <div 
                className="relative max-w-full max-h-full transition-transform duration-200 cursor-grab active:cursor-grabbing"
                style={{ transform: `scale(${zoom})` }}
                onClick={e => e.stopPropagation()}
              >
                <img 
                  src={POSTERS[selectedPosterIndex].url} 
                  alt={POSTERS[selectedPosterIndex].title}
                  className="max-w-[90vw] max-h-[85vh] object-contain shadow-2xl rounded-sm ring-1 ring-white/10"
                />
                
                {/* Info Overlay (Optional) */}
                <div className="absolute bottom-[-40px] left-0 right-0 text-center">
                  <p className="text-white text-sm font-semibold">{POSTERS[selectedPosterIndex].title}</p>
                  <p className="text-slate-400 text-xs">Image {selectedPosterIndex + 1} of {POSTERS.length}</p>
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
