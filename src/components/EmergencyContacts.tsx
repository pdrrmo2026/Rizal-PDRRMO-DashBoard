import { Phone, Download, MapPin, Share2 } from 'lucide-react';

export default function EmergencyContacts() {
  return (
    <section className="bg-gradient-to-br from-amber-950/40 via-gray-900 to-slate-900 border border-amber-700/40 rounded-xl p-4 sm:p-6 md:p-8 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
        <div className="flex items-start gap-4 min-w-0">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-700 flex items-center justify-center text-white shadow-lg shrink-0">
            <Phone className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <div className="min-w-0">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight">
              Emergency Contact Numbers
            </h2>
            <p className="text-sm sm:text-base text-gray-400 mt-1 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-500" />
              Rizal Province Official Emergency Directory
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-semibold transition-all border border-gray-700 shadow-lg"
            onClick={() => window.print()}
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
          <a 
            href="/emergency_contact_numbers.jpg" 
            download 
            className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-semibold transition-all shadow-lg shadow-amber-900/40"
          >
            <Download className="w-4 h-4" />
            Download
          </a>
        </div>
      </div>

      {/* Image Display */}
      <div className="relative group bg-gray-950/50 rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent pointer-events-none" />
        
        <img 
          src="/emergency_contact_numbers.jpg" 
          alt="Emergency Contact Numbers" 
          className="w-full h-auto block"
        />
        
        {/* Subtle overlay info */}
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white/40 text-[10px] sm:text-xs">
          <span>Official Resource · Rizal PDRRMO</span>
          <span>Last Updated: 2026</span>
        </div>
      </div>

      <div className="mt-8 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
        <p className="text-sm text-amber-200/80 leading-relaxed text-center italic">
          "Always keep a printed copy of these numbers in your emergency go-bag. In case of power or network failure, physical copies are your most reliable resource."
        </p>
      </div>
    </section>
  );
}
