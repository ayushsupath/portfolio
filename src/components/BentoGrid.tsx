const PROJECTS = [
  {
    id: 1,
    title: 'AI Chat Interface',
    category: 'Full Stack',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
    aspect: 'aspect-video', // 16:9
    colSpan: 'md:col-span-2',
  },
  {
    id: 2,
    title: 'Cloud Dashboard',
    category: 'Frontend',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    aspect: 'aspect-square md:aspect-auto', // 1:1 on mobile, auto on desktop within grid
    colSpan: 'col-span-1',
  },
  {
    id: 3,
    title: 'Security Analysis Tool',
    category: 'Backend',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
    aspect: 'aspect-[4/3] md:aspect-auto', // 4:3 on mobile
    colSpan: 'col-span-1',
  },
  {
    id: 4,
    title: 'E-Commerce Platform',
    category: 'Full Stack',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200',
    aspect: 'aspect-video', // 16:9
    colSpan: 'md:col-span-2',
  },
];

export default function BentoGrid() {
  return (
    <section className="w-full bg-dark-bg px-4 md:px-8 py-16 md:py-24 z-20 relative">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-display font-black mb-8 md:mb-16 tracking-tighter uppercase text-center md:text-left">Selected Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[400px]">
          {PROJECTS.map((project) => (
            <div 
              key={project.id} 
              className={`group relative overflow-hidden rounded-xl bg-zinc-900 ${project.colSpan} h-full`}
            >
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 md:opacity-80 transition-opacity group-hover:opacity-100"></div>
              <img 
                src={project.image} 
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700 ease-out md:grayscale group-hover:grayscale-0"
              />
              
              <div className="absolute bottom-0 left-0 p-6 md:p-8 z-20 w-full transform translate-y-0 md:translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-lime-neon text-xs md:text-sm font-bold tracking-widest uppercase mb-1 md:mb-2">
                  {project.category}
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-white inline-block">
                  <span className="md:neon-underline cursor-pointer">{project.title}</span>
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
