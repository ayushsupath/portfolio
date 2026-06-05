import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import CinematicNavbar from './CinematicNavbar';
import EditorialFooter from './EditorialFooter';
import SimpleFooter from './SimpleFooter';

export default function Layout() {
  const location = useLocation();

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const showFooter = ['/', '/contact', '/projects'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-dark-bg text-white overflow-x-hidden flex flex-col font-sans selection:bg-lime-neon selection:text-black">
      <CinematicNavbar />

      {/* Page Content */}
      <main className="relative z-10 flex-1 w-full">
        <Outlet />
      </main>

      {showFooter ? <EditorialFooter /> : <SimpleFooter />}
    </div>
  );
}
