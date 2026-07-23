import { useEffect, useState, useMemo } from 'react';
import { ActivityCalendar } from 'react-activity-calendar';
import { Trophy, Code, Flame, ExternalLink, CheckCircle, Award } from 'lucide-react';

interface Submission {
  title: string;
  titleSlug: string;
  timestamp: string;
  statusDisplay: string;
  lang: string;
}

interface LeetCodeData {
  totalSolved: number;
  ranking: number;
  contributionPoint: number;
  reputation: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  submissionCalendar: Record<string, number>;
  recentSubmissions: Submission[];
  totalQuestions: number;
}

export default function LeetCodeStats() {
  const username = 'ayushsupath';
  const [data, setData] = useState<LeetCodeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [calendarDataRaw, setCalendarDataRaw] = useState<Record<string, number> | null>(null);
  const [calendarLoading, setCalendarLoading] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function fetchLeetCodeData() {
      try {
        const res = await fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${username}`);
        if (!res.ok) {
          throw new Error(`LeetCode API returned ${res.status}`);
        }
        const json = await res.json();
        
        if (!json || Object.keys(json).length === 0 || json.errors) {
          throw new Error('API returned an empty or invalid response');
        }

        const safeData: LeetCodeData = {
          totalSolved: json.totalSolved ?? 0,
          ranking: json.ranking ?? 0,
          contributionPoint: json.contributionPoint ?? 0,
          reputation: json.reputation ?? 0,
          easySolved: json.easySolved ?? 0,
          totalEasy: json.totalEasy ?? 0,
          mediumSolved: json.mediumSolved ?? 0,
          totalMedium: json.totalMedium ?? 0,
          hardSolved: json.hardSolved ?? 0,
          totalHard: json.totalHard ?? 0,
          submissionCalendar: json.submissionCalendar ?? {},
          recentSubmissions: Array.isArray(json.recentSubmissions) ? json.recentSubmissions : [],
          totalQuestions: json.totalQuestions ?? 0,
        };

        if (isMounted) {
          setData(safeData);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch LeetCode data');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchLeetCodeData();
    return () => {
      isMounted = false;
    };
  }, [username]);

  // Fetch specific year calendar data
  useEffect(() => {
    let isMounted = true;
    async function fetchCalendar() {
      setCalendarLoading(true);
      try {
        const res = await fetch(`https://alfa-leetcode-api.onrender.com/${username}/calendar?year=${selectedYear}`);
        if (!res.ok) throw new Error('Failed to fetch calendar');
        const json = await res.json();
        if (isMounted) {
          if (json.submissionCalendar) {
            setCalendarDataRaw(JSON.parse(json.submissionCalendar));
          } else {
            setCalendarDataRaw({});
          }
        }
      } catch (err) {
        if (isMounted) {
          setCalendarDataRaw({});
        }
      } finally {
        if (isMounted) {
          setCalendarLoading(false);
        }
      }
    }
    fetchCalendar();
    return () => { isMounted = false; };
  }, [username, selectedYear]);

  // Process calendar data whenever data or selectedYear changes
  const { calendarData, yearContributions } = useMemo(() => {
    if (!calendarDataRaw) {
      return { calendarData: [], yearContributions: 0 };
    }

    // Parse submissions into YYYY-MM-DD map in UTC to prevent day shifts
    const submissionMap: Record<string, number> = {};
    Object.entries(calendarDataRaw).forEach(([timestampSecStr, count]) => {
      const timestampSec = parseInt(timestampSecStr, 10);
      const dateObj = new Date(timestampSec * 1000);
      const y = dateObj.getUTCFullYear();
      const m = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
      const d = String(dateObj.getUTCDate()).padStart(2, '0');
      const dateStr = `${y}-${m}-${d}`;
      submissionMap[dateStr] = (submissionMap[dateStr] || 0) + count;
    });

    // Generate full list of days for selected year
    const yearData: { date: string; count: number; level: number }[] = [];
    const startDate = new Date(Date.UTC(selectedYear, 0, 1));
    const endDate = new Date(Date.UTC(selectedYear, 11, 31));
    
    let totalForYear = 0;
    const temp = new Date(startDate);
    
    while (temp <= endDate) {
      const y = temp.getUTCFullYear();
      const m = String(temp.getUTCMonth() + 1).padStart(2, '0');
      const d = String(temp.getUTCDate()).padStart(2, '0');
      const dateStr = `${y}-${m}-${d}`;
      
      const count = submissionMap[dateStr] || 0;
      totalForYear += count;

      let level = 0;
      if (count > 0 && count <= 2) level = 1;
      else if (count > 2 && count <= 5) level = 2;
      else if (count > 5 && count <= 8) level = 3;
      else if (count > 8) level = 4;

      yearData.push({ date: dateStr, count, level });
      temp.setUTCDate(temp.getUTCDate() + 1);
    }

    return { calendarData: yearData, yearContributions: totalForYear };
  }, [calendarDataRaw, selectedYear]);

  const isMobile = windowWidth < 768;
  const blockSize = isMobile ? 9 : 13;
  const blockMargin = isMobile ? 2 : 4;
  const fontSize = isMobile ? 10 : 13;

  const formatTimeAgo = (timestampStr: string) => {
    const timestampSec = parseInt(timestampStr, 10);
    const diffMs = Date.now() - (timestampSec * 1000);
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 30) return `${diffDays} days ago`;

    return new Date(timestampSec * 1000).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Helper for rendering SVG circular progress bar
  const CircularProgress = ({ solved, total, color, title }: { solved: number; total: number; color: string; title: string }) => {
    const percentage = total > 0 ? Math.round((solved / total) * 1000) / 10 : 0;
    const radius = 36;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (Math.min(percentage, 100) / 100) * circumference;

    const colorClasses: Record<string, { stroke: string; text: string; bg: string; glow: string }> = {
      easy: {
        stroke: 'stroke-[#00b8a3]',
        text: 'text-[#00b8a3]',
        bg: 'bg-[#00b8a3]/10',
        glow: 'shadow-[#00b8a3]/20',
      },
      medium: {
        stroke: 'stroke-[#ffc01e]',
        text: 'text-[#ffc01e]',
        bg: 'bg-[#ffc01e]/10',
        glow: 'shadow-[#ffc01e]/20',
      },
      hard: {
        stroke: 'stroke-[#ef4743]',
        text: 'text-[#ef4743]',
        bg: 'bg-[#ef4743]/10',
        glow: 'shadow-[#ef4743]/20',
      }
    };

    const activeColor = colorClasses[color] || colorClasses.easy;

    return (
      <div className="flex flex-col items-center p-6 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-all duration-300">
        <span className="text-gray-400 font-semibold mb-4 text-sm tracking-wider uppercase">{title}</span>
        <div className="relative w-24 h-24">
          {/* Base Circle */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="48"
              cy="48"
              r={radius}
              className="stroke-slate-800"
              strokeWidth="6"
              fill="transparent"
            />
            {/* Progress Circle */}
            <circle
              cx="48"
              cy="48"
              r={radius}
              className={`${activeColor.stroke} transition-all duration-1000 ease-out`}
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          {/* Inner Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-lg font-bold ${activeColor.text}`}>{percentage}%</span>
            <span className="text-xs text-gray-500">solved</span>
          </div>
        </div>
        <div className="mt-4 text-center">
          <span className="text-xl font-bold text-white">{solved}</span>
          <span className="text-gray-500 text-sm"> / {total}</span>
        </div>
      </div>
    );
  };

  return (
    <section className="bg-dark-bg py-20 md:py-32 px-4 md:px-8 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-8 h-8 text-amber-500 animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              LeetCode Statistics
            </h2>
          </div>
          <p className="text-gray-400 text-lg mt-2">
            Real-time problem solving data & activity metrics
          </p>
        </div>

        {error ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 mb-10 text-red-200">
            <p className="font-medium">Unable to load LeetCode data.</p>
            <p className="text-sm text-red-100 mt-2">{error}</p>
          </div>
        ) : null}

        {loading ? (
          <div className="grid md:grid-cols-3 gap-8 mb-12 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-slate-900/50 border border-white/5 rounded-2xl"></div>
            ))}
          </div>
        ) : data ? (
          <>
            {/* Stats Overview & Difficulty Rings */}
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              {/* Profile Card */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border border-white/10 hover:border-amber-500/30 transition-all duration-300 overflow-hidden group flex flex-col justify-between">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 w-full">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-500" />
                    LeetCode Profile Summary
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition">
                      <span className="text-gray-400">Global Ranking</span>
                      <span className="text-xl font-bold text-amber-400">
                        #{(data.ranking ?? 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition">
                      <span className="text-gray-400">Total Solved</span>
                      <span className="text-xl font-bold text-emerald-400">
                        {data.totalSolved ?? 0} <span className="text-xs text-gray-500">/ {data.totalQuestions ?? 0}</span>
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition">
                      <span className="text-gray-400">Contribution Points</span>
                      <span className="text-xl font-bold text-orange-400">
                        {data.contributionPoint ?? 0}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition">
                      <span className="text-gray-400">Reputation</span>
                      <span className="text-xl font-bold text-purple-400">
                        {data.reputation ?? 0}
                      </span>
                    </div>
                  </div>
                </div>
                <a
                  href={`https://leetcode.com/${username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-900 font-bold rounded-lg hover:opacity-95 transition transform hover:-translate-y-0.5"
                >
                  <Code className="w-5 h-5" />
                  Visit LeetCode Profile
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </div>

              {/* Difficulty Breakdown Progress Wheels */}
              <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border border-white/10 hover:border-orange-500/30 transition-all duration-300 relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <Flame className="w-5 h-5 text-orange-500" />
                      Problem Solving Breakdown
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <CircularProgress
                        title="Easy Problems"
                        solved={data.easySolved ?? 0}
                        total={data.totalEasy ?? 0}
                        color="easy"
                      />
                      <CircularProgress
                        title="Medium Problems"
                        solved={data.mediumSolved ?? 0}
                        total={data.totalMedium ?? 0}
                        color="medium"
                      />
                      <CircularProgress
                        title="Hard Problems"
                        solved={data.hardSolved ?? 0}
                        total={data.totalHard ?? 0}
                        color="hard"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Heatmap & Recent Submissions Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Heatmap Graph */}
              <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 border border-white/10 hover:border-amber-400/30 transition-all duration-300 flex flex-col justify-between min-h-[350px]">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h4 className="text-lg font-bold text-white">Submission Activity Calendar</h4>
                      <p className="text-xs text-gray-400 mt-1">
                        {yearContributions} submissions in the year {selectedYear}
                      </p>
                    </div>
                    {/* Year Selector */}
                    <div className="flex gap-1.5 flex-wrap">
                      {[2026, 2025, 2024, 2023].map((y) => (
                        <button
                          key={y}
                          onClick={() => setSelectedYear(y)}
                          className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${
                            selectedYear === y
                              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-900 shadow-md shadow-orange-500/20'
                              : 'bg-white/5 text-gray-400 hover:bg-white/10'
                          }`}
                        >
                          {y}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="w-full overflow-x-auto touch-pan-x py-6 px-4 bg-white/5 rounded-xl scrollbar-thin scrollbar-thumb-orange-500/30 scrollbar-track-white/5 relative">
                    {calendarLoading && (
                      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-xl">
                        <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                    <div className="min-w-max pb-2">
                      {calendarData.length > 0 ? (
                        <ActivityCalendar
                          data={calendarData}
                          colorScheme="dark"
                          theme={{
                            dark: ['#1e293b', '#3b2314', '#7c2d12', '#ea580c', '#fb923c'],
                          }}
                          fontSize={fontSize}
                          blockSize={blockSize}
                          blockMargin={blockMargin}
                          labels={{
                            totalCount: '{{count}} submissions in {{year}}',
                          }}
                        />
                      ) : (
                        <div className="flex items-center justify-center h-[130px] text-gray-400">
                          No submission activity yet.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Submissions */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 border border-white/10 hover:border-purple-400/30 transition-all duration-300 min-h-[350px] flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-400" />
                    Recent Accepted Solutions
                  </h4>
                  <div className="space-y-3.5">
                    {data.recentSubmissions && data.recentSubmissions.slice(0, 5).map((sub, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center p-3 bg-white/5 hover:bg-white/10 rounded-lg transition border border-transparent hover:border-white/5 group"
                      >
                        <div className="min-w-0 pr-2">
                          <p className="text-sm font-semibold text-gray-200 truncate group-hover:text-amber-400 transition">
                            {sub.title}
                          </p>
                          <span className="inline-block mt-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-slate-800 text-purple-300 rounded border border-purple-500/10">
                            {sub.lang === 'pythondata' ? 'pandas' : sub.lang}
                          </span>
                        </div>
                        <span className="text-[11px] text-gray-500 whitespace-nowrap">
                          {formatTimeAgo(sub.timestamp)}
                        </span>
                      </div>
                    ))}
                    {(!data.recentSubmissions || data.recentSubmissions.length === 0) && (
                      <p className="text-gray-400 text-sm text-center py-8">No recent submissions found.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
