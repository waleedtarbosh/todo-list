import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

export default function Logoff() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const [isLoggingOff, setIsLoggingOff] = useState(false);
  const [error, setError] = useState('');

  async function handleLogoff() {
    setIsLoggingOff(true);
    setError('');
    
    const result = await logout();
    
    if (result.success) {
      navigate('/login');
    } else {
      setError(result.error);
      setIsLoggingOff(false);
    }
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