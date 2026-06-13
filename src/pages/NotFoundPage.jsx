import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-container-lowest px-margin-mobile">
      <div className="text-center flex flex-col items-center gap-6 animate-fade-up">
        <div className="w-24 h-24 rounded-full bg-surface-container flex items-center justify-center border border-primary/20 mb-2">
          <span className="material-symbols-outlined text-primary" style={{ fontSize: '48px', fontVariationSettings: "'wght' 200" }}>
            explore_off
          </span>
        </div>
        <h2 className="font-display text-[48px] leading-[56px] font-bold text-on-surface neon-text-glow">
          404
        </h2>
        <p className="text-[18px] leading-[28px] text-on-surface-variant max-w-md">
          The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="mt-4 glass-surface border border-primary text-primary font-body text-[14px] leading-[20px] tracking-[0.05em] font-semibold uppercase py-3 px-8 rounded-full hover:bg-primary/10 transition-all duration-300 icon-glow"
        >
          Return to Main Page
        </Link>
      </div>
    </div>
  );
}