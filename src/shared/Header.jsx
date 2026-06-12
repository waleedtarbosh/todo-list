import { useState } from 'react';
import Navigation from './Navigation';
import Logoff from '../features/Logoff';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router';

export default function Header() {
  const { isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-surface/60 backdrop-blur-xl fixed top-0 w-full z-50 border-b border-primary/20 shadow-[0_0_15px_rgba(255,45,85,0.1)]">
        <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 max-w-[1200px] mx-auto">
          {/* Brand */}
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

          {/* Desktop Navigation */}
          <Navigation />

          {/* Desktop Auth Action */}
          {isAuthenticated && <Logoff />}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-primary p-2 z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div className="absolute top-[72px] left-0 right-0 bg-surface-container border-b border-primary/20 shadow-[0_10px_30px_rgba(255,45,85,0.15)] p-6 flex flex-col gap-4 animate-fade-up">
            <Navigation mobile onNavigate={() => setMobileMenuOpen(false)} />
            {isAuthenticated && (
              <Logoff mobile onNavigate={() => setMobileMenuOpen(false)} />
            )}
          </div>
        </div>
      )}
    </>
  );
}