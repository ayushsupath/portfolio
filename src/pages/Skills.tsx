import { Code } from 'lucide-react';

const skills = [
  { name: 'JavaScript', icon: '⚡', color: 'from-yellow-400 to-orange-500', category: 'Programming' },
  { name: 'Java', icon: '☕', color: 'from-red-500 to-orange-600', category: 'Programming' },
  { name: 'Python', icon: '🐍', color: 'from-blue-500 to-yellow-500', category: 'Programming' },
  { name: 'React.js', icon: '⚛️', color: 'from-blue-400 to-cyan-500', category: 'Frontend' },
  { name: 'Next.js', icon: '▲', color: 'from-gray-700 to-gray-900', category: 'Frontend' },
  { name: 'Node.js', icon: '🟢', color: 'from-green-400 to-emerald-500', category: 'Backend' },
  { name: 'Express.js', icon: '🚀', color: 'from-gray-600 to-gray-800', category: 'Backend' },
  { name: 'MongoDB', icon: '🍃', color: 'from-green-500 to-teal-500', category: 'Database' },
  { name: 'MySQL', icon: '🐬', color: 'from-blue-500 to-blue-700', category: 'Database' },
  { name: 'AWS', icon: '☁️', color: 'from-orange-400 to-red-500', category: 'Cloud' },
  { name: 'Docker', icon: '🐳', color: 'from-blue-400 to-blue-600', category: 'DevOps' },
  { name: 'Git', icon: '🔧', color: 'from-purple-500 to-pink-500', category: 'Tools' },
  { name: 'GitHub', icon: '🐙', color: 'from-gray-700 to-gray-900', category: 'Tools' },
  { name: 'Postman', icon: '📮', color: 'from-orange-500 to-orange-700', category: 'Tools' },
  { name: 'VS Code', icon: '💻', color: 'from-indigo-500 to-purple-600', category: 'Tools' },
  { name: 'RESTful APIs', icon: '🔗', color: 'from-teal-500 to-cyan-600', category: 'Core Concepts' },
  { name: 'Responsive Design', icon: '📱', color: 'from-blue-400 to-indigo-500', category: 'Core Concepts' },
  { name: 'Computer Network', icon: '🌐', color: 'from-cyan-500 to-blue-600', category: 'Core Concepts' },
  { name: 'Data Structures', icon: '🏗️', color: 'from-violet-500 to-purple-600', category: 'Core Concepts' },
  { name: 'OOPs', icon: '🧩', color: 'from-pink-500 to-rose-600', category: 'Core Concepts' },
  { name: 'DBMS', icon: '🗄️', color: 'from-amber-500 to-yellow-600', category: 'Core Concepts' },
  { name: 'Bolt.ai', icon: '⚡', color: 'from-yellow-500 to-amber-600', category: 'AI Tools' },
  { name: 'Cursor.ai', icon: '🤖', color: 'from-blue-600 to-indigo-700', category: 'AI Tools' },
  { name: 'Lovable.ai', icon: '💜', color: 'from-fuchsia-500 to-purple-600', category: 'AI Tools' }
];

const categories = ['Programming', 'Frontend', 'Backend', 'Database', 'Cloud', 'DevOps', 'Tools', 'Core Concepts', 'AI Tools'];

export default function Skills() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-6 sm:px-3">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl lg:text-7xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent sm:text-3xl">
          🧠 Technical Skills
        </h1>
        <p className="text-center text-gray-400 text-lg mb-16 max-w-2xl mx-auto sm:text-base sm:mb-8">
          Technologies and tools I work with to build amazing products
        </p>

        {categories.map((category) => {
          const categorySkills = skills.filter(s => s.category === category);
          if (categorySkills.length === 0) return null;
          return (
            <div key={category} className="mb-12 sm:mb-6">
              <h2 className="text-2xl font-bold text-white/80 mb-6 flex items-center gap-3 sm:text-lg sm:mb-3">
                <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full sm:h-5"></div>
                {category}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:grid-cols-2 sm:gap-3">
                {categorySkills.map((skill, index) => (
                  <div
                    key={skill.name}
                    className="group relative transform transition-all duration-500 hover:scale-110"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`bg-gradient-to-br ${skill.color} rounded-2xl p-6 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 relative overflow-hidden sm:p-4`}>
                      <div className="text-center">
                        <div className="text-4xl mb-3 animate-bounce group-hover:animate-pulse sm:text-2xl sm:mb-1">
                          {skill.icon}
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1 sm:text-sm">
                          {skill.name}
                        </h3>
                        <div className="w-full bg-white/20 rounded-full h-1 mt-3 sm:mt-1">
                          <div className="bg-white rounded-full h-1 transition-all duration-1000" style={{width: '90%'}}></div>
                        </div>
                      </div>
                      <div className="absolute top-2 right-2 w-1 h-1 bg-white rounded-full animate-ping"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
