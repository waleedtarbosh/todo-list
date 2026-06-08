import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function ProfilePage() {
  const { email, token } = useAuth();
  
  const [stats, setStats] = useState({ total: 0, completed: 0, active: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

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
        const completed = tasks.filter(task => task.isCompleted).length;
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
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>User Profile</h2>
      <p style={{ fontSize: '1.1rem' }}>
        <strong>Logged in as:</strong> <span style={{ color: '#0056b3' }}>{email}</span>
      </p>

      <div style={{ 
        marginTop: '30px', 
        padding: '20px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px',
        border: '1px solid #ddd'
      }}>
        <h3 style={{ marginTop: 0, borderBottom: '2px solid #ccc', paddingBottom: '10px' }}>
          Your Todo Statistics 📊
        </h3>
        
        {isLoading && <p>Loading your stats... ⏳</p>}
        
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        
        {!isLoading && !error && (
          <ul style={{ 
            listStyle: 'none', 
            padding: 0, 
            fontSize: '1.2rem', 
            lineHeight: '2' 
          }}>
            <li>📝 <strong>Total Todos:</strong> {stats.total}</li>
            <li>✅ <strong>Completed:</strong> <span style={{ color: 'green' }}>{stats.completed}</span></li>
            <li>⏳ <strong>Active:</strong> <span style={{ color: 'orange' }}>{stats.active}</span></li>
          </ul>
        )}
      </div>
    </div>
  );
}