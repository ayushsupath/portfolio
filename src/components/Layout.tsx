import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Github, Linkedin } from 'lucide-react';
import { useEffect, useMemo } from 'react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/experience', label: 'Experience' },
  { to: '/skills', label: 'Skills' },
  { to: '/projects', label: 'Projects' },
  { to: '/education', label: 'Education' },
  { to: '/certifications', label: 'Certs' },
  { to: '/contact', label: 'Contact' },
];

export default function Layout() {
  const location = useLocation();

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Memoize stars so they don't re-render on every navigation
  const stars = useMemo(() => (
    [...Array(50)].map((_, i) => (
      <div
        key={i}
        className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-pulse"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${2 + Math.random() * 3}s`
        }}
      ></div>
    ))
  ), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-x-hidden flex flex-col">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        {stars}
      </div>

      {/* Fixed Navigation */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex space-x-1 bg-white/10 backdrop-blur-md rounded-full p-2 border border-white/20">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-white text-purple-900 shadow-lg transform scale-105'
                    : 'text-white hover:bg-white/20'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Floating Social Icons */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 space-y-4 sm:right-3 sm:top-auto sm:bottom-4 sm:translate-y-0 sm:flex sm:space-y-0 sm:space-x-3">
        <a
          href="https://github.com/InsaanAyu"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile"
          className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110 cursor-pointer group sm:w-10 sm:h-10"
        >
          <Github className="w-6 h-6 text-white group-hover:text-purple-300 sm:w-5 sm:h-5" />
        </a>
        <a
          href="https://linkedin.com/in/ayushsupath"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn Profile"
          className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110 cursor-pointer group sm:w-10 sm:h-10"
        >
          <Linkedin className="w-6 h-6 text-white group-hover:text-blue-300 sm:w-5 sm:h-5" />
        </a>
      </div>

      {/* Page Content */}
      <main className="relative z-10 flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="w-full bg-gradient-to-r from-purple-900 to-slate-900 text-white py-6 px-4 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10 relative z-20">
        <div className="text-center md:text-left text-sm opacity-80">
          © {new Date().getFullYear()} Ayush Supath. All rights reserved.
        </div>
        <div className="flex space-x-4">
          <a href="https://github.com/InsaanAyu" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-purple-300 transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://linkedin.com/in/ayushsupath" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-blue-300 transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </footer>
    </div>
  );
}
