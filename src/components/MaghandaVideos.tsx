import { Video, PlayCircle, BookOpen, Waves, CloudLightning, LifeBuoy } from 'lucide-react';

const PLAYLIST_ID = 'PLZHBSWDLr_J0LG_8GfuVYFyr9SKcbyBbb';
const PANATAG_PLAYLIST_ID = 'PLVjyOQDJ5woLGq7ef4VH0bJWviaafCZJS';

type MaghandaVideo = {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  embedSrc: string;
  Icon: React.ComponentType<{ className?: string }>;
  accent: string; // tailwind classes for icon container
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

export default function MaghandaVideos() {
  return (
    <section className="bg-gradient-to-br from-red-950/40 via-gray-900 to-slate-900 border border-red-700/40 rounded-xl p-3 sm:p-4 md:p-6 shadow-xl">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-5">
        <div className="flex items-start gap-2 sm:gap-3 min-w-0 flex-1">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white shadow-lg shrink-0">
            <Video className="w-5 h-5 sm:w-7 sm:h-7" />
          </div>
          <div className="min-w-0">
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-white leading-tight">
              Flood Preparedness Educational Videos
            </h2>
            <p className="text-[11px] sm:text-sm text-gray-400 mt-1">
              <span className="text-red-300 font-semibold">#MAGHANDA</span> ·{' '}
              <span className="text-emerald-300 font-semibold">#PanatagAngMayAlam</span>
            </p>
          </div>
        </div>
        <span className="text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full bg-red-500/15 text-red-300 border border-red-500/30 inline-flex items-center gap-1 whitespace-nowrap">
          <BookOpen className="w-3 h-3" /> Educational
        </span>
      </div>

      {/* Videos grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {VIDEOS.map((v) => (
          <article
            key={v.id}
            className="bg-gray-950/60 border border-slate-700/50 rounded-xl overflow-hidden flex flex-col"
          >
            {/* Title bar */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-700/50 bg-gray-900/50">
              <div
                className={`w-10 h-10 rounded-lg bg-gradient-to-br ${v.accent} flex items-center justify-center text-white shrink-0 shadow-md`}
              >
                <v.Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-white text-sm leading-tight">
                  {v.title}
                </h3>
                <p className={`text-[11px] font-semibold mt-0.5 ${v.hashtagColor}`}>
                  {v.hashtag}
                  {v.presenter && (
                    <span className="text-gray-400 font-normal"> · with {v.presenter}</span>
                  )}
                </p>
              </div>
            </div>

            {/* Embedded YouTube player */}
            <div
              className="relative w-full bg-black"
              style={{ paddingBottom: '56.25%' }}
            >
              <iframe
                src={v.embedSrc}
                title={`${v.title} - #MAGHANDA`}
                className="absolute inset-0 w-full h-full"
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>

            {/* Description */}
            <div className="p-4 flex-1">
              <h4 className="text-xs font-semibold text-white mb-1.5 flex items-center gap-1.5">
                <PlayCircle className="w-3.5 h-3.5 text-red-400" />
                About this video
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                {v.description}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="text-[11px] text-gray-500 text-center pt-4 mt-2 border-t border-slate-800">
        Sources: PAGASA-DOST Official YouTube Channel (#MAGHANDA) · #PanatagAngMayAlam Campaign
      </div>
    </section>
  );
}
