import { Bot, Code, Globe, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'Smart Resume Builder + AI Analyzer',
    description: 'A comprehensive resume builder with AI-powered features. Built using React.js, Node.js, Express.js, MySQL, and Groq AI (LLaMA 3.3). Deployed on Vercel and Render.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MySQL', 'Groq AI'],
    color: 'from-purple-500 to-pink-500',
    icon: <Bot className="w-10 h-10" />,
    details: [
      'Integrated AI-powered Resume Improver, ATS Score Checker, and PDF Resume Analyzer.',
      'Supports JWT authentication and PDF download.',
      'Dark mode and fully responsive design for all devices.'
    ]
  },
  {
    title: 'CodeJamm - Java Learning Platform',
    description: 'An interactive platform for learning Java, featuring an in-browser compiler with timeout protection and a sandboxed execution environment. 100+ categorized Java programs.',
    tech: ['Java', 'Spring Boot 3.2', 'MySQL', 'Spring Data JPA/Hibernate'],
    color: 'from-orange-500 to-red-500',
    icon: <Code className="w-10 h-10" />,
    details: [
      'Integrated an in-browser Java compiler using Java Compiler Service.',
      'RESTful APIs with 20+ endpoints.',
      'Live code editor using Monaco Editor (VS Code in browser).'
    ]
  },
  {
    title: 'Portfolio Website',
    description: 'A personal portfolio built using React.js and Vite, with automated deployment on Vercel. Features interactive 3D cartoon-style animations and a fully responsive layout.',
    tech: ['React.js', 'Vite', 'Vercel', 'Tailwind CSS'],
    color: 'from-cyan-500 to-blue-500',
    icon: <Globe className="w-10 h-10" />,
    details: [
      'Interactive 3D cartoon-style animations',
      'Fully responsive layout for all devices',
      'Includes direct integration with GitHub, LinkedIn, and Vercel link.'
    ]
  }
];

export default function Projects() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-6 sm:px-3">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl lg:text-7xl font-bold text-center mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent sm:text-3xl">
          Featured Projects
        </h1>
        <p className="text-center text-gray-400 text-lg mb-16 max-w-2xl mx-auto sm:text-base sm:mb-8">
          A selection of projects I've built and contributed to
        </p>

        <div className="space-y-10 sm:space-y-5">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group relative transform transition-all duration-700 hover:scale-[1.02]"
            >
              <div className={`bg-gradient-to-br ${project.color} rounded-3xl p-10 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 relative overflow-hidden sm:p-5`}>
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 left-4 w-20 h-20 border-2 border-white rounded-full animate-spin-slow"></div>
                  <div className="absolute bottom-4 right-4 w-16 h-16 border-2 border-white rounded-full animate-spin-reverse"></div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-start gap-5 mb-6 sm:flex-col sm:mb-3">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0 text-white sm:w-12 sm:h-12">
                      {project.icon}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-2 sm:text-xl">{project.title}</h2>
                      <p className="text-white/90 text-lg leading-relaxed sm:text-sm">{project.description}</p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="grid md:grid-cols-3 gap-3 mb-6 sm:grid-cols-1 sm:gap-2 sm:mb-3">
                    {project.details.map((detail, idx) => (
                      <div key={idx} className="bg-white/10 rounded-xl p-3 flex items-start gap-2">
                        <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-white/90 text-sm">{detail}</p>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-1.5 bg-white/20 rounded-full text-sm font-medium text-white border border-white/30 sm:px-2 sm:py-0.5 sm:text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
