import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';

export default function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location }, replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-container-lowest">
        <div className="flex flex-col items-center gap-4 animate-fade-up">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin glow-sm" />
          <p className="text-primary font-display text-[14px] font-semibold tracking-widest uppercase">
            Redirecting to Login...
          </p>
        </div>
      </div>
    );
  }

  return children;
}