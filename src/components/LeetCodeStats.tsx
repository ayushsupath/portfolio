import { ArrowUpRight, Clock3, Code2, Flame, Sparkles, Trophy } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { ActivityCalendar } from 'react-activity-calendar';

interface LeetCodeSubmission {
  title: string;
  titleSlug: string;
  timestamp: string;
  statusDisplay: string;
  lang: string;
}

interface LeetCodeApiResponse {
  totalSolved: number;
  ranking: number;
  contributionPoint: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  submissionCalendar: Record<string, number>;
  recentSubmissions: LeetCodeSubmission[];
}

interface ActivityDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

const leetcodeUsername = 'ayushsupath';
const yearOptions: Array<{ label: string; value: number | 'recent' }> = [
  { label: 'Recent', value: 'recent' },
  { label: '2026', value: 2026 },
  { label: '2025', value: 2025 },
  { label: '2024', value: 2024 },
  { label: '2023', value: 2023 },
];

const formatLanguage = (lang: string) => {
  switch (lang.toLowerCase()) {
    case 'python':
    case 'pythondata':
      return 'Python';
    case 'cpp':
      return 'C++';
    case 'java':
      return 'Java';
    case 'javascript':
      return 'JavaScript';
    case 'typescript':
      return 'TypeScript';
    default:
      return lang.charAt(0).toUpperCase() + lang.slice(1);
  }
};

const timeAgo = (timestamp: string) => {
  const now = Date.now() / 1000;
  const seconds = Math.max(1, Math.floor(now - Number(timestamp)));
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) return `${years}y ago`;
  if (months > 0) return `${months}mo ago`;
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  return `${minutes}m ago`;
};

const getLevel = (count: number): ActivityDay['level'] => {
  if (count <= 0) return 0;
  if (count <= 1) return 1;
  if (count <= 3) return 2;
  if (count <= 5) return 3;
  return 4;
};

