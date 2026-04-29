const fs = require('fs');
const path = require('path');

function readMaps() {
  const maps = [];
  ['public_maps1/maps', 'public_maps2/maps_2', 'public_maps3/maps_3'].forEach(dir => {
    const fullPath = path.join('../public', dir);
    if (fs.existsSync(fullPath)) {
      const files = fs.readdirSync(fullPath).filter(f => f.endsWith('.jpg'));
      files.forEach(f => {
        let title = f.replace('Rizal Map_', '').replace('.jpg', '');
        let id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        maps.push({
          id,
          title: title.substring(0, 30) + (title.length > 30 ? '...' : ''),
          description: f,
          images: ['/' + dir + '/' + f],
          category: 'Map'
        });
      });
    }
  });
  return maps;
}

const mapsArr = readMaps();

const code = `import { useState, useEffect, useCallback } from 'react';
import { Image, ExternalLink, Download, Search, MapPin, X, ChevronLeft, ChevronRight, Map as MapIcon } from 'lucide-react';

interface Poster {
  id: string;
  title: string;
  description: string;
  images: string[];
  category: string;
}

const POSTERS: Poster[] = ${JSON.stringify(mapsArr, null, 2)};

export default function HazardMaps({ renderTabs }: { renderTabs?: React.ReactNode }) {
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
            <MapIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <h2 className="text-sm sm:text-base md:text-lg font-bold text-white leading-tight">
              Maps
            </h2>
            <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">
              Comprehensive maps for public awareness.
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
              <h3 className="font-bold text-white text-[11px] sm:text-xs mb-0.5 group-hover:text-indigo-300 transition-colors line-clamp-1" title={poster.title}>
                {poster.title}
              </h3>
              <p className="text-[10px] text-gray-500 leading-tight line-clamp-2 mb-2 flex-1" title={poster.description}>
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
        Rizal PDRRMO Official Maps
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

          {/* Modal Content */}
          <div
            className="relative max-w-full max-h-full flex flex-col items-center animate-in zoom-in-95 duration-300 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative group bg-gray-900 rounded-lg overflow-hidden shadow-2xl border border-white/10">
              {/* Close Button on Image */}
              <button
                className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-red-600 transition-colors z-[120] border border-white/20 backdrop-blur-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPoster(null);
                }}
                title="Close"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <img
                key={selectedPoster.images[currentImageIndex]}
                src={selectedPoster.images[currentImageIndex]}
                alt={\`\${selectedPoster.title} - Page \${currentImageIndex + 1}\`}
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
`;

fs.writeFileSync('components/HazardMaps.tsx', code);
console.log('HazardMaps.tsx generated with ' + mapsArr.length + ' maps');
