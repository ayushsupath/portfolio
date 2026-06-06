import { Award, ExternalLink } from 'lucide-react';

const certifications = [
  { name: 'Software Engineer Intern', issuer: 'HackerRank', color: 'from-green-500 to-emerald-500', icon: '💻', link: 'https://drive.google.com/file/d/1ayivPbNbJxV_bo8SQhkd7QEnjW7BdT92/view?usp=sharing' },
  { name: 'Python (Basic)', issuer: 'HackerRank', color: 'from-teal-500 to-cyan-500', icon: '🐍', link: 'https://drive.google.com/file/d/1RaYSyBTIeghVlacefpG5sCRAPSPU9mNw/view?usp=sharing' },
  { name: 'Advance Java with DSA', issuer: 'Codding Shuttle', color: 'from-orange-500 to-red-500', icon: '☕', link: 'https://drive.google.com/file/d/1e7qRLZ4tXDh8IFKVuspvZRfK1bnAF0TX/view?usp=sharing' },
  { name: 'Networking Essential', issuer: 'Cisco', color: 'from-blue-500 to-indigo-500', icon: '🌐', link: 'https://drive.google.com/file/d/1NcMZ7dovI3WqG7sdgSuRe2Ue7KCPaoP_/view?usp=sharing' },
  { name: 'Cyber Forensic', issuer: 'Great Learning', color: 'from-purple-500 to-violet-500', icon: '🔍', link: 'https://drive.google.com/file/d/1nkyMPxSVkYEnLutKB9jYl9V28sAN81rj/view?usp=sharing' },
  { name: 'Advent of Cyber 2022', issuer: 'Try Hack Me', color: 'from-green-500 to-emerald-500', icon: '🛡️', link: 'https://drive.google.com/file/d/1UzOV5PR55MWHH6PsW4dsXx92xLv-6BMI/view?usp=sharing' }
];

export default function Certifications() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-6 sm:px-3">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl lg:text-7xl font-bold text-center mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent sm:text-3xl">
          📜 Certifications
        </h1>
        <p className="text-center text-gray-400 text-lg mb-16 max-w-2xl mx-auto sm:text-base sm:mb-8">
          Professional certifications and achievements
        </p>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-4">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="group relative transform transition-all duration-700 hover:scale-105"
            >
              <div className={`bg-gradient-to-br ${cert.color} rounded-2xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 relative overflow-hidden sm:p-5`}>
                <div className="absolute top-4 right-4">
                  <Award className="w-8 h-8 text-white/80 animate-pulse" />
                </div>

                <div className="relative z-10">
                  <div className="text-5xl mb-4 sm:text-3xl sm:mb-2">{cert.icon}</div>
                  <h2 className="text-xl font-bold text-white mb-1 sm:text-base">{cert.name}</h2>
                  <p className="text-white/80 text-lg mb-4 sm:text-sm sm:mb-2">{cert.issuer}</p>
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium sm:px-3 sm:py-1 sm:text-xs"
                  >
                    <span>View Certificate</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center border-4 border-white/30 animate-spin-slow">
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
