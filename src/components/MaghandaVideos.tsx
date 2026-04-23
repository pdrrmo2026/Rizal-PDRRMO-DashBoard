import { useState, useEffect, useCallback } from 'react';
import { Video, PlayCircle, BookOpen, Waves, CloudLightning, LifeBuoy, Image as ImageIcon, Info, Download, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

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

const GUIDEBOOK_PAGES = Array.from({ length: 13 }, (_, i) => {
  const pageNum = (i + 1).toString().padStart(4, '0');
  return {
    url: `https://raw.githubusercontent.com/pdrrmo2026/Rizal-PDRRMO-DashBoard/main/educational_posters/OCD_Disaster_Preparedness_Guidebook_page-${pageNum}.jpg`,
    title: `Disaster Preparedness Guidebook`,
    page: i + 1,
    total: 13
  };
});

const POSTER_SETS = [
  {
    id: 'ocd-guidebook',
    title: 'OCD Disaster Preparedness Guidebook',
    description: 'Comprehensive guide for family and community disaster preparedness and awareness.',
    coverImage: GUIDEBOOK_PAGES[0].url,
    pages: GUIDEBOOK_PAGES,
    source: 'Office of Civil Defense (OCD)',
    type: 'Guidebook'
  },
  {
    id: 'baha-poster',
    title: 'Baha (Flooding) Preparedness',
    description: 'Essential reminders and safety tips for flood events in the community.',
    coverImage: 'https://raw.githubusercontent.com/pdrrmo2026/Rizal-PDRRMO-DashBoard/main/educational_posters/OCD_Disaster_Preparedness_Guidebook_page-0001.jpg', // Placeholder for now
    pages: [], // Will be empty if only PDF exists
    pdfUrl: 'https://raw.githubusercontent.com/pdrrmo2026/Rizal-PDRRMO-DashBoard/main/baha_poster/Baha_final.pdf',
    source: 'PDRRMO',
    type: 'Poster'
  }
];

export default function MaghandaVideos() {
  const [activeTab, setActiveTab] = useState<'videos' | 'posters'>('videos');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentSet, setCurrentSet] = useState<typeof POSTER_SETS[0] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (set: typeof POSTER_SETS[0], index: number = 0) => {
    if (set.pages.length === 0) return; // Don't open if no images
    setCurrentSet(set);
    setCurrentIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = useCallback(() => {
    if (!currentSet) return;
    setCurrentIndex((prev) => (prev + 1) % currentSet.pages.length);
  }, [currentSet]);

  const prevImage = useCallback(() => {
    if (!currentSet) return;
    setCurrentIndex((prev) => (prev - 1 + currentSet.pages.length) % currentSet.pages.length);
  }, [currentSet]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, prevImage, nextImage]);

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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {POSTER_SETS.map((set) => (
              <div 
                key={set.id} 
                className="group relative bg-gray-950/60 border border-slate-700/50 rounded-2xl overflow-hidden flex flex-col hover:border-red-500/50 transition-all shadow-lg"
              >
                {/* Image Container */}
                <div 
                  className="relative aspect-[3/4] overflow-hidden cursor-pointer"
                  onClick={() => openLightbox(set)}
                >
                  <img 
                    src={set.coverImage} 
                    alt={set.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                  
                  {/* Click to open overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="bg-red-600/90 text-white p-3 rounded-full shadow-2xl scale-75 group-hover:scale-100 transition-transform">
                      <Maximize2 className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Page count indicator */}
                  {set.pages.length > 0 && (
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[10px] font-bold text-white flex items-center gap-1.5 shadow-xl">
                      <ImageIcon className="w-3 h-3 text-red-400" />
                      {set.pages.length} Pages
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 uppercase tracking-wider">
                      {set.type}
                    </span>
                    <span className="text-[9px] text-slate-500 uppercase tracking-wider">{set.source}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-2 line-clamp-1 group-hover:text-red-400 transition-colors">
                    {set.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mb-5 line-clamp-2 leading-relaxed">
                    {set.description}
                  </p>
                  
                  <div className="mt-auto flex items-center gap-2">
                    <button 
                      onClick={() => openLightbox(set)}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-[10px] font-bold rounded-xl border transition-all ${
                        set.pages.length > 0 
                          ? 'bg-red-600 border-red-500 text-white hover:bg-red-700 shadow-lg shadow-red-600/20' 
                          : 'bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      View Gallery
                    </button>
                    {set.pdfUrl && (
                      <a 
                        href={set.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all"
                        title="Download PDF"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Lightbox Modal */}
          {isLightboxOpen && currentSet && (
            <div 
              className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex flex-col animate-in fade-in duration-300"
              onClick={closeLightbox}
            >
              {/* Toolbar */}
              <div className="flex items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-black/80 to-transparent">
                <div className="flex flex-col">
                  <h3 className="text-white font-bold text-sm sm:text-base">{currentSet.title}</h3>
                  <p className="text-slate-400 text-[10px] sm:text-xs">
                    Page {currentIndex + 1} of {currentSet.pages.length}
                  </p>
                </div>
                <button 
                  onClick={closeLightbox}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all shadow-2xl"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Image Content */}
              <div className="flex-1 relative flex items-center justify-center p-4 sm:p-8 overflow-hidden">
                <button 
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-4 sm:left-8 z-10 p-3 rounded-full bg-black/40 hover:bg-white/10 text-white border border-white/10 transition-all"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>

                <div 
                  className="relative max-w-5xl w-full h-full flex items-center justify-center animate-in zoom-in-95 duration-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img 
                    src={currentSet.pages[currentIndex].url} 
                    alt={`Page ${currentIndex + 1}`}
                    className="max-w-full max-h-full object-contain shadow-[0_0_50px_rgba(0,0,0,0.5)] select-none rounded-sm"
                    loading="lazy"
                  />
                  
                  {/* Floating Page Indicator */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-xs font-bold text-white shadow-2xl">
                    {currentIndex + 1} / {currentSet.pages.length}
                  </div>
                </div>

                <button 
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-4 sm:right-8 z-10 p-3 rounded-full bg-black/40 hover:bg-white/10 text-white border border-white/10 transition-all"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </div>

              {/* Thumbnail strip (optional, can add later if needed) */}
            </div>
          )}
          
          <div className="mt-8 p-6 rounded-2xl bg-blue-500/5 border border-blue-500/20 flex flex-col md:flex-row items-center gap-6 text-center md:text-left shadow-lg">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center shrink-0 shadow-inner">
              <Info className="w-7 h-7 text-blue-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-blue-400 mb-1.5 uppercase tracking-wide">More Posters Coming Soon</h4>
              <p className="text-xs text-slate-400 max-w-3xl leading-relaxed">We are currently digitizing more high-quality educational posters and infographics from PAGASA and PDRRMO. These materials will be available for viewing and high-resolution PDF download soon.</p>
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
