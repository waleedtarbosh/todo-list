import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

function HomePage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/todos', { replace: true });
    } else {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-container-lowest pt-24">
      <div className="flex flex-col items-center gap-4 animate-fade-up">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin glow-sm" />
        <p className="text-primary font-display text-[14px] font-semibold tracking-widest uppercase">
          Redirecting...
        </p>
      </div>
    </div>
  );
}

export default HomePage;