export default function LeetCodeStats() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<LeetCodeApiResponse | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | 'recent'>('recent');

  useEffect(() => {
    let isMounted = true;

    async function loadLeetCodeData() {
      try {
        const response = await fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${leetcodeUsername}`);
        if (!response.ok) {
          throw new Error(`LeetCode API returned ${response.status}`);
        }

        const apiData = (await response.json()) as LeetCodeApiResponse;

        if (!isMounted) return;
        setData(apiData);
      } catch (err) {
        if (!isMounted) return;
        setError(err instanceof Error ? err.message : 'Unable to load LeetCode data.');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadLeetCodeData();
    return () => {
      isMounted = false;
    };
  }, []);

  const activityData = useMemo<ActivityDay[]>(() => {
    if (!data?.submissionCalendar) return [];

    return Object.entries(data.submissionCalendar)
      .map(([timestamp, count]) => {
        const date = new Date(Number(timestamp) * 1000);
        return {
          date: date.toISOString().slice(0, 10),
          count,
          level: getLevel(count),
        };
      })
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [data]);

  const filteredActivity = useMemo(() => {
    if (!activityData || activityData.length === 0) return [];

    if (selectedYear === 'recent') {
      // Get the last 365 days of data or all available data
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - 365);
      const startKey = cutoffDate.toISOString().slice(0, 10);
      return activityData.filter((day) => day.date >= startKey);
    }

    return activityData.filter((day) => day.date.startsWith(String(selectedYear)));
  }, [activityData, selectedYear]);

  const progressItems = useMemo(() => {
    if (!data) return [];
    return [
      {
        label: 'Easy',
        solved: data.easySolved,
        total: data.totalEasy,
        color: 'from-teal-400 to-emerald-500',
        accent: 'text-teal-300',
        bar: 'from-teal-400/80 to-emerald-400/80',
        glow: 'shadow-[0_0_20px_rgba(16,185,129,0.4)]',
      },
      {
        label: 'Medium',
        solved: data.mediumSolved,
        total: data.totalMedium,
        color: 'from-amber-400 to-yellow-500',
        accent: 'text-amber-300',
        bar: 'from-amber-400/80 to-yellow-400/80',
        glow: 'shadow-[0_0_20px_rgba(245,158,11,0.4)]',
      },
      {
        label: 'Hard',
        solved: data.hardSolved,
        total: data.totalHard,
        color: 'from-rose-500 to-red-500',
        accent: 'text-rose-300',
        bar: 'from-rose-500/80 to-red-400/80',
        glow: 'shadow-[0_0_20px_rgba(239,68,68,0.4)]',
      },
    ];
  }, [data]);

  const recentAccepted = useMemo(() => {
    if (!data?.recentSubmissions) return [];
    return data.recentSubmissions.filter((entry) => entry.statusDisplay === 'Accepted').slice(0, 5);
  }, [data]);

  return (
    <section className="relative overflow-hidden bg-dark-bg px-4 py-20 md:px-8 md:py-32">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,_rgba(0,255,65,0.12),_transparent_50%),radial-gradient(circle_at_80%_80%,_rgba(6,182,212,0.12),_transparent_50%)]" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-lime-neon/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-14 text-center md:mb-16">
          <div className="mb-5 flex items-center justify-center gap-3">
            <div className="animate-pulse rounded-full border border-cyan-400/40 bg-gradient-to-br from-cyan-400/20 to-cyan-400/5 p-3 text-cyan-300 shadow-[0_0_32px_rgba(34,211,238,0.25)]">
              <Sparkles className="h-6 w-6" />
            </div>
            <h2 className="text-5xl font-black tracking-tight text-white md:text-6xl">
              LeetCode <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-amber-300 bg-clip-text text-transparent">Performance</span>
            </h2>
          </div>
          <p className="mx-auto max-w-3xl text-lg text-zinc-400 md:text-xl">
            Cinematic snapshot of problem-solving mastery, contribution metrics, and competitive standing
          </p>
        </div>

        {error ? (
          <div className="mb-10 rounded-2xl border border-rose-400/30 bg-rose-500/10 p-6 text-rose-200 backdrop-blur-xl">
            <p className="font-medium">Unable to load LeetCode data.</p>
            <p className="mt-2 text-sm text-rose-100">{error}</p>
          </div>
        ) : null}

        <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
          {/* Left Panel - Stats & Breakdown */}
          <div className="group relative rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-950/90 p-8 shadow-[0_0_80px_rgba(8,15,25,0.7)] backdrop-blur-3xl transition duration-500 hover:border-cyan-400/30">
            <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-cyan-400/5 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
            <div className="relative z-10">
              {/* Profile Header */}
              <div className="mb-8 flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.4em] text-cyan-400/70">Live profile</p>
                  <h3 className="mt-2.5 text-3xl font-black text-white">{leetcodeUsername}</h3>
                </div>
                <a
                  href={`https://leetcode.com/${leetcodeUsername}/`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-cyan-400/50 bg-cyan-400/15 px-5 py-2.5 font-semibold text-cyan-200 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/70 hover:bg-cyan-400/25 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                >
                  Visit Profile <ArrowUpRight className="h-5 w-5" />
                </a>
              </div>

              {/* Main Stats Grid */}
              <div className="mb-8 grid gap-4 md:grid-cols-3">
                {/* Ranking Card */}
                <div className="group/card relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-white/8 to-white/5 p-6 transition duration-300 hover:-translate-y-1 hover:border-amber-400/50">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-transparent opacity-0 transition duration-300 group-hover/card:opacity-100" />
                  <div className="absolute -top-16 -right-16 h-32 w-32 rounded-full bg-amber-400/20 blur-2xl opacity-0 transition duration-300 group-hover/card:opacity-100" />

                  <div className="relative z-10">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1.5">
                      <Trophy className="h-4 w-4 text-amber-300" />
                      <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-200">Ranking</span>
                    </div>
                    <p className="mt-3 text-4xl font-black text-white leading-none">
                      {loading ? '—' : data?.ranking?.toLocaleString() ?? '—'}
                    </p>
                    <p className="mt-3 text-sm text-zinc-400">Global leaderboard position</p>
                  </div>
                </div>

                {/* Solved Card */}
                <div className="group/card relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-white/8 to-white/5 p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/50">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-transparent opacity-0 transition duration-300 group-hover/card:opacity-100" />
                  <div className="absolute -top-16 -right-16 h-32 w-32 rounded-full bg-cyan-400/20 blur-2xl opacity-0 transition duration-300 group-hover/card:opacity-100" />

                  <div className="relative z-10">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5">
                      <Code2 className="h-4 w-4 text-cyan-300" />
                      <span className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-200">Solved</span>
                    </div>
                    <p className="mt-3 text-4xl font-black text-white leading-none">
                      {loading ? '—' : data?.totalSolved?.toLocaleString() ?? '—'}
                    </p>
                    <p className="mt-3 text-sm text-zinc-400">{data?.totalQuestions?.toLocaleString() ?? '—'} tracked</p>
                  </div>
                </div>

                {/* Points Card */}
                <div className="group/card relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-white/8 to-white/5 p-6 transition duration-300 hover:-translate-y-1 hover:border-rose-400/50">
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-400/10 to-transparent opacity-0 transition duration-300 group-hover/card:opacity-100" />
                  <div className="absolute -top-16 -right-16 h-32 w-32 rounded-full bg-rose-400/20 blur-2xl opacity-0 transition duration-300 group-hover/card:opacity-100" />

                  <div className="relative z-10">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-rose-400/20 bg-rose-400/10 px-3 py-1.5">
                      <Flame className="h-4 w-4 text-rose-300" />
                      <span className="text-xs font-bold uppercase tracking-[0.25em] text-rose-200">Points</span>
                    </div>
                    <p className="mt-3 text-4xl font-black text-white leading-none">
                      {loading ? '—' : data?.contributionPoint?.toLocaleString() ?? '—'}
                    </p>
                    <p className="mt-3 text-sm text-zinc-400">Contribution score</p>
                  </div>
                </div>
              </div>

              {/* Solved Breakdown */}
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/70 to-slate-800/50 p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-400">Difficulty breakdown</p>
                    <h4 className="mt-2 text-xl font-bold text-white">Problem mastery</h4>
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-semibold text-zinc-300">
                    {data?.totalSolved ?? 0} / {data?.totalQuestions ?? 0}
                  </div>
                </div>

                <div className="space-y-4 mt-5">
                  {progressItems.map((item) => {
                    const percent = Math.min(100, Math.round((item.solved / item.total) * 100));
                    return (
                      <div key={item.label} className={`group/bar rounded-2xl border border-white/10 bg-black/30 p-4 transition duration-300 hover:border-white/20 ${item.glow}`}>
                        <div className="mb-3 flex items-center justify-between">
                          <span className={`text-sm font-bold uppercase tracking-[0.2em] ${item.accent}`}>{item.label}</span>
                          <span className="text-sm font-semibold text-zinc-400">{item.solved} / {item.total}</span>
                        </div>
                        <div className="relative h-3.5 overflow-hidden rounded-full bg-slate-800/60 border border-white/5">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${item.bar} transition-all duration-500 ease-out shadow-lg`}
                            style={{ width: `${percent}%` }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/bar:opacity-30 transition duration-300" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Activity & Recent */}
          <div className="space-y-6">
            {/* Activity Calendar */}
            <div className="group relative rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-950/90 p-8 shadow-[0_0_80px_rgba(8,15,25,0.7)] backdrop-blur-3xl transition duration-500 hover:border-emerald-400/30">
              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-emerald-400/5 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
              <div className="relative z-10">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.4em] text-emerald-400/70">Activity rhythm</p>
                    <h3 className="mt-2 text-xl font-bold text-white">Contribution calendar</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {yearOptions.map((option) => (
                      <button
                        key={option.label}
                        type="button"
                        onClick={() => setSelectedYear(option.value)}
                        className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition duration-300 ${
                          selectedYear === option.value
                            ? 'border-emerald-400/60 bg-emerald-400/20 text-emerald-100 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                            : 'border-white/15 bg-white/5 text-zinc-400 hover:border-emerald-400/40 hover:text-emerald-200'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/50 to-slate-800/30 p-4">
                  {loading ? (
                    <div className="flex min-h-[280px] items-center justify-center text-sm text-zinc-400">Loading calendar…</div>
                  ) : activityData.length === 0 ? (
                    <div className="flex min-h-[280px] items-center justify-center text-sm text-zinc-400">No activity data available</div>
                  ) : filteredActivity.length === 0 ? (
                    <div className="flex min-h-[280px] items-center justify-center text-sm text-zinc-400">No activity in the selected period</div>
                  ) : (
                    <div className="overflow-x-auto">
                      <ActivityCalendar
                        data={filteredActivity}
                        colorScheme="dark"
                        blockSize={13}
                        blockMargin={3}
                        fontSize={11}
                        theme={{
                          dark: ['#1e293b', '#0d3d32', '#0f8860', '#16a34a', '#22c55e'],
                        }}
                        labels={{
                          legend: 'Less',
                          months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                          weekdays: ['Sun', 'Mon', 'Wed', 'Fri', 'Sat'],
                          totalCount: '{{count}} submissions',
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Recent Submissions */}
            <div className="group relative rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-950/90 p-8 shadow-[0_0_80px_rgba(8,15,25,0.7)] backdrop-blur-3xl transition duration-500 hover:border-lime-neon/30">
              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-lime-neon/5 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
              <div className="relative z-10">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.4em] text-lime-neon/70">Recent wins</p>
                    <h3 className="mt-2 text-xl font-bold text-white">Top 5 accepted</h3>
                  </div>
                  <div className="rounded-full border border-lime-neon/30 bg-lime-neon/15 px-3 py-1.5 text-xs font-bold text-lime-neon">
                    Latest
                  </div>
                </div>

                <div className="space-y-3 mt-5">
                  {recentAccepted.length > 0 ? (
                    recentAccepted.map((item) => (
                      <a
                        key={item.titleSlug}
                        href={`https://leetcode.com/problems/${item.titleSlug}/`}
                        target="_blank"
                        rel="noreferrer"
                        className="group/item relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-white/8 to-white/5 px-4 py-3.5 transition duration-300 hover:-translate-y-0.5 hover:border-lime-neon/40"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-lime-neon/10 to-transparent opacity-0 transition duration-300 group-hover/item:opacity-100" />

                        <div className="relative z-10 flex items-center justify-between">
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-bold text-white">{item.title}</p>
                            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                              <span className="rounded-full border border-emerald-400/30 bg-emerald-400/15 px-2 py-0.5 font-semibold text-emerald-200">
                                {formatLanguage(item.lang)}
                              </span>
                              <span className="inline-flex items-center gap-1.5 text-zinc-400">
                                <Clock3 className="h-3.5 w-3.5" />
                                {timeAgo(item.timestamp)}
                              </span>
                            </div>
                          </div>
                          <ArrowUpRight className="ml-3 h-5 w-5 shrink-0 text-zinc-500 transition duration-300 group-hover/item:text-lime-neon" />
                        </div>
                      </a>
                    ))
                  ) : (
                    <div className="rounded-2xl border border-dashed border-white/15 p-4 text-center text-sm text-zinc-400">
                      No submissions yet
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
