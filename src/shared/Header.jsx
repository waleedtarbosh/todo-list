import Navigation from './Navigation';
import Logoff from '../features/Logoff';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const { isAuthenticated } = useAuth();

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', borderBottom: '1px solid #ccc' }}>
      <h1>Todo List</h1>
      
      <Navigation />

      {isAuthenticated && <Logoff />}
    </header>
  );
}