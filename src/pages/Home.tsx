import Hero3D from '../components/Hero3D';
import BentoGrid from '../components/BentoGrid';

export default function Home() {
  return (
    <div className="bg-dark-bg">
      <Hero3D />
      
      {/* Intro Section preserving original content */}
      <section className="bg-dark-bg py-20 md:py-32 px-4 md:px-8 z-20 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 md:gap-16 items-center md:items-start text-center md:text-left">
          <div className="w-full md:w-1/2">
             <h1 className="text-display font-black leading-tight tracking-tighter mb-4 uppercase">
              Ayush <br className="hidden md:block"/><span className="cinematic-gradient-text">Supath</span>
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-4xl text-lime-neon font-bold tracking-widest uppercase mb-6 md:mb-8">
              Full Stack Developer <br className="hidden md:block"/>& AI Enthusiast
            </h2>
          </div>
          <div className="w-full md:w-1/2">
            <p className="text-lg md:text-xl lg:text-2xl text-zinc-400 leading-relaxed font-light">
              Motivated MCA student at SGSITS with strong skills in full-stack development and a background in Cloud and Information Security. Experienced in building scalable web apps and passionate about learning and solving real-world problems. Seeking internship or entry-level role to contribute technical skills and grow professionally.
            </p>
          </div>
        </div>
      </section>

      <BentoGrid />
    </div>
  );
}
