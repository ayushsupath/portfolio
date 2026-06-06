import { Briefcase } from 'lucide-react';

const experiences = [
  {
    title: 'Machine Learning Intern',
    company: 'Skillbit Technologies',
    location: 'Remote',
    duration: 'April 2026 – June 2026',
    color: 'from-cyan-500 to-blue-600',
    responsibilities: [
      'Built and deployed ML models including Iris Flower Classifier and Email Spam Detector using Python, scikit-learn, and Pandas under industry mentorship',
      'Gained hands-on experience in data preprocessing, feature engineering, model evaluation, and building Python-based data pipelines for classification tasks'
    ],
    certificateUrl: 'https://drive.google.com/file/d/1nl7SPKRUXeB2yMgDVXiaZUrjegGiiQPk/view?usp=drive_link'
  },
  {
    title: 'Full Stack Web Development Trainer',
    company: 'Angel Wallah',
    location: 'Mhow, India',
    duration: 'July 2024 – January 2025',
    color: 'from-orange-500 to-red-600',
    responsibilities: [
      'Conducted comprehensive workshops on full stack web development, covering both frontend and backend technologies',
      'Designed and facilitated practical, real-world coding projects to reinforce student learning and application'
    ]
  }
];

export default function Experience() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-6 sm:px-3">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl lg:text-7xl font-bold text-center mb-4 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent sm:text-3xl">
          🎯 Experience
        </h1>
        <p className="text-center text-gray-400 text-lg mb-16 max-w-2xl mx-auto sm:text-base sm:mb-8">
          Professional work experience and contributions
        </p>

        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <div key={index} className="relative">
              <div className={`bg-gradient-to-br ${experience.color} rounded-3xl p-10 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 relative overflow-hidden sm:p-5`}>
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 left-4 w-20 h-20 border-2 border-white rounded-full animate-spin-slow"></div>
                  <div className="absolute bottom-4 right-4 w-16 h-16 border-2 border-white rounded-full animate-spin-reverse"></div>
                  <div className="absolute top-1/2 left-1/2 w-24 h-24 border-2 border-white rounded-full animate-pulse"></div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-start mb-8 sm:mb-4 sm:flex-col">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mr-6 flex-shrink-0 sm:mr-0 sm:mb-3 sm:w-12 sm:h-12">
                      <Briefcase className="w-8 h-8 text-white sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-1 sm:text-xl">{experience.title}</h2>
                      <p className="text-white/90 text-xl sm:text-base">{experience.company} | {experience.location}</p>
                      <div className="inline-block bg-white/20 px-4 py-1 rounded-full mt-2 sm:px-2 sm:py-0.5">
                        <p className="text-white/90 text-sm font-medium">{experience.duration}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 sm:space-y-2">
                    <h3 className="text-lg font-semibold text-white/90 mb-3 sm:text-base">Key Responsibilities</h3>
                    {experience.responsibilities.map((responsibility, index2) => (
                      <div key={index2} className="flex items-start space-x-4 bg-white/10 rounded-xl p-4 sm:space-x-2 sm:p-3">
                        <div className="w-3 h-3 bg-white rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
                        <p className="text-white/90 text-lg leading-relaxed sm:text-sm">{responsibility}</p>
                      </div>
                    ))}
                    {experience.certificateUrl && (
                      <div className="mt-4">
                        <a
                          href={experience.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center rounded-full bg-white/10 border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15 hover:text-white"
                        >
                          View Certificate
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Open to opportunities */}
        <div className="mt-12 text-center sm:mt-6">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 inline-block sm:p-4">
            <p className="text-xl text-gray-300 mb-2 sm:text-base">🚀 Currently seeking</p>
            <p className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent sm:text-lg">
              Internship or Entry-Level Roles
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
