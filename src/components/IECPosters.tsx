import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Download, Maximize2, Info, Loader2 } from 'lucide-react';

interface PosterFolder {
  id: string;
  title: string;
  description: string;
  images: string[];
}

const POSTER_FOLDERS: PosterFolder[] = [
  {
    id: 'educational_posters',
    title: 'Disaster Preparedness Guide',
    description: 'Comprehensive guide for disaster preparedness and risk reduction.',
    images: Array.from({ length: 13 }, (_, i) => `/educational_posters/OCD_Disaster_Preparedness_Guidebook_page-${String(i + 1).padStart(4, '0')}.jpg`)
  },
  {
    id: 'earthquake_guide',
    title: 'Earthquake Safety Guide',
    description: 'Essential steps to take before, during, and after an earthquake.',
    images: [
      '/educational_posters/earthquake_guide/Community Eartquake Guide_Page_1.jpg',
      '/educational_posters/earthquake_guide/Community Eartquake Guide_Page_2.jpg',
      '/educational_posters/earthquake_guide/Family Earthquake Preparedness_Page_1.jpg',
      '/educational_posters/earthquake_guide/Family Earthquake Preparedness_Page_2.jpg',
      '/educational_posters/earthquake_guide/PEIS_final_Page_1.jpg',
      '/educational_posters/earthquake_guide/PEIS_final_Page_2.jpg'
    ]
  },
  {
    id: 'pagasa_website_info',
    title: 'PAGASA Website Guide',
    description: 'How to use and interpret information from the official PAGASA website.',
    images: [
      '/educational_posters/pagasa_website_info/Website_FINAL_Page_1.jpg',
      '/educational_posters/pagasa_website_info/Website_FINAL_Page_2.jpg'
    ]
  },
  {
    id: 'mgb_posters',
    title: 'MGB Hazards Information',
    description: 'Information about floods, landslides, and karst subsidence from MGB.',
    images: [
      '/educational_posters/mgb_posters/Flood_Page_1.jpg',
      '/educational_posters/mgb_posters/Flood_Page_2.jpg',
      '/educational_posters/mgb_posters/Karst_subsidence_Page_1.jpg',
      '/educational_posters/mgb_posters/Karst_subsidence_Page_2.jpg',
      '/educational_posters/mgb_posters/Landslie_Page_1.jpg',
      '/educational_posters/mgb_posters/Landslie_Page_2.jpg'
    ]
  },
  {
    id: 'fire_information_materials',
    title: 'Fire Safety Materials',
    description: 'Information and guides for fire prevention and safety.',
    images: [
      '/educational_posters/fire_information_materials/7e5b87ad-0e31-4843-8559-92e2418dfc4c.jpg',
      '/educational_posters/fire_information_materials/a0e67b31-dbe9-4230-9bd6-27536c0fc906.jpg',
      '/educational_posters/fire_information_materials/ba9344ba-3b6f-416a-99d8-bf5448696c55.jpg',
      '/educational_posters/fire_information_materials/f780fbed-d0c3-4632-9bc8-13f8d3f14fba.jpg'
    ]
  },
  {
    id: 'baha_poster',
    title: 'Flood Awareness (Baha)',
    description: 'Educational posters about flood risks and safety measures.',
    images: [
      '/educational_posters/baha_poster/Baha_final_Page_1.jpg',
      '/educational_posters/baha_poster/Baha_final_Page_2.jpg'
    ]
  },
  {
    id: 'el_nino',
    title: 'El Niño Information',
    description: 'Understanding El Niño and its impacts on weather and agriculture.',
    images: [
      '/educational_posters/el_nino/El Niño_Page_1.jpg',
      '/educational_posters/el_nino/El Niño_Page_2.jpg'
    ]
  },
  {
    id: 'la_nina',
    title: 'La Niña Information',
    description: 'Preparedness measures for La Niña and increased rainfall events.',
    images: [
      '/educational_posters/la_nina/La Niña_Page_1.jpg',
      '/educational_posters/la_nina/La Niña_Page_2.jpg'
    ]
  },
  {
    id: 'thunderstorm',
    title: 'Thunderstorm Awareness',
    description: 'Safety tips and information about thunderstorms and lightning.',
    images: [
      '/educational_posters/thunderstorm/Thunderstorm_Page_1.jpg',
      '/educational_posters/thunderstorm/Thunderstorm_Page_2.jpg'
    ]
  },
  {
    id: 'tropical_cyclone',
    title: 'Tropical Cyclone Warnings',
    description: 'Understanding Tropical Cyclone Wind Signals (TCWS) and warnings.',
    images: [
      '/educational_posters/tropical_cyclone/TCWS_Page_1.jpg',
      '/educational_posters/tropical_cyclone/TCWS_Page_2.jpg'
    ]
  },
  {
    id: 'weather_advisory_poster',
    title: 'Weather Advisory Guides',
    description: 'Guides on how to interpret various weather advisories and warnings.',
    images: [
      '/educational_posters/weather_advisory_poster/a043549a-5840-4900-a51b-944b8e980fd1.jpg',
      '/educational_posters/weather_advisory_poster/b91b2244-983e-4927-9d1a-62389b883ec3.jpg',
      '/educational_posters/weather_advisory_poster/d8f95b17-baf7-4d36-8464-d32fc5b7b667.jpg'
    ]
  }
];

