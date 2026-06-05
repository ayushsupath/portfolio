import { Rocket, Zap, Star, Shield, Globe, Server } from 'lucide-react';

const highlights = [
  {
    icon: <Rocket className="w-8 h-8 text-white" />,
    title: 'Innovation',
    description: 'Always exploring new technologies and pushing boundaries',
    color: 'from-blue-500 to-purple-600'
  },
  {
    icon: <Zap className="w-8 h-8 text-white" />,
    title: 'Performance',
    description: 'Building fast, scalable, and efficient applications',
    color: 'from-green-500 to-teal-600'
  },
  {
    icon: <Star className="w-8 h-8 text-white" />,
    title: 'Quality',
    description: 'Delivering clean, maintainable, and robust code',
    color: 'from-orange-500 to-red-600'
  },
  {
    icon: <Shield className="w-8 h-8 text-white" />,
    title: 'Security',
    description: 'Background in Cloud and Information Security',
    color: 'from-red-500 to-pink-600'
  },
  {
    icon: <Globe className="w-8 h-8 text-white" />,
    title: 'Full Stack',
    description: 'End-to-end web development from frontend to backend',
    color: 'from-cyan-500 to-blue-600'
  },
  {
    icon: <Server className="w-8 h-8 text-white" />,
    title: 'DevOps',
    description: 'AWS cloud deployment with Docker containerization',
    color: 'from-violet-500 to-purple-600'
  }
];

export default function About() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-6 sm:px-3">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl lg:text-7xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent sm:text-3xl">
          About Me
        </h1>
        <p className="text-center text-gray-400 text-lg mb-16 max-w-2xl mx-auto sm:text-base sm:mb-8">
          Get to know more about who I am and what drives me
        </p>

        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 shadow-2xl mb-16 sm:p-5 sm:mb-8">
          <div className="flex items-center justify-center mb-8 sm:mb-4">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-6xl animate-bounce sm:w-20 sm:h-20 sm:text-4xl">
              👨💻
            </div>
          </div>
          <p className="text-xl text-gray-300 leading-relaxed text-center sm:text-base">
            Motivated MCA student at SGSITS with strong skills in full-stack development and a background in Cloud and
            Information Security. Experienced in building scalable web apps and passionate about learning and solving
            real-world problems. I specialize in React.js, Node.js, and modern JavaScript frameworks, with hands-on
            experience in AI tools like Bolt.ai, Cursor.ai, and Lovable.ai. Seeking internship or entry-level role to
            contribute technical skills and grow professionally.
          </p>
        </div>

        <h2 className="text-3xl font-bold text-center text-white mb-10 sm:text-xl sm:mb-5">What I Bring to the Table</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:grid-cols-1 sm:gap-4">
          {highlights.map((item) => (
            <div
              key={item.title}
              className={`bg-gradient-to-br ${item.color} rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 sm:p-4`}
            >
              <div className="mb-4 mx-auto w-fit sm:mb-2">{item.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2 text-center sm:text-base">{item.title}</h3>
              <p className="text-white/80 text-sm text-center">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
