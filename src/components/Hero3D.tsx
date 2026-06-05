import { useEffect, useState } from 'react';

const CUBE_FACES = [
  { className: 'cube-face-front', title: 'CODE', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800' },
  { className: 'cube-face-back', title: 'DESIGN', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800' },
  { className: 'cube-face-left', title: 'SYSTEMS', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800' },
  { className: 'cube-face-right', title: 'DATA', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800' },
  { className: 'cube-face-top', title: 'CLOUD', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800' },
  { className: 'cube-face-bottom', title: 'SECURE', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800' },
];

export default function Hero3D() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-dark-bg">
      {/* Massive Background Text */}
      <div 
        className="absolute w-full text-center whitespace-nowrap opacity-[0.03] font-black text-[50vw] md:text-[40vw] leading-none select-none pointer-events-none"
        style={{ transform: `translateY(${-scrollY * 0.5}px)` }}
      >
        DEV
      </div>

      {/* 3D Cube */}
      <div className="cube-container z-10 scale-75 md:scale-100">
        <div className="cube">
          {CUBE_FACES.map((face, idx) => (
            <div key={idx} className={`cube-face ${face.className} group overflow-hidden border border-white/10 bg-black`}>
              <img 
                src={face.image} 
                alt={face.title}
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-700 scale-105 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700"></div>
              <h2 className="relative z-10 text-2xl md:text-4xl font-bold tracking-widest text-white m-auto drop-shadow-2xl">
                {face.title}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
