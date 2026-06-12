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
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      {error && <span style={{ color: 'red', fontSize: '0.8rem' }}>{error}</span>}
      <button 
        onClick={handleLogoff} 
        disabled={isLoggingOff} 
        style={{ cursor: 'pointer', padding: '5px 15px' }}
      >
        {isLoggingOff ? 'Logging off...' : 'Logout'}
      </button>
    </div>
  );
}