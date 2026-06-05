import { Mail, Phone, MapPin, Github, Linkedin, Send } from 'lucide-react';

const contactItems = [
  {
    icon: <Mail className="w-8 h-8 text-white" />,
    title: 'Email',
    value: 'ayushsupath1829@gmail.com',
    href: 'mailto:ayushsupath1829@gmail.com',
    color: 'from-blue-500 to-purple-600'
  },
  {
    icon: <Phone className="w-8 h-8 text-white" />,
    title: 'Phone',
    value: '+91 8718801591',
    href: 'tel:+918718801591',
    color: 'from-green-500 to-teal-600'
  },
  {
    icon: <MapPin className="w-8 h-8 text-white" />,
    title: 'Location',
    value: 'Indore, India',
    href: '#',
    color: 'from-red-500 to-pink-600'
  }
];

const socials = [
  {
    icon: <Github className="w-6 h-6" />,
    label: 'GitHub',
    href: 'https://github.com/InsaanAyu',
    color: 'hover:text-purple-300'
  },
  {
    icon: <Linkedin className="w-6 h-6" />,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/ayushsupath',
    color: 'hover:text-blue-300'
  }
];

export default function Contact() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-6 sm:px-3">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl lg:text-7xl font-bold text-center mb-4 bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent sm:text-3xl">
          Let's Connect
        </h1>
        <p className="text-center text-gray-400 text-lg mb-16 max-w-2xl mx-auto sm:text-base sm:mb-8">
          Feel free to reach out for opportunities, collaborations, or just to say hi!
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-12 sm:grid-cols-1 sm:gap-4 sm:mb-6">
          {contactItems.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="group bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-center block sm:p-5"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce sm:w-12 sm:h-12 sm:mb-2`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2 sm:text-base sm:mb-1">{item.title}</h3>
              <p className="text-gray-300 sm:text-sm">{item.value}</p>
            </a>
          ))}
        </div>

        {/* Social Links */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 shadow-2xl text-center sm:p-5">
          <h2 className="text-2xl font-bold text-white mb-6 sm:text-lg sm:mb-3">Find me on</h2>
          <div className="flex justify-center space-x-6 mb-8 sm:space-x-4 sm:mb-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-14 h-14 bg-white/10 rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110 text-white ${social.color} sm:w-11 sm:h-11`}
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>

          <a
            href="mailto:ayushsupath1829@gmail.com"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-bold text-lg transform transition-all duration-300 hover:scale-110 hover:shadow-lg sm:px-5 sm:py-2 sm:text-base"
          >
            <Send className="w-5 h-5" />
            <span>Get In Touch</span>
          </a>
        </div>
      </div>
    </div>
  );
}
