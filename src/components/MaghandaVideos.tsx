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
  accent: string;
  hashtag: string;
  hashtagColor: string;
  presenter?: string;
};

const VIDEOS: MaghandaVideo[] = [
  {
    id: 'ffws',
    title: 'Flood Forecasting and Warning System (FFWS)',
    shortTitle: 'FFWS',
    description: 'Learn how PAGASA issues flood forecasts and warnings for major Philippine river basins, including the Marikina River system.',
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
    description: 'Understand PAGASA\'s color-coded rainfall warnings (Yellow, Orange, Red) and thunderstorm advisories for community awareness, preparedness, and emergency response.',
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
    description: 'Hosted by Dingdong Dantes, this video shares essential flood safety reminders — when to evacuate, what to prepare, and how to keep your family safe before, during, and after a flood event.',
    embedSrc: `https://www.youtube.com/embed/DmC1hYhT6p0?list=${PANATAG_PLAYLIST_ID}&rel=0&modestbranding=1`,
    Icon: LifeBuoy,
    accent: 'from-emerald-500 to-green-700',
    hashtag: '#PanatagAngMayAlam',
    hashtagColor: 'text-emerald-300',
    presenter: 'Dingdong Dantes',
  },
];

const POSTER_DATA = [
  {
    id: 'educational_posters',
    title: 'Disaster Preparedness Guidebook',
    folder: 'educational_posters',
    images: Array.from({ length: 13 }, (_, i) => `OCD_Disaster_Preparedness_Guidebook_page-${(i + 1).toString().padStart(4, '0')}.jpg`)
  },
  {
    id: 'pagasa_info',
    title: 'PAGASA Website Info',
    folder: 'PAGASA_Website_info',
    images: ['Website_FINAL_Page_1.jpg', 'Website_FINAL_Page_2.jpg']
  },
  {
    id: 'mgb_posters',
    title: 'MGB Hazard Posters',
    folder: 'MGB_posters',
    images: [
      'Flood_Page_1.jpg', 'Flood_Page_2.jpg',
      'Karst_subsidence_Page_1.jpg', 'Karst_subsidence_Page_2.jpg',
      'Landslie_Page_1.jpg', 'Landslie_Page_2.jpg'
    ]
  },
  {
    id: 'fire_materials',
    title: 'Fire Information Materials',
    folder: 'fire_information_materials',
    images: [
      '7e5b87ad-0e31-4843-8559-92e2418dfc4c.jpg',
      'a0e67b31-dbe9-4230-9bd6-27536c0fc906.jpg',
      'ba9344ba-3b6f-416a-99d8-bf5448696c55.jpg',
      'f780fbed-d0c3-4632-9bc8-13f8d3f14fba.jpg'
    ]
  },
  {
    id: 'baha_poster',
    title: 'Baha (Flood) Poster',
    folder: 'baha_poster',
    images: ['Baha_final_Page_1.jpg', 'Baha_final_Page_2.jpg']
  },
  {
    id: 'earthquake_guide',
    title: 'Earthquake Guides',
    folder: 'earthquake_guide',
    images: [
      'Community Eartquake Guide_Page_1.jpg', 'Community Eartquake Guide_Page_2.jpg',
      'Family Earthquake Preparedness_Page_1.jpg', 'Family Earthquake Preparedness_Page_2.jpg',
      'PEIS_final_Page_1.jpg', 'PEIS_final_Page_2.jpg'
    ]
  },
  {
    id: 'el_nino',
    title: 'El Niño Information',
    folder: 'El_Nino',
    images: ['El Nio_Page_1.jpg', 'El Nio_Page_2.jpg']
  },
  {
    id: 'la_nina',
    title: 'La Niña Information',
    folder: 'La_Nina',
    images: ['La Nia_Page_1.jpg', 'La Nia_Page_2.jpg']
  },
  {
    id: 'thunderstorm',
    title: 'Thunderstorm Information',
    folder: 'thunderstorm',
    images: ['Thunderstorm_Page_1.jpg', 'Thunderstorm_Page_2.jpg']
  },
  {
    id: 'tropical_cyclone',
    title: 'Tropical Cyclone Warnings',
    folder: 'tropical_cyclone',
    images: ['TCWS_Page_1.jpg', 'TCWS_Page_2.jpg']
  },
  {
    id: 'weather_advisory',
    title: 'Weather Advisory Posters',
    folder: 'weather_advisory_poster',
    images: [
      'a043549a-5840-4900-a51b-944b8e980fd1.jpg',
      'b91b2244-983e-4927-9d1a-62389b883ec3.jpg',
      'd8f95b17-baf7-4d36-8464-d32fc5b7b667.jpg'
    ]
  }
];

