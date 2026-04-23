import { useState } from 'react';
import { Video, PlayCircle, BookOpen, Waves, CloudLightning, LifeBuoy, Layout, Image as ImageIcon, Download, ExternalLink } from 'lucide-react';

const PLAYLIST_ID = 'PLZHBSWDLr_J0LG_8GfuVYFyr9SKcbyBbb';
const PANATAG_PLAYLIST_ID = 'PLVjyOQDJ5woLGq7ef4VH0bJWviaafCZJS';

type MaghandaVideo = {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  embedSrc: string;
  Icon: React.ComponentType<{ className?: string }>;
  accent: string;
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

const POSTERS = Array.from({ length: 13 }, (_, i) => {
  const pageNum = (i + 1).toString().padStart(4, '0');
  return {
    id: `ocd-guidebook-p${i + 1}`,
    title: `Disaster Preparedness Guidebook - Page ${i + 1}`,
    description: 'Official educational resource from the Office of Civil Defense (OCD) for community preparedness and safety.',
    image: `https://raw.githubusercontent.com/pdrrmo2026/Rizal-PDRRMO-DashBoard/main/educational_posters/OCD_Disaster_Preparedness_Guidebook_page-${pageNum}.jpg`,
    category: 'OCD Guidebook',
    color: 'text-purple-400',
    border: 'border-purple-500/20'
  };
});

export default function MaghandaVideos() {
  const [activeTab, setActiveTab] = useState<'videos' | 'posters'>('videos');

  return (
    <section className="bg-gradient-to-br from-purple-950/20 via-gray-900 to-slate-900 border border-purple-700/30 rounded-xl overflow-hidden shadow-xl">
      {/* Header & Tabs */}
      <div className="p-4 sm:p-6 border-b border-slate-800 bg-gray-900/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center text-white shadow-lg shrink-0">
              <Layout className="w-5 h-5 sm:w-7 sm:h-7" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-white leading-tight">
                Information, Education and Communication (IEC)
              </h2>
              <p className="text-[11px] sm:text-sm text-gray-400 mt-1">
                Educational resources for disaster preparedness and safety.
              </p>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-slate-950/50 p-1 rounded-xl border border-slate-800 w-fit">
            <button
              onClick={() => setActiveTab('videos')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'videos'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Video className="w-4 h-4" />
              Videos
            </button>
            <button
              onClick={() => setActiveTab('posters')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'posters'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              Posters
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {activeTab === 'videos' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {VIDEOS.map((v) => (
              <article
                key={v.id}
                className="bg-gray-950/60 border border-slate-700/50 rounded-xl overflow-hidden flex flex-col group transition-all hover:border-purple-500/30"
              >
                {/* Title bar */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-700/50 bg-gray-900/50">
                  <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${v.accent} flex items-center justify-center text-white shrink-0 shadow-md`}>
                    <v.Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-white text-xs sm:text-sm leading-tight truncate">
                      {v.title}
                    </h3>
                    <p className={`text-[10px] font-semibold mt-0.5 ${v.hashtagColor}`}>
                      {v.hashtag}
                    </p>
                  </div>
                </div>

                {/* Player */}
                <div className="relative w-full bg-black aspect-video">
                  <iframe
                    src={v.embedSrc}
                    title={v.title}
                    className="absolute inset-0 w-full h-full"
                    frameBorder={0}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                {/* Description */}
                <div className="p-4 flex-1">
                  <h4 className="text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-1.5 flex items-center gap-1.5">
                    <PlayCircle className="w-3.5 h-3.5 text-purple-400" />
                    Description
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                    {v.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {POSTERS.map((p) => (
              <article
                key={p.id}
                className="bg-gray-950/60 border border-slate-700/50 rounded-xl overflow-hidden flex flex-col sm:flex-row transition-all hover:border-purple-500/30"
              >
                <div className="w-full sm:w-48 md:w-56 bg-slate-900 flex-shrink-0 aspect-[3/4] sm:aspect-auto">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-slate-800 border ${p.border} ${p.color}`}>
                        {p.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 leading-tight">
                      {p.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                  
                  <div className="mt-6 flex flex-wrap gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg transition-colors">
                      <Download className="w-4 h-4" />
                      Download HD
                    </button>
                    <button className="flex items-center justify-center p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <div className="text-[11px] text-gray-500 text-center py-4 bg-slate-950/30 border-t border-slate-800/50">
        Sources: PAGASA-DOST Official YouTube Channel · PDRRMO Educational Resources
      </div>
    </section>
  );
}
 );
}
