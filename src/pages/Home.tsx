import { Link } from 'react-router-dom';
import { Code, Cpu, Cloud, ChevronRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-12 px-6 sm:px-3 sm:pt-16 sm:pb-8">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center sm:block">
        {/* Character/Workspace Illustration */}
        <div className="relative">
          <div className="relative w-full max-w-md mx-auto">
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-3xl p-8 border border-slate-600 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              {/* Dual Monitors */}
              <div className="flex space-x-4 mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-3 flex-1 transform hover:scale-105 transition-transform duration-300">
                  <div className="bg-slate-900 rounded p-2 text-xs text-green-400 font-mono">
                    <div className="animate-pulse">$ npm run dev</div>
                    <div className="text-blue-400">✓ Server running...</div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-lg p-3 flex-1 transform hover:scale-105 transition-transform duration-300">
                  <div className="bg-slate-900 rounded p-2 text-xs text-white font-mono">
                    <div className="text-yellow-400">Training Model...</div>
                    <div className="text-green-400">█████████░ 95%</div>
                  </div>
                </div>
              </div>

              {/* Character */}
              <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center text-2xl animate-bounce">
                👨💻
              </div>

              {/* Floating Icons */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-spin-slow">
                <Code className="w-4 h-4 text-yellow-900" />
              </div>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="text-white space-y-6">
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent animate-pulse sm:text-3xl">
              Ayush Supath
            </h1>
            <h2 className="text-2xl lg:text-3xl text-purple-300 font-light sm:text-lg">
              Full Stack Developer & AI Enthusiast
            </h2>
          </div>

          <p className="text-lg text-gray-300 leading-relaxed sm:text-base">
            Motivated MCA student at SGSITS with strong skills in full-stack development and a background in Cloud and
            Information Security. Experienced in building scalable web apps and passionate about learning and solving
            real-world problems. Seeking internship or entry-level role to contribute technical skills and grow professionally.
          </p>

          <div className="flex space-x-4">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-3 animate-pulse">
              <Code className="w-6 h-6 text-white" />
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full p-3 animate-pulse" style={{animationDelay: '0.5s'}}>
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-full p-3 animate-pulse" style={{animationDelay: '1s'}}>
              <Cloud className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/about"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-bold text-lg transform transition-all duration-300 hover:scale-110 hover:shadow-lg flex items-center space-x-2 sm:px-4 sm:py-2 sm:text-base"
            >
              <span>Explore My Journey</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link
              to="/projects"
              className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg transform transition-all duration-300 hover:scale-110 hover:bg-white/10 flex items-center space-x-2 sm:px-4 sm:py-2 sm:text-base"
            >
              <span>View Projects</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
