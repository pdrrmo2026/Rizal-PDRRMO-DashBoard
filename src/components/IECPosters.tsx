import { Image as ImageIcon, Download, ExternalLink } from 'lucide-react';

const POSTERS = [
  {
    id: 1,
    title: 'Flood Safety Tips',
    description: 'Essential safety measures during flood events.',
    imageUrl: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 2,
    title: 'Emergency Kit Guide',
    description: 'What to pack in your family emergency Go-Bag.',
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 3,
    title: 'Typhoon Preparedness',
    description: 'Steps to take before a typhoon hits your area.',
    imageUrl: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?auto=format&fit=crop&q=80&w=800',
  }
];

export default function IECPosters() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {POSTERS.map((poster) => (
          <div 
            key={poster.id}
            className="group bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all duration-300"
          >
            <div className="aspect-[3/4] relative overflow-hidden bg-gray-950">
              <img 
                src={poster.imageUrl} 
                alt={poster.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-70 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-60" />
              
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="p-2 bg-purple-600/80 hover:bg-purple-600 rounded-lg text-white backdrop-blur-sm transition-colors">
                  <Download className="w-5 h-5" />
                </button>
                <button className="p-2 bg-gray-800/80 hover:bg-gray-700 rounded-lg text-white backdrop-blur-sm transition-colors">
                  <ExternalLink className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-md bg-purple-500/20 text-purple-400">
                  <ImageIcon className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-gray-100">{poster.title}</h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                {poster.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-purple-950/20 border border-purple-500/20 rounded-xl p-6 text-center">
        <ImageIcon className="w-12 h-12 text-purple-400/50 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-gray-200 mb-2">More Posters Coming Soon</h3>
        <p className="text-gray-400 max-w-md mx-auto">
          We are currently updating our library of information and education materials. 
          Check back later for updated infographics and maps.
        </p>
      </div>
    </div>
  );
}
