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

const BASE_URL = "https://raw.githubusercontent.com/pdrrmo2026/Rizal-PDRRMO-DashBoard/main";

const POSTER_COLLECTIONS = [
  {
    id: 'disaster-preparedness',
    title: 'Disaster Preparedness Guidebook',
    folder: 'educational_posters',
    description: 'OCD Disaster Preparedness Guidebook for community awareness and emergency readiness.',
    images: Array.from({ length: 13 }, (_, i) => `OCD_Disaster_Preparedness_Guidebook_page-${String(i + 1).padStart(4, '0')}.jpg`)
  },
  {
    id: 'pagasa-info',
    title: 'PAGASA Website Info',
    folder: 'PAGASA_Website_info',
    description: 'Essential information about PAGASA forecasting and automated warning systems.',
    images: ['Website_FINAL_Page_1.jpg', 'Website_FINAL_Page_2.jpg']
  },
  {
    id: 'mgb-posters',
    title: 'MGB Geohazard Posters',
    folder: 'MGB_posters',
    description: 'Official posters covering Flood, Landslide, and Karst Subsidence from MGB.',
    images: [
      'Flood_Page_1.jpg', 'Flood_Page_2.jpg',
      'Karst_subsidence_Page_1.jpg', 'Karst_subsidence_Page_2.jpg',
      'Landslie_Page_1.jpg', 'Landslie_Page_2.jpg'
    ]
  },
  {
    id: 'earthquake-guide',
    title: 'Earthquake Preparedness Guides',
    folder: 'earthquake_guide',
    description: 'Comprehensive guides for family and community earthquake safety protocols.',
    images: [
      'Community Eartquake Guide_Page_1.jpg', 'Community Eartquake Guide_Page_2.jpg',
      'Family Earthquake Preparedness_Page_1.jpg', 'Family Earthquake Preparedness_Page_2.jpg',
      'PEIS_final_Page_1.jpg', 'PEIS_final_Page_2.jpg'
    ]
  },
  {
    id: 'fire-info',
    title: 'Fire Safety Information',
    folder: 'fire_information_materials',
    description: 'Educational materials for fire prevention and household safety awareness.',
    images: [
      '7e5b87ad-0e31-4843-8559-92e2418dfc4c.jpg',
      'a0e67b31-dbe9-4230-9bd6-27536c0fc906.jpg',
      'ba9344ba-3b6f-416a-99d8-bf5448696c55.jpg',
      'f780fbed-d0c3-4632-9bc8-13f8d3f14fba.jpg'
    ]
  },
  {
    id: 'flood-poster',
    title: 'Baha (Flood) Infographics',
    folder: 'baha_poster',
    description: 'Visual infographics for flood safety, evacuation, and community preparedness.',
    images: ['Baha_final_Page_1.jpg', 'Baha_final_Page_2.jpg']
  },
  {
    id: 'tropical-cyclone',
    title: 'Tropical Cyclone Wind Signals',
    folder: 'tropical_cyclone',
    description: 'Understanding the revised PAGASA Tropical Cyclone Wind Signals (TCWS).',
    images: ['TCWS_Page_1.jpg', 'TCWS_Page_2.jpg']
  },
  {
    id: 'thunderstorm',
    title: 'Thunderstorm Awareness',
    folder: 'thunderstorm',
    description: 'Visual guides for thunderstorm safety and understanding weather advisories.',
    images: ['Thunderstorm_Page_1.jpg', 'Thunderstorm_Page_2.jpg']
  },
  {
    id: 'el-nino',
    title: 'El Niño Awareness',
    folder: 'El_Niño_poster',
    description: 'Critical information about El Niño, its impacts, and conservation tips.',
    images: ['El Niño_Page_1.jpg', 'El Niño_Page_2.jpg']
  },
  {
    id: 'la-nina',
    title: 'La Niña Awareness',
    folder: 'La_Niña',
    description: 'Preparedness measures and awareness for the La Niña phenomenon.',
    images: ['La Niña_Page_1.jpg', 'La Niña_Page_2.jpg']
  },
  {
    id: 'weather-advisory',
    title: 'Weather Advisory Materials',
    folder: 'weather_advisory_poster',
    description: 'Infographics explaining various weather advisories and public warnings.',
    images: [
      'a043549a-5840-4900-a51b-944b8e980fd1.jpg',
      'b91b2244-983e-4927-9d1a-62389b883ec3.jpg',
      'd8f95b17-baf7-4d36-8464-d32fc5b7b667.jpg'
    ]
  }
];

