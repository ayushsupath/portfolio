import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import ContactModal from './ContactModal';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/experience', label: 'Exp' },
  { to: '/skills', label: 'Skills' },
  { to: '/projects', label: 'Work' },
  { to: '/education', label: 'Edu' },
  { to: '/certifications', label: 'Certs' },
  { to: '/contact', label: 'Contact' },
];

export default function CinematicNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-4 md:py-6 flex items-center justify-between pointer-events-none mix-blend-difference text-white">
        {/* Logo */}
        <div className="flex items-center space-x-2 pointer-events-auto cursor-pointer z-50">
          <div className="w-3 h-3 md:w-4 md:h-4 bg-lime-neon rounded-full" style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
          <span className="font-bold text-lg md:text-xl tracking-tighter">AYUSH.</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex space-x-6 pointer-events-auto">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `uppercase tracking-widest text-xs md:text-sm font-medium transition-colors hover:text-lime-neon ${
                  isActive ? 'text-lime-neon' : 'text-zinc-400'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* CTA Button & Mobile Toggle */}
        <div className="pointer-events-auto flex items-center space-x-4 z-50">
          <button 
            onClick={() => setIsContactModalOpen(true)}
            className="hidden md:inline-block bg-white text-black px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform"
          >
            Let's Talk
          </button>
          <button 
            className="lg:hidden text-white hover:text-lime-neon transition-colors p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-dark-bg/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center space-y-8 transition-all duration-500 lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `uppercase tracking-widest text-xl font-bold transition-all duration-300 ${
                isActive ? 'text-lime-neon scale-110' : 'text-white hover:text-lime-neon'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
        <button 
          onClick={() => {
            setIsOpen(false);
            setIsContactModalOpen(true);
          }}
          className="mt-8 bg-lime-neon text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform"
        >
          Let's Talk
        </button>
      </div>

      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </>
  );
}