export default function MaghandaVideos() {
  const [activeTab, setActiveTab] = useState<'videos' | 'posters'>('videos');
  const [selectedGallery, setSelectedGallery] = useState<typeof POSTER_DATA[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = useCallback(() => {
    if (selectedGallery) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedGallery.images.length);
    }
  }, [selectedGallery]);

  const prevImage = useCallback(() => {
    if (selectedGallery) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedGallery.images.length) % selectedGallery.images.length);
    }
  }, [selectedGallery]);

  const closeGallery = useCallback(() => {
    setSelectedGallery(null);
    setCurrentImageIndex(0);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedGallery) return;
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') closeGallery();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedGallery, nextImage, prevImage, closeGallery]);

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
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'videos'
              ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
              : 'text-slate-400 hover:text-slate-200'
              }`}
          >
            <Video className="w-3.5 h-3.5" />
            Videos
          </button>
          <button
            onClick={() => setActiveTab('posters')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'posters'
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
                <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-700/50 bg-gray-900/50">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${v.accent} flex items-center justify-center text-white shrink-0 shadow-md`}>
                    <v.Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-white text-sm leading-tight">{v.title}</h3>
                    <p className={`text-[11px] font-semibold mt-0.5 ${v.hashtagColor}`}>
                      {v.hashtag}
                      {v.presenter && <span className="text-gray-400 font-normal"> · with {v.presenter}</span>}
                    </p>
                  </div>
                </div>

                <div className="relative w-full bg-black" style={{ paddingBottom: '56.25%' }}>
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

                <div className="p-4 flex-1">
                  <h4 className="text-xs font-semibold text-white mb-1.5 flex items-center gap-1.5">
                    <PlayCircle className="w-3.5 h-3.5 text-red-400" />
                    About this video
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed">{v.description}</p>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {POSTER_DATA.map((gallery) => (
              <div
                key={gallery.id}
                onClick={() => {
                  setSelectedGallery(gallery);
                  setCurrentImageIndex(0);
                }}
                className="group relative bg-gray-950/60 border border-slate-700/50 rounded-xl overflow-hidden flex flex-col aspect-[3/4] hover:border-red-500/50 transition-all cursor-pointer"
              >
                {/* Cover Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={`/${gallery.folder}/${gallery.images[0]}`}
                    alt={gallery.title}
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent"></div>
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-slate-900/80 backdrop-blur-sm border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Maximize2 className="w-8 h-8 text-white/50 group-hover:text-red-400" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-2 drop-shadow-md">{gallery.title}</h4>
                  <div className="flex items-center gap-2 px-3 py-1 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                    <ImageIcon className="w-3 h-3 text-red-400" />
                    <span className="text-[10px] font-bold text-slate-300 uppercase">{gallery.images.length} Pages</span>
                  </div>
                </div>

                {/* Badge */}
                <div className="absolute top-0 right-0 p-3 z-20">
                  <div className="bg-red-600 text-white text-[8px] font-bold px-2 py-0.5 rounded uppercase shadow-lg shadow-red-600/30">IEC Material</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 rounded-xl bg-blue-500/5 border border-blue-500/20 flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
              <Info className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-blue-400 mb-1">More Resources</h4>
              <p className="text-xs text-slate-400 max-w-2xl">These materials are sourced from official government agencies including PAGASA, MGB, and OCD. They are intended for public education and disaster preparedness awareness.</p>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedGallery && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center animate-in fade-in duration-300"
          onClick={closeGallery}
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 p-3 rounded-full bg-white/5 hover:bg-red-600 text-white transition-all z-[100]"
            onClick={closeGallery}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Arrows */}
          {selectedGallery.images.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all z-[100]"
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all z-[100]"
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          {/* Main Image Container */}
          <div
            className="w-full h-full max-w-5xl p-4 sm:p-8 flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                key={currentImageIndex}
                src={`/${selectedGallery.folder}/${selectedGallery.images[currentImageIndex]}`}
                alt={`${selectedGallery.title} - Page ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain shadow-2xl animate-in zoom-in-95 duration-300"
              />
            </div>
          </div>

          {/* Bottom Info Bar */}
          <div
            className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black to-transparent p-8 flex flex-col items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-white text-center drop-shadow-lg">{selectedGallery.title}</h3>
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold">
                Page {currentImageIndex + 1} of {selectedGallery.images.length}
              </span>
              <button className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all">
                <Download className="w-3.5 h-3.5" />
                Download Page
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="text-[11px] text-gray-500 text-center pt-4 mt-2 border-t border-slate-800">
        Sources: PAGASA-DOST · OCD · MGB-DENR · Official Disaster Preparedness Campaigns
      </div>
    </section>
  );
}