export default function MaghandaVideos() {
  const [activeTab, setActiveTab] = useState<'videos' | 'posters'>('videos');
  const [selectedCollection, setSelectedCollection] = useState<typeof POSTER_COLLECTIONS[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = useCallback(() => {
    if (!selectedCollection) return;
    setCurrentImageIndex((prev) => (prev + 1) % selectedCollection.images.length);
  }, [selectedCollection]);

  const prevImage = useCallback(() => {
    if (!selectedCollection) return;
    setCurrentImageIndex((prev) => (prev - 1 + selectedCollection.images.length) % selectedCollection.images.length);
  }, [selectedCollection]);

  const closeLightbox = useCallback(() => {
    setSelectedCollection(null);
    setCurrentImageIndex(0);
  }, []);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedCollection) return;
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCollection, nextImage, prevImage, closeLightbox]);

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
            {POSTER_COLLECTIONS.map((collection) => (
              <div 
                key={collection.id} 
                onClick={() => setSelectedCollection(collection)}
                className="group relative bg-gray-950/60 border border-slate-700/50 rounded-xl overflow-hidden flex flex-col hover:border-red-500/50 transition-all cursor-pointer shadow-lg"
              >
                {/* Thumbnail */}
                <div className="relative aspect-[3/4] overflow-hidden bg-slate-900">
                  <img 
                    src={`${BASE_URL}/${collection.folder}/${encodeURIComponent(collection.images[0])}`}
                    alt={collection.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  
                  {/* Overlay Info */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-white mb-1">
                      <ImageIcon className="w-3 h-3 text-red-400" />
                      {collection.images.length} PAGES
                    </div>
                  </div>

                  {/* View Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-[2px]">
                    <div className="bg-red-600 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 shadow-xl scale-90 group-hover:scale-100 transition-transform">
                      <Maximize2 className="w-4 h-4" />
                      View Gallery
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col">
                  <h4 className="text-sm font-bold text-white mb-1 line-clamp-1 group-hover:text-red-400 transition-colors">{collection.title}</h4>
                  <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">{collection.description}</p>
                </div>

                {/* Badge */}
                <div className="absolute top-2 right-2">
                  <div className="bg-black/60 backdrop-blur-md text-white text-[8px] font-bold px-2 py-0.5 rounded border border-white/10 uppercase">
                    IEC Guide
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Lightbox Modal */}
          {selectedCollection && (
            <div 
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-300"
              onClick={closeLightbox}
            >
              {/* Close Button */}
              <button 
                onClick={closeLightbox}
                className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Arrows */}
              <button 
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white border border-white/10 transition-all hover:scale-110"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              
              <button 
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white border border-white/10 transition-all hover:scale-110"
              >
                <ChevronRight className="w-8 h-8" />
              </button>

              {/* Image Container */}
              <div 
                className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center gap-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative group">
                  <img 
                    src={`${BASE_URL}/${selectedCollection.folder}/${encodeURIComponent(selectedCollection.images[currentImageIndex])}`}
                    alt={`${selectedCollection.title} - Page ${currentImageIndex + 1}`}
                    className="max-w-full max-h-[75vh] object-contain shadow-2xl rounded-sm"
                  />
                </div>

                {/* Caption & Indicator */}
                <div className="text-center">
                  <h3 className="text-white font-bold text-lg mb-1">{selectedCollection.title}</h3>
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-slate-400 text-sm">Page {currentImageIndex + 1} of {selectedCollection.images.length}</span>
                    <div className="h-4 w-px bg-slate-700"></div>
                    <div className="flex gap-1">
                      {selectedCollection.images.map((_, idx) => (
                        <div 
                          key={idx}
                          className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentImageIndex ? 'bg-red-500 w-4' : 'bg-slate-700'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Instructions */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 text-slate-500 text-[10px] font-bold uppercase tracking-widest pointer-events-none opacity-50">
                <span>Use Arrows to Navigate</span>
                <div className="w-1 h-1 bg-slate-700 rounded-full"></div>
                <span>ESC to Close</span>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="text-[11px] text-gray-500 text-center pt-4 mt-2 border-t border-slate-800">
        Sources: PAGASA-DOST Official YouTube Channel (#MAGHANDA) · #PanatagAngMayAlam Campaign
      </div>
    </section>
  );
}