export default function IECPosters() {
  const [selectedFolder, setSelectedFolder] = useState<PosterFolder | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Close modal on Escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!selectedFolder) return;
    if (e.key === 'Escape') setSelectedFolder(null);
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'ArrowLeft') handlePrev();
  }, [selectedFolder, currentImageIndex]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleNext = () => {
    if (!selectedFolder) return;
    setIsLoading(true);
    setCurrentImageIndex((prev) => (prev + 1) % selectedFolder.images.length);
  };

  const handlePrev = () => {
    if (!selectedFolder) return;
    setIsLoading(true);
    setCurrentImageIndex((prev) => (prev - 1 + selectedFolder.images.length) % selectedFolder.images.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.targetTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (diff > 50) {
      handleNext();
      setTouchStart(null);
    } else if (diff < -50) {
      handlePrev();
      setTouchStart(null);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-2 mb-6 px-2">
        <div className="w-1.5 h-4 bg-red-500 rounded-full"></div>
        <h3 className="text-sm font-bold text-white uppercase tracking-wide">Educational Posters & Infographics</h3>
      </div>

      {/* Grid of Poster Folders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {POSTER_FOLDERS.map((folder) => (
          <div
            key={folder.id}
            onClick={() => {
              setSelectedFolder(folder);
              setCurrentImageIndex(0);
              setIsLoading(true);
              console.log(`Loading folder: ${folder.title}, Images:`, folder.images);
            }}
            className="group relative bg-gray-950/60 border border-slate-700/50 rounded-xl overflow-hidden flex flex-col hover:border-red-500/50 transition-all cursor-pointer shadow-lg"
          >
            {/* Thumbnail */}
            <div className="aspect-[3/4] bg-slate-900 relative overflow-hidden">
              <img
                src={encodeURI(folder.images[0])}
                alt={folder.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x600?text=Poster+Image';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-60"></div>
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shadow-lg">
                  {folder.images.length} Pages
                </span>
                <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 flex-1 flex flex-col">
              <h4 className="text-sm font-bold text-white mb-1 group-hover:text-red-400 transition-colors line-clamp-1">{folder.title}</h4>
              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{folder.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedFolder && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 sm:p-8"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedFolder(null);
          }}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedFolder(null)}
            className="absolute top-4 right-4 sm:top-8 sm:right-8 z-[10001] w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all border border-white/10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Controls */}
          <button
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            className="absolute left-2 sm:left-6 z-[10001] w-12 h-12 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white transition-all hidden md:flex"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className="absolute right-2 sm:right-6 z-[10001] w-12 h-12 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white transition-all hidden md:flex"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Image Container */}
          <div
            className="relative w-full max-w-5xl h-full flex flex-col items-center justify-center"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-red-500 animate-spin" />
              </div>
            )}

            <img
              src={encodeURI(selectedFolder.images[currentImageIndex])}
              alt={`${selectedFolder.title} - Page ${currentImageIndex + 1}`}
              className={`max-w-full max-h-[80vh] object-contain shadow-2xl transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
              onLoad={() => setIsLoading(false)}
              onError={(e) => {
                console.error(`Failed to load image: ${selectedFolder.images[currentImageIndex]}`);
                setIsLoading(false);
                // Optionally skip or show placeholder
              }}
            />

            {/* Info Overlay */}
            <div className="mt-6 flex flex-col items-center text-center max-w-xl">
              <h5 className="text-white font-bold text-lg mb-2">{selectedFolder.title}</h5>
              <div className="flex items-center gap-4">
                <span className="text-slate-400 text-xs bg-white/5 px-3 py-1 rounded-full border border-white/10">
                  Page {currentImageIndex + 1} of {selectedFolder.images.length}
                </span>
                <a
                  href={encodeURI(selectedFolder.images[currentImageIndex])}
                  download
                  className="flex items-center gap-2 text-red-400 hover:text-red-300 text-xs font-bold transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Save Image
                </a>
              </div>
              <p className="text-slate-500 text-[10px] mt-3 italic uppercase tracking-wider">
                Use arrows to navigate · ESC to close · Swipe on mobile
              </p>
            </div>

            {/* Mobile Nav */}
            <div className="flex md:hidden gap-8 mt-4">
              <button onClick={handlePrev} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white"><ChevronLeft className="w-6 h-6" /></button>
              <button onClick={handleNext} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white"><ChevronRight className="w-6 h-6" /></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
