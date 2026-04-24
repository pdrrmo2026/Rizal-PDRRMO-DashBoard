import { Video, PlayCircle, BookOpen, Waves, CloudLightning, LifeBuoy, ExternalLink, Shield } from 'lucide-react';

type VideoCategory = 'Flood Safety' | 'Weather Awareness' | 'General Preparedness';

type MaghandaVideo = {
  id: string;
  videoId: string;
  title: string;
  category: VideoCategory;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
  accent: string;
  hashtag: string;
  hashtagColor: string;
};

const VIDEOS: MaghandaVideo[] = [
  {
    id: 'ffws',
    videoId: 'Hnj_FIUsiMc',
    title: 'Flood Forecasting and Warning System',
    category: 'Flood Safety',
    description: 'Learn how PAGASA issues flood forecasts and warnings for major Philippine river basins, including the Marikina River system.',
    Icon: Waves,
    accent: 'from-blue-600 to-blue-800',
    hashtag: '#MAGHANDA',
    hashtagColor: 'text-red-300',
  },
  {
    id: 'heavy-rainfall',
    videoId: 'DmC1hYhT6p0',
    title: 'Flood Safety Reminders',
    category: 'Flood Safety',
    description: 'Essential flood safety reminders — when to evacuate, what to prepare, and how to keep your family safe.',
    Icon: LifeBuoy,
    accent: 'from-emerald-500 to-green-700',
    hashtag: '#PanatagAngMayAlam',
    hashtagColor: 'text-emerald-300',
  },
  {
    id: 'thunderstorm',
    videoId: '7m6f78YvYyY',
    title: 'Thunderstorm Warning System',
    category: 'Weather Awareness',
    description: 'Understand color-coded rainfall warnings and thunderstorm advisories for community awareness and response.',
    Icon: CloudLightning,
    accent: 'from-amber-500 to-orange-700',
    hashtag: '#MAGHANDA',
    hashtagColor: 'text-red-300',
  },
  {
    id: 'earthquake',
    videoId: 'R-C_f0H0x0I',
    title: 'Earthquake Preparedness',
    category: 'General Preparedness',
    description: 'What to do before, during, and after an earthquake to ensure your safety and that of your loved ones.',
    Icon: Shield,
    accent: 'from-purple-600 to-indigo-800',
    hashtag: '#PanatagAngMayAlam',
    hashtagColor: 'text-purple-300',
  },
  {
    id: 'typhoon',
    videoId: 'B6U-xOQW89M',
    title: 'Typhoon Safety Guide',
    category: 'General Preparedness',
    description: 'Practical tips and essential preparations to keep your household ready for the typhoon season.',
    Icon: Video,
    accent: 'from-rose-600 to-red-800',
    hashtag: '#MAGHANDA',
    hashtagColor: 'text-rose-300',
  }
];

export default function MaghandaVideos() {
  const categories: VideoCategory[] = ['Flood Safety', 'Weather Awareness', 'General Preparedness'];

  return (
    <section className="space-y-8">
      {/* Header & Hashtag Link */}
      <div className="bg-gradient-to-br from-red-950/40 via-gray-900 to-slate-900 border border-red-700/40 rounded-xl p-4 sm:p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white shadow-lg shrink-0">
              <Video className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white leading-tight">
                Educational Video Resources
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Official safety guides and disaster preparedness information
              </p>
            </div>
          </div>
          
          <a 
            href="https://www.youtube.com/hashtag/panatagangmayalam"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600/20 text-red-400 border border-red-600/30 hover:bg-red-600/30 transition-all text-sm font-semibold whitespace-nowrap"
          >
            #PanatagAngMayAlam <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Grouped Videos */}
      {categories.map((category) => (
        <div key={category} className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <div className="w-1 h-5 bg-red-500 rounded-full" />
            <h3 className="text-lg font-bold text-gray-200">{category}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {VIDEOS.filter(v => v.category === category).map((v) => (
              <article
                key={v.id}
                className="group bg-gray-900/60 border border-slate-700/50 rounded-xl overflow-hidden flex flex-col hover:border-red-500/30 transition-all duration-300 shadow-lg hover:shadow-red-500/5"
              >
                {/* Title & Category Bar */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-700/50 bg-gray-900/50">
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${v.accent} flex items-center justify-center text-white shrink-0 shadow-md group-hover:scale-110 transition-transform`}
                  >
                    <v.Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-white text-sm leading-tight truncate">
                      {v.title}
                    </h4>
                    <p className={`text-[10px] font-bold mt-0.5 uppercase tracking-wider ${v.hashtagColor}`}>
                      {v.hashtag}
                    </p>
                  </div>
                </div>

                {/* Clean YouTube Embed */}
                <div className="relative aspect-video bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${v.videoId}?rel=0&modestbranding=1&controls=1&fs=1&iv_load_policy=3`}
                    title={v.title}
                    className="absolute inset-0 w-full h-full"
                    frameBorder={0}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>

                {/* Description */}
                <div className="p-4 flex-1 bg-gray-900/30">
                  <h5 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                    <PlayCircle className="w-3 h-3 text-red-500" />
                    Video Info
                  </h5>
                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                    {v.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      ))}

      {/* Footer Info */}
      <div className="flex items-center justify-center gap-4 py-6 border-t border-slate-800">
        <span className="text-[11px] text-gray-500 flex items-center gap-1.5">
          <BookOpen className="w-3 h-3" /> Educational Resources
        </span>
        <div className="w-1 h-1 bg-gray-700 rounded-full" />
        <span className="text-[11px] text-gray-500">
          Source: PAGASA-DOST & PDRRMO Official
        </span>
      </div>
    </section>
  );
}
