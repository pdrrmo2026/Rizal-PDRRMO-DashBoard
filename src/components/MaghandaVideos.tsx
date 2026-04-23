import { Video, PlayCircle, BookOpen, Waves, CloudLightning, LifeBuoy, Image as ImageIcon, Info, Download, X, ChevronLeft, ChevronRight, Maximize2, FileText, ExternalLink } from 'lucide-react';

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

const POSTERS_BASE_URL = "https://raw.githubusercontent.com/pdrrmo2026/Rizal-PDRRMO-DashBoard/main/educational_posters";

const POSTER_PAGES = Array.from({ length: 13 }, (_, i) => ({
  id: `page-${i + 1}`,
  url: `${POSTERS_BASE_URL}/OCD_Disaster_Preparedness_Guidebook_page-${(i + 1).toString().padStart(4, '0')}.jpg`,
  title: `OCD Disaster Preparedness Guidebook`,
  page: i + 1,
  description: 'Official Disaster Preparedness Guidebook from the Office of Civil Defense (OCD).'
}));

function PostersLightbox({ isOpen, onClose, pages }: { isOpen: boolean, onClose: () => void, pages: typeof POSTER_PAGES }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCurrentIndex(0); // Reset to first page when opening
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setCurrentIndex((prev) => (prev + 1) % pages.length);
      if (e.key === 'ArrowLeft') setCurrentIndex((prev) => (prev - 1 + pages.length) % pages.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, pages.length]);

  if (!isOpen) return null;

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % pages.length);
  };

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + pages.length) % pages.length);
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* Close button */}
      <button 
        className="absolute top-6 right-6 text-white/50 hover:text-white p-3 transition-colors z-[10001] bg-white/5 hover:bg-white/10 rounded-full"
        onClick={onClose}
      >
        <X className="w-8 h-8" />
      </button>

      {/* Page counter */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-bold tracking-widest uppercase">
        {currentIndex + 1} / {pages.length}
      </div>
      
      {/* Navigation Arrows */}
      <button 
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-white/40 hover:text-white p-5 transition-all z-[10001] bg-white/5 hover:bg-white/10 hover:scale-110 rounded-full group"
        onClick={prev}
      >
        <ChevronLeft className="w-8 h-8 sm:w-12 sm:h-12 group-active:scale-90 transition-transform" />
      </button>
      
      <button 
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-white/40 hover:text-white p-5 transition-all z-[10001] bg-white/5 hover:bg-white/10 hover:scale-110 rounded-full group"
        onClick={next}
      >
        <ChevronRight className="w-8 h-8 sm:w-12 sm:h-12 group-active:scale-90 transition-transform" />
      </button>

      {/* Main Image View */}
      <div 
        className="relative w-full h-[80vh] flex flex-col items-center justify-center p-4 sm:p-12"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative max-w-full max-h-full flex items-center justify-center group">
          <img 
            key={currentIndex}
            src={pages[currentIndex].url} 
            alt={`Page ${currentIndex + 1}`}
            className="max-w-full max-h-[75vh] object-contain shadow-2xl rounded-sm animate-in fade-in zoom-in-95 duration-500 select-none pointer-events-none border border-white/5"
          />
          
          {/* Swipe Hint (Mobile) */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-[10px] text-white/40 font-bold uppercase tracking-tighter sm:hidden">
            <ChevronLeft className="w-3 h-3" /> Swipe <ChevronRight className="w-3 h-3" />
          </div>
        </div>
        
        {/* Caption */}
        <div className="mt-8 text-center max-w-2xl px-6">
           <h4 className="text-white font-bold text-lg sm:text-xl tracking-tight">
             {pages[currentIndex].title}
           </h4>
           <p className="text-white/40 text-xs sm:text-sm mt-2 leading-relaxed">
             {pages[currentIndex].description}
           </p>
        </div>
      </div>
      
      {/* Thumbnails preview (optional, hidden on small screens) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/10 max-w-[90vw] overflow-x-auto no-scrollbar">
        {pages.map((p, idx) => (
          <button
            key={p.id}
            onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
            className={`relative shrink-0 w-10 h-14 rounded-sm overflow-hidden border-2 transition-all ${
              currentIndex === idx ? 'border-red-500 scale-110' : 'border-transparent opacity-40 hover:opacity-100'
            }`}
          >
            <img src={p.url} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

function PDFViewer({ isOpen, onClose, url, title }: { isOpen: boolean, onClose: () => void, url: string, title: string }) {
  if (!isOpen) return null;
  
  // Use Google Docs viewer for embedding PDF reliably
  const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-10 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl h-full bg-slate-900 rounded-2xl overflow-hidden border border-white/10 flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white">
              <FileText className="w-5 h-5" />
            </div>
            <h4 className="text-white font-bold text-sm sm:text-base truncate max-w-[200px] sm:max-w-md">{title}</h4>
          </div>
          <div className="flex items-center gap-2">
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-slate-400 hover:text-white transition-colors"
              title="Open in new tab"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="flex-1 bg-slate-800">
          <iframe 
            src={viewerUrl} 
            className="w-full h-full border-none"
            title="PDF Viewer"
          />
        </div>
      </div>
    </div>
  );
}

export default function MaghandaVideos() {
  const [activeTab, setActiveTab] = useState<'videos' | 'posters'>('videos');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isPDFOpen, setIsPDFOpen] = useState(false);
  const [activePDF, setActivePDF] = useState({ url: '', title: '' });

  const BAHA_POSTER_URL = "https://raw.githubusercontent.com/pdrrmo2026/Rizal-PDRRMO-DashBoard/main/baha_poster/Baha_final.pdf";

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
            {/* Guidebook Main Card */}
            <div 
              onClick={() => setIsLightboxOpen(true)}
              className="group relative bg-gray-950/60 border border-slate-700/50 rounded-2xl overflow-hidden flex flex-col hover:border-red-500/50 transition-all cursor-pointer shadow-2xl"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-slate-900">
                <img 
                  src={POSTER_PAGES[0].url} 
                  alt="OCD Guidebook" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                
                {/* Overlay UI */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-xl mb-3">
                    <Maximize2 className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-white text-xs font-bold uppercase tracking-widest">Click to View Guidebook</span>
                </div>

                {/* Page Count Badge */}
                <div className="absolute top-4 right-4 px-2 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white flex items-center gap-1.5">
                  <ImageIcon className="w-3 h-3 text-red-400" />
                  13 PAGES
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                  <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest">IEC Material</span>
                </div>
                <h4 className="text-sm font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                  OCD Disaster Preparedness Guidebook
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4">
                  Comprehensive guidebook from the Office of Civil Defense covering essential safety protocols for various disaster scenarios.
                </p>
                
                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-[10px] text-slate-500 font-medium">Educational Resource</span>
                  </div>
                  <button className="p-2 rounded-lg bg-slate-900 hover:bg-red-600 transition-colors group/btn">
                    <Download className="w-3.5 h-3.5 text-slate-400 group-hover/btn:text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Baha Final Poster Card (PDF) */}
            <div 
              onClick={() => {
                setActivePDF({ url: BAHA_POSTER_URL, title: 'Baha Final Poster' });
                setIsPDFOpen(true);
              }}
              className="group relative bg-gray-950/60 border border-slate-700/50 rounded-2xl overflow-hidden flex flex-col hover:border-red-500/50 transition-all cursor-pointer shadow-2xl"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4 group-hover:scale-110 transition-transform duration-500">
                  <div className="w-24 h-32 bg-slate-900 border-2 border-slate-700 rounded-lg flex items-center justify-center relative shadow-2xl overflow-hidden">
                    <FileText className="w-12 h-12 text-slate-600 group-hover:text-red-400 transition-colors" />
                    <div className="absolute top-0 right-0 w-8 h-8 bg-slate-800 border-b border-l border-slate-700 rounded-bl-lg"></div>
                  </div>
                  <div className="px-4 py-1.5 rounded-full bg-red-600/10 border border-red-600/30 text-[10px] font-bold text-red-400 uppercase tracking-widest">
                    PDF Material
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60"></div>
                
                {/* Overlay UI */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-xl mb-3">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-white text-xs font-bold uppercase tracking-widest">Click to View PDF</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                  <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest">IEC Poster</span>
                </div>
                <h4 className="text-sm font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                  Baha Final Poster
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4">
                  Official flood awareness and community preparedness poster for the #PanatagAngMayAlam campaign.
                </p>
                
                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-[10px] text-slate-500 font-medium">Educational PDF</span>
                  </div>
                  <a 
                    href={BAHA_POSTER_URL}
                    download
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-lg bg-slate-900 hover:bg-red-600 transition-colors group/btn"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-400 group-hover/btn:text-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-10 p-8 rounded-2xl bg-gradient-to-r from-blue-600/10 to-transparent border border-blue-500/20 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center shrink-0 shadow-lg border border-blue-500/30">
              <Info className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h4 className="text-base font-bold text-blue-400 mb-1">Stay Informed, Stay Prepared</h4>
              <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
                We are continuously updating our IEC materials. The OCD Disaster Preparedness Guidebook is our primary educational resource for community safety. Check back regularly for new posters and localized infographics from Rizal PDRRMO.
              </p>
            </div>
          </div>
        </div>
      )}

      <PostersLightbox 
        isOpen={isLightboxOpen} 
        onClose={() => setIsLightboxOpen(false)} 
        pages={POSTER_PAGES} 
      />

      <PDFViewer
        isOpen={isPDFOpen}
        onClose={() => setIsPDFOpen(false)}
        url={activePDF.url}
        title={activePDF.title}
      />

      <div className="text-[11px] text-gray-500 text-center pt-4 mt-2 border-t border-slate-800">
        Sources: PAGASA-DOST Official YouTube Channel (#MAGHANDA) · #PanatagAngMayAlam Campaign
      </div>
    </section>
  );
}
