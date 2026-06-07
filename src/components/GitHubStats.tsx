import { Github } from 'lucide-react';
import { useEffect, useState } from 'react';

const languageColorMap: Record<string, string> = {
  TypeScript: 'from-blue-500 to-cyan-500',
  JavaScript: 'from-yellow-500 to-orange-500',
  Python: 'from-blue-600 to-yellow-600',
  HTML: 'from-orange-500 to-red-500',
  CSS: 'from-pink-500 to-red-500',
  Other: 'from-slate-500 to-slate-400',
};

export default function GitHubStats() {
  const gitHubUsername = 'ayushsupath';
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [publicRepos, setPublicRepos] = useState<number>(0);
  const [followers, setFollowers] = useState<number>(0);
  const [totalStars, setTotalStars] = useState<number>(0);
  const [topLanguages, setTopLanguages] = useState(
    [
      { lang: 'TypeScript', percent: 45, color: languageColorMap.TypeScript },
      { lang: 'JavaScript', percent: 30, color: languageColorMap.JavaScript },
      { lang: 'Python', percent: 15, color: languageColorMap.Python },
      { lang: 'CSS/HTML', percent: 10, color: languageColorMap.CSS },
    ]
  );

  useEffect(() => {
    let isMounted = true;

    async function loadGitHubData() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${gitHubUsername}`),
          fetch(`https://api.github.com/users/${gitHubUsername}/repos?per_page=100`),
        ]);

        if (!userRes.ok) {
          throw new Error(`GitHub user API returned ${userRes.status}`);
        }
        if (!reposRes.ok) {
          throw new Error(`GitHub repos API returned ${reposRes.status}`);
        }

        const userData = await userRes.json();
        const reposData = await reposRes.json();

        if (!isMounted) return;

        setPublicRepos(userData.public_repos ?? 0);
        setFollowers(userData.followers ?? 0);

        const starCount = reposData.reduce(
          (sum: number, repo: { stargazers_count: number }) => sum + (repo.stargazers_count || 0),
          0
        );
        setTotalStars(starCount);

        const languageCounts = reposData.reduce<Record<string, number>>((acc, repo: { language: string | null }) => {
          const language = repo.language || 'Other';
          acc[language] = (acc[language] || 0) + 1;
          return acc;
        }, {});

        const totalLanguageCount = Object.values(languageCounts).reduce((sum, value) => sum + value, 0);
        const sortedLanguages = Object.entries(languageCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 4)
          .map(([lang, count]) => ({
            lang: lang === 'Other' ? 'Other' : lang,
            percent: totalLanguageCount ? Math.round((count / totalLanguageCount) * 100) : 0,
            color: languageColorMap[lang] ?? languageColorMap.Other,
          }));

        if (sortedLanguages.length > 0) {
          setTopLanguages(sortedLanguages);
        }
      } catch (err) {
        if (!isMounted) return;
        setError(err instanceof Error ? err.message : 'Failed to load GitHub statistics');
      } finally {
        if (!isMounted) return;
        setLoading(false);
      }
    }

    loadGitHubData();
    return () => {
      isMounted = false;
    };
  }, [gitHubUsername]);

  return (
    <section className="bg-dark-bg py-20 md:py-32 px-4 md:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Github className="w-8 h-8 text-lime-neon" />
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              GitHub Statistics
            </h2>
          </div>
          <p className="text-gray-400 text-lg mt-2">
            Real-time insights from my GitHub profile
          </p>
        </div>

        {error ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 mb-10 text-red-200">
            <p className="font-medium">Unable to load GitHub data.</p>
            <p className="text-sm text-red-100 mt-2">{error}</p>
          </div>
        ) : null}

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Main Stats Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border border-white/10 hover:border-lime-neon/30 transition-all duration-300 overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-lime-neon/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <div className="w-3 h-3 bg-lime-neon rounded-full"></div>
                GitHub Profile Overview
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition">
                  <span className="text-gray-400">Public Repositories</span>
                  <span className="text-2xl font-bold text-lime-neon">
                    {loading ? '—' : publicRepos}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition">
                  <span className="text-gray-400">Total Stars</span>
                  <span className="text-2xl font-bold text-cyan-400">
                    {loading ? '—' : totalStars}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition">
                  <span className="text-gray-400">GitHub Followers</span>
                  <span className="text-2xl font-bold text-purple-400">
                    {loading ? '—' : followers}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition">
                  <span className="text-gray-400">Contributions (1y)</span>
                  <span className="text-2xl font-bold text-pink-400">—</span>
                </div>
              </div>
              <a
                href={`https://github.com/${gitHubUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-lime-neon text-slate-900 font-semibold rounded-lg hover:bg-lime-neon/90 transition transform hover:-translate-y-0.5"
              >
                <Github className="w-5 h-5" />
                Visit GitHub Profile
              </a>
            </div>
          </div>

          {/* Top Languages */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border border-white/10 hover:border-blue-400/30 transition-all duration-300 overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                Top Languages
              </h3>
              <div className="space-y-4">
                {topLanguages.map((item) => (
                  <div key={item.lang}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300 font-medium">{item.lang}</span>
                      <span className={`text-sm font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                        {item.percent}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-500 ease-out`}
                        style={{ width: `${item.percent}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* GitHub Data Summary */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 border border-white/10 hover:border-green-400/30 transition-all duration-300 overflow-hidden min-h-[350px]">
            <div className="text-gray-300 mb-4">
              {loading ? 'Loading GitHub overview…' : 'Overview pulled directly from GitHub API.'}
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                <span className="text-gray-400">Profile</span>
                <span className="text-white font-semibold">{gitHubUsername}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                <span className="text-gray-400">Repositories</span>
                <span className="text-white font-semibold">{loading ? '—' : publicRepos}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                <span className="text-gray-400">Followers</span>
                <span className="text-white font-semibold">{loading ? '—' : followers}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                <span className="text-gray-400">Stars</span>
                <span className="text-white font-semibold">{loading ? '—' : totalStars}</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 border border-white/10 hover:border-purple-400/30 transition-all duration-300 overflow-hidden min-h-[350px]">
            <div className="text-gray-300 mb-4">Contribution activity graph</div>
            <div className="text-center text-sm text-gray-300 p-8 bg-white/5 rounded-xl">
              GitHub contribution graph support is not available here. Visit my GitHub profile to see the live activity calendar.
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <a
            href={`https://github.com/${gitHubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-lime-neon to-cyan-400 text-slate-900 font-bold rounded-lg hover:shadow-lg hover:shadow-lime-neon/30 transition transform hover:-translate-y-1"
          >
            <Github className="w-6 h-6" />
            Explore All GitHub Projects
          </a>
        </div>
      </div>
    </section>
  );
}
