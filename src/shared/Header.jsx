import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px' }}>
      <h1>Todo List</h1>
        {isAuthenticated && (
        <button onClick={logout} style={{ cursor: 'pointer', padding: '5px 15px' }}>
          Logout
        </button>
      )}
    </header>
  );
}