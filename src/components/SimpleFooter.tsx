import { Github, Linkedin } from 'lucide-react';

export default function SimpleFooter() {
  return (
    <footer className="w-full bg-dark-bg text-zinc-400 py-6 px-4 md:px-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs tracking-widest uppercase mt-auto">
      <div className="mb-4 md:mb-0">
        © {new Date().getFullYear()} Ayush Supath. All rights reserved.
      </div>
      <div className="flex space-x-6">
        <a href="https://github.com/ayushsupath" target="_blank" rel="noopener noreferrer" className="hover:text-lime-neon transition-colors">
          <Github className="w-5 h-5" />
        </a>
        <a href="https://linkedin.com/in/ayushsupath" target="_blank" rel="noopener noreferrer" className="hover:text-lime-neon transition-colors">
          <Linkedin className="w-5 h-5" />
        </a>
      </div>
    </footer>
  );
}
