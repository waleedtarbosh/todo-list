import { Link } from 'react-router';
import aboutHero from "../assets/about-hero.png";
export default function AboutPage() {
  return (
    <div className="bg-background text-on-background font-body antialiased min-h-screen flex flex-col relative overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">
      {/* Background Radial Glow */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,45,85,0.08)_0%,rgba(18,20,20,0)_70%)]" />

      {/* Main Canvas */}
      <main className="flex-grow z-10 pt-24 pb-16 px-margin-mobile md:px-margin-desktop w-full max-w-[1200px] mx-auto flex flex-col gap-16">
        {/* ===== Hero Section ===== */}
        <section className="flex flex-col md:flex-row items-center gap-12 pt-8 animate-fade-up">
          <div className="flex-1 flex flex-col gap-6 text-center md:text-left">
            <h2 className="font-display text-[48px] leading-[56px] tracking-[-0.02em] font-bold text-on-background">
              The Ritual of{' '}
              <span className="text-primary icon-glow">Accomplishment</span>
            </h2>
            <p className="text-[18px] leading-[28px] text-on-surface-variant max-w-2xl">
              TaskRitual elevates daily management into a profound,
              high-performance experience. Designed with obsessive precision, it
              merges the mysterious allure of nocturnal aesthetics with the
              rigorous order needed for mastery over your tasks.
            </p>
            <div className="mt-4">
              <Link
                to="/login"
                className="glass-surface border border-primary text-primary font-body text-[14px] leading-[20px] tracking-[0.05em] font-semibold uppercase py-3 px-8 rounded-full hover:bg-primary/10 transition-all duration-300 active:scale-95 icon-glow inline-block"
              >
                Begin the Ritual
              </Link>
            </div>
          </div>
          <div className="flex-1 w-full relative">
            {/* Ambient glow behind image */}
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full opacity-50" />
            <img
              alt="A sleek, high-contrast workspace bathed in moody, nocturnal lighting"
              className="w-full h-[400px] object-cover rounded-xl glass-surface border border-primary/30 relative z-10"
              src={aboutHero}
            />
          </div>
        </section>

        {/* ===== Divider ===== */}
        <div className="divider-neon" />

        {/* ===== Core Capabilities Section ===== */}
        <section className="flex flex-col gap-10 animate-fade-up-delay-1">
          <h3 className="font-display text-[32px] leading-[40px] font-semibold text-center text-on-surface">
            Core Capabilities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Secure Authentication */}
            <div className="glass-surface p-8 rounded-xl neon-card flex flex-col items-center text-center gap-4 group">
              <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center border border-primary/20 group-hover:border-primary/50 transition-colors">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontSize: '32px', fontVariationSettings: "'wght' 200" }}
                >
                  lock
                </span>
              </div>
              <h4 className="font-display text-[24px] leading-[32px] font-semibold text-on-surface">
                Secure Authentication
              </h4>
              <p className="text-[16px] leading-[24px] text-on-surface-variant">
                Impenetrable, encrypted access ensuring your rituals remain
                strictly confidential.
              </p>
            </div>

            {/* Card 2: Fluid Task Management */}
            <div className="glass-surface p-8 rounded-xl neon-card flex flex-col items-center text-center gap-4 group">
              <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center border border-primary/20 group-hover:border-primary/50 transition-colors">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontSize: '32px', fontVariationSettings: "'wght' 200" }}
                >
                  water_drop
                </span>
              </div>
              <h4 className="font-display text-[24px] leading-[32px] font-semibold text-on-surface">
                Fluid Task Management
              </h4>
              <p className="text-[16px] leading-[24px] text-on-surface-variant">
                Seamless creation, updating, and completion mechanics that flow
                like liquid light.
              </p>
            </div>

            {/* Card 3: Precision Filtering */}
            <div className="glass-surface p-8 rounded-xl neon-card flex flex-col items-center text-center gap-4 group">
              <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center border border-primary/20 group-hover:border-primary/50 transition-colors">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontSize: '32px', fontVariationSettings: "'wght' 200" }}
                >
                  filter_alt
                </span>
              </div>
              <h4 className="font-display text-[24px] leading-[32px] font-semibold text-on-surface">
                Precision Filtering
              </h4>
              <p className="text-[16px] leading-[24px] text-on-surface-variant">
                Surgical organization tools to isolate signal from noise in your
                daily operations.
              </p>
            </div>
          </div>
        </section>

        {/* ===== Tech Stack Section ===== */}
        <section className="flex flex-col items-center gap-8 py-12 animate-fade-up-delay-2">
          <h3 className="font-display text-[32px] leading-[40px] font-semibold text-on-surface text-center">
            The Architecture
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {/* React */}
            <div className="px-6 py-3 glass-surface border border-surface-variant rounded-lg flex items-center gap-3">
              <span
                className="material-symbols-outlined text-tertiary"
                style={{ fontSize: '24px' }}
              >
                code_blocks
              </span>
              <span className="font-body text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-on-surface">
                REACT
              </span>
            </div>

            {/* Tailwind CSS */}
            <div className="px-6 py-3 glass-surface border border-surface-variant rounded-lg flex items-center gap-3">
              <span
                className="material-symbols-outlined text-[#38bdf8]"
                style={{ fontSize: '24px' }}
              >
                css
              </span>
              <span className="font-body text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-on-surface">
                TAILWIND CSS
              </span>
            </div>

            {/* Vite */}
            <div className="px-6 py-3 glass-surface border border-surface-variant rounded-lg flex items-center gap-3">
              <span
                className="material-symbols-outlined text-[#a855f7]"
                style={{ fontSize: '24px' }}
              >
                bolt
              </span>
              <span className="font-body text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-on-surface">
                VITE
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* ===== Footer ===== */}
      <footer className="bg-surface-container-lowest w-full py-12 border-t border-primary/10 z-10 relative">
        <div className="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop gap-gutter max-w-[1200px] mx-auto">
          <div className="font-display text-[20px] leading-[28px] font-semibold text-primary">
            TaskRitual
          </div>
          <div className="font-body text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-primary opacity-80 hover:opacity-100 transition-opacity text-center md:text-left">
            © 2026 TaskRitual | Crafted by Waleed Tarbosh.
          </div>
        </div>
      </footer>
    </div>
  );
}