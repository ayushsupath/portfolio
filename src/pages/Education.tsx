const education = [
  {
    degree: 'Master of Computer Applications (MCA)',
    institution: 'SGSITS, Indore, MP',
    status: '2025 – Present',
    color: 'from-blue-500 to-purple-600',
    icon: '🎓'
  },
  {
    degree: 'Bachelor of Science (B.Sc.) in Computer Science',
    institution: 'Medi-Caps University, Rau, Indore, MP',
    status: '2021 – 2025 | CGPA: 7.09',
    color: 'from-green-500 to-blue-500',
    icon: '📚'
  },
  {
    degree: '12th Class (Higher Secondary)',
    institution: 'Rajeswar Hr. Sec School, Mhow, Indore, MP',
    status: '2020 – 2021 | 63.4%',
    color: 'from-orange-500 to-amber-500',
    icon: '🏫'
  },
  {
    degree: '10th Class (Secondary)',
    institution: 'Rajeswar Hr. Sec School, Mhow, Indore, MP',
    status: '2018 – 2019 | 64.4%',
    color: 'from-teal-500 to-cyan-500',
    icon: '📖'
  }
];

export default function Education() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-6 sm:px-3">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl lg:text-7xl font-bold text-center mb-4 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent sm:text-3xl">
          🎓 Education
        </h1>
        <p className="text-center text-gray-400 text-lg mb-16 max-w-2xl mx-auto sm:text-base sm:mb-8">
          My academic journey and qualifications
        </p>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-blue-500 to-teal-500 hidden md:block"></div>

          <div className="space-y-10 sm:space-y-5">
            {education.map((edu) => (
              <div
                key={edu.degree}
                className="group relative md:pl-24 transform transition-all duration-700 hover:scale-[1.02]"
              >
                {/* Timeline dot */}
                <div className="absolute left-6 top-8 w-5 h-5 bg-white rounded-full border-4 border-purple-500 z-10 hidden md:block group-hover:scale-150 transition-transform"></div>

                <div className={`bg-gradient-to-br ${edu.color} rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 relative overflow-hidden sm:p-5`}>
                  <div className="absolute top-4 right-4">
                    <GraduationCap className="w-8 h-8 text-white/80 animate-pulse" />
                  </div>

                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 left-4 w-20 h-20 border-2 border-white rounded-full animate-spin-slow"></div>
                  </div>

                  <div className="relative z-10">
                    <div className="text-4xl mb-3 sm:text-2xl">{edu.icon}</div>
                    <h2 className="text-2xl font-bold text-white mb-2 sm:text-lg">{edu.degree}</h2>
                    <p className="text-white/90 text-lg mb-1 sm:text-base">{edu.institution}</p>
                    <p className="text-white/80 text-md font-semibold sm:text-sm">{edu.status}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
