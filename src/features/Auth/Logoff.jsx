import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';

export default function Logoff({ mobile = false, onNavigate }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const [isLoggingOff, setIsLoggingOff] = useState(false);
  const [error, setError] = useState('');

  async function handleLogoff() {
    setIsLoggingOff(true);
    setError('');
    
    const result = await logout();
    
    if (result.success) {
      if (onNavigate) onNavigate();
      navigate('/login');
    } else {
      setError(result.error);
      setIsLoggingOff(false);
    }
  }

  if (mobile) {
    return (
      <div className="border-t border-outline-variant/30 pt-4 mt-2">
        {error && (
          <span className="text-error text-xs block mb-2">{error}</span>
        )}
        <button
          onClick={handleLogoff}
          disabled={isLoggingOff}
          className="flex items-center gap-3 w-full font-body text-lg text-on-surface-variant hover:text-primary transition-colors duration-300 py-3 px-4 rounded-lg hover:bg-primary/10 disabled:opacity-50"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
            logout
          </span>
          <span>{isLoggingOff ? 'Logging off...' : 'Logout'}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="hidden md:flex items-center gap-3">
      {error && (
        <span className="text-error text-xs">{error}</span>
      )}
      <button
        onClick={handleLogoff}
        disabled={isLoggingOff}
        className="flex items-center gap-2 font-body text-[14px] leading-[20px] tracking-[0.05em] font-semibold uppercase text-on-surface-variant hover:text-primary transition-colors active:scale-95 duration-300 disabled:opacity-50"
      >
        <span>{isLoggingOff ? 'Logging off...' : 'Logout'}</span>
        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
          logout
        </span>
      </button>
    </div>
  );
}