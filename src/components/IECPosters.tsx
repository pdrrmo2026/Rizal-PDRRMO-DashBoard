import { Image, ExternalLink, Download, Search, MapPin } from 'lucide-react';

interface Poster {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

const POSTERS: Poster[] = [
  {
    id: 'flood-safety-tips',
    title: 'Flood Safety Tips',
    description: 'Essential steps to take before, during, and after a flood event to ensure family safety.',
    imageUrl: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&q=80&w=800',
    category: 'Safety Guide'
  },
  {
    id: 'emergency-kit',
    title: 'Emergency Go-Bag Essentials',
    description: 'A checklist of items every household should have ready in their emergency survival kit.',
    imageUrl: 'https://images.unsplash.com/photo-1583209814683-c023dd293cc6?auto=format&fit=crop&q=80&w=800',
    category: 'Preparedness'
  },
  {
    id: 'evacuation-routes',
    title: 'Understanding Evacuation Signs',
    description: 'Guide to recognizing and following official evacuation route markers and assembly point signs.',
    imageUrl: 'https://images.unsplash.com/photo-1506704918332-13ad5ecefe9a?auto=format&fit=crop&q=80&w=800',
    category: 'Evacuation'
  }
];

export default function IECPosters() {
  return (
    <section className="bg-gradient-to-br from-indigo-950/40 via-gray-900 to-slate-900 border border-indigo-700/40 rounded-xl p-3 sm:p-4 md:p-6 shadow-xl">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-5">
        <div className="flex items-start gap-2 sm:gap-3 min-w-0 flex-1">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-800 flex items-center justify-center text-white shadow-lg shrink-0">
            <Image className="w-5 h-5 sm:w-7 sm:h-7" />
          </div>
          <div className="min-w-0">
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-white leading-tight">
              IEC Awareness Posters & Infographics
            </h2>
            <p className="text-[11px] sm:text-sm text-gray-400 mt-1">
              Visual guides and safety information for public awareness.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 inline-flex items-center gap-1 hover:bg-indigo-500/25 transition-colors">
            <Search className="w-3 h-3" /> View All
          </button>
        </div>
      </div>

      {/* Posters grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {POSTERS.map((poster) => (
          <article
            key={poster.id}
            className="bg-gray-950/60 border border-slate-700/50 rounded-xl overflow-hidden flex flex-col group hover:border-indigo-500/50 transition-all duration-300"
          >
            {/* Image container */}
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-900">
              <img 
                src={poster.imageUrl} 
                alt={poster.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-60" />
              
              <div className="absolute top-3 left-3">
                <span className="px-2 py-1 rounded-md bg-indigo-600/80 backdrop-blur-sm text-[10px] font-bold text-white uppercase tracking-wider">
                  {poster.category}
                </span>
              </div>

              <div className="absolute bottom-3 right-3 flex gap-2">
                <button className="p-2 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors shadow-lg">
                  <Download className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-full bg-indigo-600/80 backdrop-blur-md text-white hover:bg-indigo-700 transition-colors shadow-lg">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-bold text-white text-sm sm:text-base mb-1 group-hover:text-indigo-300 transition-colors">
                {poster.title}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 mb-3">
                {poster.description}
              </p>
              <div className="flex items-center gap-2 text-[10px] text-gray-500">
                <MapPin className="w-3 h-3" /> Rizal PDRRMO Official Resource
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="text-[11px] text-gray-500 text-center pt-4 mt-6 border-t border-slate-800">
        All materials are property of Rizal PDRRMO and partner agencies. For distribution purposes only.
      </div>
    </section>
  );
}
