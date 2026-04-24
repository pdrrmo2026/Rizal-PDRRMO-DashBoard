import { useState, useEffect, useCallback } from 'react';
import { Image, ExternalLink, Download, Search, MapPin, X, ChevronLeft, ChevronRight } from 'lucide-react';

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

  const handleNext = useCallback((e?: React.MouseEvent | KeyboardEvent) => {
    e?.stopPropagation();
    if (selectedPoster) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedPoster.images.length);
    }
  }, [selectedPoster]);

  const handlePrev = useCallback((e?: React.MouseEvent | KeyboardEvent) => {
    e?.stopPropagation();
    if (selectedPoster) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedPoster.images.length) % selectedPoster.images.length);
    }
  }, [selectedPoster]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPoster) return;
      if (e.key === 'Escape') setSelectedPoster(null);
      if (e.key === 'ArrowRight') handleNext(e);
      if (e.key === 'ArrowLeft') handlePrev(e);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPoster, handleNext, handlePrev]);

  const openModal = (poster: Poster) => {
    setSelectedPoster(poster);
    setCurrentImageIndex(0);
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
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-gray-950/90 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setSelectedPoster(null)}
        >
          {/* Navigation Arrows */}
          {selectedPoster.images.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 text-white hover:bg-black/60 transition-all z-[110] border border-white/10 hidden sm:flex"
                onClick={handlePrev}
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 text-white hover:bg-black/60 transition-all z-[110] border border-white/10 hidden sm:flex"
                onClick={handleNext}
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          {/* Close Button */}
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-[110] border border-white/10"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPoster(null);
            }}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Modal Content */}
          <div
            className="relative max-w-full max-h-full flex flex-col items-center animate-in zoom-in-95 duration-300 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative group bg-gray-900 rounded-lg overflow-hidden shadow-2xl border border-white/10">
              <img
                key={selectedPoster.images[currentImageIndex]}
                src={selectedPoster.images[currentImageIndex]}
                alt={`${selectedPoster.title} - Page ${currentImageIndex + 1}`}
                className="max-w-full max-h-[85vh] object-contain shadow-2xl animate-in fade-in zoom-in-95 duration-500"
              />

              {/* Bottom bar in modal */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                <div className="flex items-center justify-between">
                  <div className="min-w-0">
                    <h3 className="text-white font-bold text-sm sm:text-lg truncate">{selectedPoster.title}</h3>
                    <p className="text-gray-300 text-[10px] sm:text-xs">
                      Page {currentImageIndex + 1} of {selectedPoster.images.length} · {selectedPoster.category}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Mobile Navigation */}
                    <div className="flex sm:hidden items-center gap-1 bg-black/40 rounded-lg p-1 border border-white/10 mr-2">
                      <button onClick={handlePrev} className="p-1 hover:bg-white/10 rounded"><ChevronLeft className="w-4 h-4" /></button>
                      <button onClick={handleNext} className="p-1 hover:bg-white/10 rounded"><ChevronRight className="w-4 h-4" /></button>
                    </div>
                    <a
                      href={selectedPoster.images[currentImageIndex]}
                      download
                      className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[10px] sm:text-xs font-semibold transition-colors shrink-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span className="hidden xs:inline">Download</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
