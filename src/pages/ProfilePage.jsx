import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import profileavatar from "../assets/profile-avatar.png";

export default function ProfilePage() {
  const { email, token } = useAuth();

  const [stats, setStats] = useState({ total: 0, completed: 0, active: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const completionRate = useMemo(() => {
    if (stats.total === 0) return 0;
    return Math.round((stats.completed / stats.total) * 100);
  }, [stats]);

  const rateLabel = useMemo(() => {
    if (completionRate >= 80) return 'Excellent';
    if (completionRate >= 60) return 'On Track';
    if (completionRate >= 40) return 'In Progress';
    return 'Getting Started';
  }, [completionRate]);

  useEffect(() => {
    if (!token) return;

    async function fetchStats() {
      try {
        setIsLoading(true);
        setError('');

        const response = await fetch('/api/tasks', {
          method: 'GET',
          headers: {
            'X-CSRF-TOKEN': token,
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch statistics');
        }

        const data = await response.json();
        const tasks = data.tasks || [];

        const total = tasks.length;
        const completed = tasks.filter((task) => task.isCompleted).length;
        const active = total - completed;

        setStats({ total, completed, active });
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, [token]);

  return (
    <div className="bg-background text-on-surface font-body min-h-screen selection:bg-primary-container selection:text-on-primary-container relative overflow-x-hidden">
      {/* Ambient Glow */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary rounded-full blur-[150px] opacity-10 pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px] opacity-5 pointer-events-none z-0" />

      {/* Main Content Canvas */}
      <main className="relative z-10 pt-32 pb-24 px-margin-mobile md:px-margin-desktop max-w-[1200px] mx-auto flex flex-col gap-gutter">
        {/* Header */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 animate-fade-up">
          <div>
            <h1 className="font-display text-[48px] leading-[56px] tracking-[-0.02em] font-bold text-on-surface mb-2">
              User Profile
            </h1>
            <p className="text-[18px] leading-[28px] text-on-surface-variant flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary icon-glow inline-block" />
              Welcome back,{' '}
              <span className="font-bold text-primary">{email || 'User'}</span>
            </p>
          </div>
          <div className="ritual-card p-4 rounded-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-primary icon-glow">
              <img
                alt="User Avatar"
                className="w-full h-full object-cover"
                src={profileavatar}
              />
            </div>
            <div>
              <p className="font-display text-[24px] leading-[32px] font-semibold text-on-surface leading-tight">
                {email || 'User'}
              </p>
              <p className="font-body text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-on-surface-variant uppercase">
                Engineer
              </p>
            </div>
          </div>
        </header>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-24 gap-3">
            <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            <span className="text-[14px] tracking-[0.05em] font-semibold text-primary uppercase">
              Loading statistics...
            </span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="glass-panel rounded-lg p-4 flex items-center gap-3 animate-fade-up">
            <span
              className="material-symbols-outlined text-error"
              style={{ fontSize: '20px' }}
            >
              error
            </span>
            <span className="text-error text-[14px]">{error}</span>
          </div>
        )}

        {/* Stats Grid (Bento Style) */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter auto-rows-[minmax(180px,auto)] animate-fade-up-delay-1">
            {/* Large Card: Todo Statistics */}
            <div className="ritual-card rounded-xl p-8 md:col-span-8 flex flex-col justify-between group">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="font-display text-[32px] leading-[40px] font-semibold text-on-surface mb-1">
                    Your Todo Statistics
                  </h2>
                  <p className="text-[16px] leading-[24px] text-on-surface-variant">
                    Ritual completion rate for this cycle.
                  </p>
                </div>
                <span
                  className="material-symbols-outlined text-primary text-4xl group-hover:icon-glow transition-all"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  data_usage
                </span>
              </div>
              <div className="mt-auto">
                <div className="flex justify-between items-end mb-4">
                  <span className="font-display text-[48px] leading-[56px] tracking-[-0.02em] font-bold text-primary drop-shadow-[0_0_8px_#ffb3b5]">
                    {completionRate}%
                  </span>
                  <span className="font-body text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-tertiary-fixed">
                    {rateLabel}
                  </span>
                </div>
                <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full icon-glow transition-all duration-1000 ease-out"
                    style={{ width: `${completionRate}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Square Card: Total Todos */}
            <div className="ritual-card rounded-xl p-8 md:col-span-4 flex flex-col items-center justify-center text-center group">
              <span
                className="material-symbols-outlined text-outline-variant text-5xl mb-4 group-hover:text-primary group-hover:icon-glow transition-all"
              >
                library_books
              </span>
              <h3 className="font-display text-[24px] leading-[32px] font-semibold text-on-surface mb-2">
                Total Todos
              </h3>
              <span className="font-display text-[48px] leading-[56px] tracking-[-0.02em] font-bold text-on-surface">
                {stats.total}
              </span>
            </div>

            {/* Small Card 1: Completed */}
            <div className="ritual-card rounded-xl p-6 md:col-span-6 flex items-center justify-between group cursor-pointer">
              <div>
                <h3 className="text-[18px] leading-[28px] text-on-surface-variant mb-1">
                  Tasks Completed
                </h3>
                <span className="font-display text-[32px] leading-[40px] font-semibold text-tertiary">
                  {stats.completed}
                </span>
              </div>
              <div className="w-12 h-12 rounded-full bg-tertiary/10 border border-tertiary/30 flex items-center justify-center group-hover:border-tertiary group-hover:shadow-[0_0_10px_rgba(101,220,171,0.5)] transition-all">
                <span className="material-symbols-outlined text-tertiary">
                  task_alt
                </span>
              </div>
            </div>

            {/* Small Card 2: Active */}
            <div className="ritual-card rounded-xl p-6 md:col-span-6 flex items-center justify-between group cursor-pointer">
              <div>
                <h3 className="text-[18px] leading-[28px] text-on-surface-variant mb-1">
                  Active Tasks
                </h3>
                <span className="font-display text-[32px] leading-[40px] font-semibold text-primary">
                  {stats.active}
                </span>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:border-primary group-hover:shadow-[0_0_10px_rgba(255,179,181,0.5)] transition-all">
                <span className="material-symbols-outlined text-primary">
                  bolt
                </span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
