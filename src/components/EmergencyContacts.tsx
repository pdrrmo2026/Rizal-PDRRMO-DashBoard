import { useState, useEffect } from 'react';
import { Phone, X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

export default function EmergencyContacts() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hasDragged, setHasDragged] = useState(false);

  const imageUrl = "https://raw.githubusercontent.com/pdrrmo2026/Rizal-PDRRMO-DashBoard/main/emergency_contact_numbers.jpg";

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  // Reset scale & position when modal closes
  useEffect(() => {
    if (!isModalOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
      setIsDragging(false);
      setHasDragged(false);
    }
  }, [isModalOpen]);

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
    setScale(1);
    setPosition({ x: 0, y: 0 });
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
    <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4 sm:p-6 backdrop-blur-md shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center text-white shadow-lg shadow-amber-900/20">
          <Phone className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-100">Emergency Contact Numbers</h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-0.5">Official hotlines and rescue units for Rizal Province</p>
        </div>
      </div>

      {/* Clickable Image Section */}
      <div
        className="mb-6 rounded-xl overflow-hidden border border-gray-800 shadow-lg bg-black/40 cursor-pointer group relative"
        onClick={() => setIsModalOpen(true)}
      >
        <img
          src={imageUrl}
          alt="Emergency Contact Numbers"
          className="w-full h-auto object-contain max-h-[75vh] transition-transform duration-500 group-hover:scale-[1.02]"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/emergency_contact_numbers.jpg';
          }}
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 bg-black/70 text-white px-5 py-2.5 rounded-full text-sm font-medium backdrop-blur-md flex items-center gap-2 shadow-xl border border-white/10">
            <ZoomIn className="w-4 h-4 text-amber-400" /> Click to view full image
          </span>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-800/50 text-center text-xs text-gray-500 flex items-center justify-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
        In case of extreme emergencies, please call the National Emergency Hotline 911 immediately.
      </div>

      {/* Full View Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-300 overflow-hidden"
          onClick={(e) => {
            if (hasDragged) {
              setHasDragged(false);
              return;
            }
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {/* Controls - Upper Left */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 sm:gap-3 z-[210] animate-in slide-in-from-top-4 duration-500 delay-100 fade-in fill-mode-both">
            <button
              onClick={(e) => { e.stopPropagation(); setIsModalOpen(false); }}
              className="p-2.5 sm:p-3 rounded-full bg-gray-900/80 text-white hover:bg-red-600 transition-colors border border-white/10 backdrop-blur-md shadow-2xl group"
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
              <span className="text-amber-400 text-xs sm:text-sm font-bold px-2 sm:px-3 min-w-[3.5rem] sm:min-w-[4rem] text-center select-none">
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

          {/* Modal Image Container */}
          <div
            className={`w-full h-full flex items-center justify-center p-4 sm:p-8 ${scale > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : ''
              }`}
          >
            <img
              src={imageUrl}
              alt="Emergency Contact Numbers Full View"
              className={`max-w-none shadow-2xl rounded-sm sm:rounded-lg ${isDragging ? 'transition-none' : 'transition-transform duration-200 ease-out'
                }`}
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                transformOrigin: 'center center',
                maxHeight: '90vh',
                maxWidth: '90vw'
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (hasDragged) {
                  setHasDragged(false);
                }
              }}
              onDragStart={(e) => e.preventDefault()}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/emergency_contact_numbers.jpg';
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
