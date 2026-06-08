import { useAuth } from '../contexts/AuthContext';

export default function ProfilePage() {
  const { email } = useAuth();

  return (
    <div style={{ padding: '20px' }}>
      <h2>User Profile</h2>
      <p><strong>Logged in as:</strong> {email}</p>
      
      <div style={{ marginTop: '20px' }}>
        <h3>Todo Statistics</h3>
        <p>Loading statistics... (Will be implemented in Part 6)</p>
      </div>
    </div>
  );
}