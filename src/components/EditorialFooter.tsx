import { Github, Linkedin } from 'lucide-react';

export default function EditorialFooter() {
  return (
    <footer className="w-full bg-dark-bg text-white px-4 md:px-8 py-16 md:py-24 border-t border-white/10 relative z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        {/* Left Column */}
        <div className="flex flex-col justify-between text-center md:text-left">
          <div>
            <h2 className="text-6xl md:text-display font-black leading-none tracking-tighter mb-8 uppercase">
              START<br />PROJECT
            </h2>
            <div className="flex space-x-8 justify-center md:justify-start">
              {[
                { Icon: Github, href: 'https://github.com/ayushsupath' },
                { Icon: Linkedin, href: 'https://linkedin.com/in/ayushsupath' },
              ].map(({ Icon, href }, idx) => (
                <a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center text-zinc-400 hover:text-white transition-colors"
                >
                  <Icon className="w-8 h-8 relative z-10" />
                  <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-lime-neon transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col justify-between md:items-end text-center md:text-right mt-12 md:mt-0">
          <div className="mt-16 md:mt-0">
            <p className="text-zinc-600 tracking-widest text-[10px] md:text-xs uppercase">
              © {new Date().getFullYear()} Ayush Supath.
              <br className="hidden md:block" /> All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
