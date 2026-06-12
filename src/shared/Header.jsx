import Navigation from './Navigation';
import Logoff from '../features/Logoff';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router';

export default function Header() {
  const { isAuthenticated } = useAuth();

  return (
    <header className="bg-surface/60 backdrop-blur-xl fixed top-0 w-full z-50 border-b border-primary/20 shadow-[0_0_15px_rgba(255,45,85,0.1)]">
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 max-w-[1200px] mx-auto">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-inverse-primary rounded-[8px] flex items-center justify-center icon-glow">
            <span
              className="material-symbols-outlined text-white"
              style={{ fontSize: '20px' }}
            >
              checklist
            </span>
          </div>
          <h1 className="font-display text-[24px] leading-[32px] tracking-tighter text-primary font-bold">
            TaskRitual
          </h1>
        </Link>

        {/* Navigation */}
        <Navigation />

        {/* Auth Action */}
        {isAuthenticated && <Logoff />}

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-primary">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </header>
  );
}