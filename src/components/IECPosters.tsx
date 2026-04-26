import { useState, useEffect, useCallback } from 'react';
import { Image, ExternalLink, Download, Search, MapPin, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface Poster {
  id: string;
  title: string;
  description: string;
  images: string[];
  category: string;
}

const POSTERS: Poster[] = [
  {
    id: 'baha-poster',
    title: 'Flood (Baha) Guide',
    description: 'PAGASA Flood Forecasting and Warning System.',
    images: [
      '/educational_posters/baha_poster/Baha_final_Page_1.jpg',
      '/educational_posters/baha_poster/Baha_final_Page_2.jpg'
    ],
    category: 'Flood'
  },
  {
    id: 'earthquake-guide',
    title: 'Earthquake Guide',
    description: 'Family and Community Earthquake Preparedness.',
    images: [
      '/educational_posters/earthquake_guide/Community Eartquake Guide_Page_1.jpg',
      '/educational_posters/earthquake_guide/Community Eartquake Guide_Page_2.jpg',
      '/educational_posters/earthquake_guide/Family Earthquake Preparedness_Page_1.jpg',
      '/educational_posters/earthquake_guide/Family Earthquake Preparedness_Page_2.jpg',
      '/educational_posters/earthquake_guide/PEIS_final_Page_1.jpg',
      '/educational_posters/earthquake_guide/PEIS_final_Page_2.jpg'
    ],
    category: 'Earthquake'
  },
  {
    id: 'el-nino',
    title: 'El Niño Advisory',
    description: 'Understanding and preparing for El Niño.',
    images: [
      '/educational_posters/el_niño/El Niño_Page_1.jpg',
      '/educational_posters/el_niño/El Niño_Page_2.jpg'
    ],
    category: 'Climate'
  },
  {
    id: 'la-nina',
    title: 'La Niña Advisory',
    description: 'Understanding and preparing for La Niña.',
    images: [
      '/educational_posters/la_niña/La Niña_Page_1.jpg',
      '/educational_posters/la_niña/La Niña_Page_2.jpg'
    ],
    category: 'Climate'
  },
  {
    id: 'thunderstorm',
    title: 'Thunderstorm',
    description: 'Thunderstorm and Heavy Rainfall warnings.',
    images: [
      '/educational_posters/thunderstorm/Thunderstorm_Page_1.jpg',
      '/educational_posters/thunderstorm/Thunderstorm_Page_2.jpg'
    ],
    category: 'Weather'
  },
  {
    id: 'tropical-cyclone',
    title: 'Tropical Cyclone',
    description: 'Tropical Cyclone Wind Signal (TCWS) guide.',
    images: [
      '/educational_posters/tropical_cyclone/TCWS_Page_1.jpg',
      '/educational_posters/tropical_cyclone/TCWS_Page_2.jpg'
    ],
    category: 'Typhoon'
  },
  {
    id: 'fire-info',
    title: 'Fire Safety',
    description: 'Information materials for fire safety.',
    images: [
      '/educational_posters/fire_information_materials/7e5b87ad-0e31-4843-8559-92e2418dfc4c.jpg',
      '/educational_posters/fire_information_materials/a0e67b31-dbe9-4230-9bd6-27536c0fc906.jpg',
      '/educational_posters/fire_information_materials/ba9344ba-3b6f-416a-99d8-bf5448696c55.jpg',
      '/educational_posters/fire_information_materials/f780fbed-d0c3-4632-9bc8-13f8d3f14fba.jpg'
    ],
    category: 'Fire'
  },
  {
    id: 'mgb-posters',
    title: 'MGB Posters',
    description: 'Mines and Geosciences Bureau Risk Posters.',
    images: [
      '/educational_posters/mgb_posters/Flood_Page_1.jpg',
      '/educational_posters/mgb_posters/Flood_Page_2.jpg',
      '/educational_posters/mgb_posters/Karst_subsidence_Page_1.jpg',
      '/educational_posters/mgb_posters/Karst_subsidence_Page_2.jpg',
      '/educational_posters/mgb_posters/Landslie_Page_1.jpg',
      '/educational_posters/mgb_posters/Landslie_Page_2.jpg'
    ],
    category: 'MGB'
  },
  {
    id: 'ocd-guidebook',
    title: 'OCD Guidebook',
    description: 'Disaster Preparedness Guidebook by OCD.',
    images: Array.from({ length: 13 }, (_, i) => `/educational_posters/ocd_disaster_preparedness_guidebook/OCD_Disaster_Preparedness_Guidebook_page-${String(i + 1).padStart(4, '0')}.jpg`),
    category: 'OCD'
  },
  {
    id: 'pagasa-website',
    title: 'PAGASA Website',
    description: 'Guide to using the PAGASA website.',
    images: [
      '/educational_posters/pagasa_website_info/Website_FINAL_Page_1.jpg',
      '/educational_posters/pagasa_website_info/Website_FINAL_Page_2.jpg'
    ],
    category: 'Info'
  },
  {
    id: 'weather-advisory',
    title: 'Weather Advisory',
    description: 'Understanding weather advisories.',
    images: [
      '/educational_posters/weather_advisory_poster/a043549a-5840-4900-a51b-944b8e980fd1.jpg',
      '/educational_posters/weather_advisory_poster/b91b2244-983e-4927-9d1a-62389b883ec3.jpg',
      '/educational_posters/weather_advisory_poster/d8f95b17-baf7-4d36-8464-d32fc5b7b667.jpg'
    ],
    category: 'Weather'
  }
];

export default function IECPosters({ renderTabs }: { renderTabs?: React.ReactNode }) {
  const [selectedPoster, setSelectedPoster] = useState<Poster | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hasDragged, setHasDragged] = useState(false);

  const resetZoomPan = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setIsDragging(false);
    setHasDragged(false);
  }, []);

  const handleNext = useCallback((e?: React.MouseEvent | KeyboardEvent) => {
    e?.stopPropagation();
    if (selectedPoster) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedPoster.images.length);
      resetZoomPan();
    }
  }, [selectedPoster, resetZoomPan]);

  const handlePrev = useCallback((e?: React.MouseEvent | KeyboardEvent) => {
    e?.stopPropagation();
    if (selectedPoster) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedPoster.images.length) % selectedPoster.images.length);
      resetZoomPan();
    }
  }, [selectedPoster, resetZoomPan]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPoster) return;
      if (e.key === 'Escape') {
        setSelectedPoster(null);
        resetZoomPan();
      }
      if (e.key === 'ArrowRight') handleNext(e);
      if (e.key === 'ArrowLeft') handlePrev(e);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPoster, handleNext, handlePrev, resetZoomPan]);

  const openModal = (poster: Poster) => {
    setSelectedPoster(poster);
    setCurrentImageIndex(0);
    resetZoomPan();
  };

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(prev => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(prev => {
      const newScale = Math.max(prev - 0.5, 1);
      if (newScale === 1) setPosition({ x: 0, y: 0 });
      return newScale;
    });
  };

  const handleResetZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    resetZoomPan();
  };

  // Panning logic
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (scale <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    setHasDragged(false);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || scale <= 1) return;
    setHasDragged(true);
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    if (isDragging) setIsDragging(false);
  };

  const handleMouseLeave = () => {
    if (isDragging) setIsDragging(false);
  };

  return (
    <section className="bg-gradient-to-br from-indigo-950/40 via-gray-900 to-slate-900 border border-indigo-700/40 rounded-xl p-3 sm:p-4 md:p-5 shadow-xl">
      {renderTabs && <div className="mb-4">{renderTabs}</div>}

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-5">
        <div className="flex items-start gap-2 sm:gap-3 min-w-0 flex-1">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-800 flex items-center justify-center text-white shadow-lg shrink-0">
            <Image className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <h2 className="text-sm sm:text-base md:text-lg font-bold text-white leading-tight">
              IEC Awareness Posters
            </h2>
            <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">
              Visual safety guides for public awareness.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 inline-flex items-center gap-1 hover:bg-indigo-500/25 transition-colors">
            <Search className="w-2.5 h-2.5" /> View All
          </button>
        </div>
      </div>

      {/* Posters grid - 5+ per row on large screens */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
        {POSTERS.map((poster) => (
          <article
            key={poster.id}
            onClick={() => openModal(poster)}
            className="bg-gray-950/60 border border-slate-700/50 rounded-lg overflow-hidden flex flex-col group hover:border-indigo-500/50 transition-all duration-300 cursor-pointer"
          >
            {/* Image container */}
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-900">
              <img
                src={poster.images[0]}
                alt={poster.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-60" />

              <div className="absolute top-1.5 left-1.5">
                <span className="px-1.5 py-0.5 rounded bg-indigo-600/80 backdrop-blur-sm text-[8px] font-bold text-white uppercase tracking-wider">
                  {poster.category}
                </span>
              </div>

              <div className="absolute bottom-1.5 right-1.5 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="p-1.5 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors shadow-lg">
                  <Download className="w-3 h-3" />
                </button>
                <button className="p-1.5 rounded-full bg-indigo-600/80 backdrop-blur-md text-white hover:bg-indigo-700 transition-colors shadow-lg">
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-2 sm:p-2.5 flex-1 flex flex-col">
              <h3 className="font-bold text-white text-[11px] sm:text-xs mb-0.5 group-hover:text-indigo-300 transition-colors line-clamp-1">
                {poster.title}
              </h3>
              <p className="text-[10px] text-gray-500 leading-tight line-clamp-2 mb-2 flex-1">
                {poster.description}
              </p>
              <div className="flex items-center gap-1 text-[9px] text-gray-600">
                <MapPin className="w-2.5 h-2.5" /> PDRRMO
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="text-[9px] text-gray-600 text-center pt-3 mt-4 border-t border-slate-800">
        Rizal PDRRMO Official Educational Resources
      </div>

      {/* Full Resolution Modal Viewer */}
      {selectedPoster && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-950/95 backdrop-blur-md animate-in fade-in duration-300 overflow-hidden"
          onClick={(e) => {
            if (hasDragged) {
              setHasDragged(false);
              return;
            }
            if (e.target === e.currentTarget) {
              setSelectedPoster(null);
              resetZoomPan();
            }
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {/* Controls - Upper Left */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 sm:gap-3 z-[120]">
            <button
              className="p-2.5 sm:p-3 rounded-full bg-gray-900/80 text-white hover:bg-red-600 transition-colors border border-white/10 backdrop-blur-md shadow-2xl group"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPoster(null);
                resetZoomPan();
              }}
              title="Close (ESC)"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-90 transition-transform duration-300" />
            </button>
            <div className="flex items-center bg-gray-900/80 border border-white/10 backdrop-blur-md rounded-full overflow-hidden shadow-2xl">
              <button
                onClick={handleZoomOut}
                className="p-2.5 sm:p-3 text-white hover:bg-white/10 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                disabled={scale <= 1}
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={handleResetZoom}
                className="p-2.5 sm:p-3 text-white hover:bg-white/10 transition-colors disabled:opacity-30 disabled:hover:bg-transparent border-l border-r border-white/10"
                disabled={scale === 1}
                title="Reset Zoom"
              >
                <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <span className="text-indigo-400 text-xs sm:text-sm font-bold px-2 sm:px-3 min-w-[3.5rem] sm:min-w-[4rem] text-center select-none">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-2.5 sm:p-3 text-white hover:bg-white/10 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                disabled={scale >= 4}
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Arrows */}
          {selectedPoster.images.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-gray-900/80 text-white hover:bg-indigo-600 transition-all z-[110] border border-white/10 hidden sm:flex backdrop-blur-md"
                onClick={handlePrev}
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-gray-900/80 text-white hover:bg-indigo-600 transition-all z-[110] border border-white/10 hidden sm:flex backdrop-blur-md"
                onClick={handleNext}
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          {/* Modal Image Container */}
          <div
            className={`w-full h-full flex items-center justify-center p-4 sm:p-12 pb-24 sm:pb-32 ${scale > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : ''
              }`}
          >
            <img
              key={selectedPoster.images[currentImageIndex]}
              src={selectedPoster.images[currentImageIndex]}
              alt={`${selectedPoster.title} - Page ${currentImageIndex + 1}`}
              className={`max-w-none shadow-2xl rounded-sm sm:rounded-lg ${isDragging ? 'transition-none' : 'transition-transform duration-200 ease-out animate-in fade-in zoom-in-95'
                }`}
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                transformOrigin: 'center center',
                maxHeight: '85vh',
                maxWidth: '90vw'
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (hasDragged) {
                  setHasDragged(false);
                }
              }}
              onDragStart={(e) => e.preventDefault()}
            />
          </div>

          {/* Bottom bar in modal */}
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-gray-950 via-gray-950/90 to-transparent z-[120] pointer-events-none">
            <div className="flex items-center justify-between max-w-[1600px] mx-auto pointer-events-auto">
              <div className="min-w-0">
                <h3 className="text-white font-bold text-sm sm:text-lg truncate">{selectedPoster.title}</h3>
                <p className="text-indigo-300 font-medium text-[10px] sm:text-xs">
                  Page {currentImageIndex + 1} of {selectedPoster.images.length} <span className="text-gray-500 font-normal">· {selectedPoster.category}</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                {/* Mobile Navigation */}
                <div className="flex sm:hidden items-center gap-1 bg-gray-900/80 rounded-lg p-1 border border-white/10 mr-2 backdrop-blur-md">
                  <button onClick={handlePrev} className="p-1 hover:bg-white/10 text-white rounded"><ChevronLeft className="w-4 h-4" /></button>
                  <button onClick={handleNext} className="p-1 hover:bg-white/10 text-white rounded"><ChevronRight className="w-4 h-4" /></button>
                </div>
                <a
                  href={selectedPoster.images[currentImageIndex]}
                  download
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-[10px] sm:text-xs font-semibold transition-colors shrink-0 shadow-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden xs:inline">Download</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
