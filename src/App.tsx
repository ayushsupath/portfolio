import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import About from './pages/About';
import Experience from './pages/Experience';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Education from './pages/Education';
import Certifications from './pages/Certifications';
import Contact from './pages/Contact';

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-dark-bg text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl text-gray-400 mb-8">Page Not Found</p>
      <a href="/" className="px-6 py-3 bg-lime-neon text-slate-900 font-bold rounded-lg hover:bg-lime-neon/90 transition">
        Back to Home
      </a>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="experience" element={<Experience />} />
            <Route path="skills" element={<Skills />} />
            <Route path="projects" element={<Projects />} />
            <Route path="education" element={<Education />} />
            <Route path="certifications" element={<Certifications />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;