import { NavLink } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

export default function Navigation() {
  const { isAuthenticated } = useAuth();

  const linkBase =
    'font-body text-base text-on-surface-variant hover:text-primary transition-colors hover:bg-primary/10 duration-300 px-3 py-1 rounded-md';
  const linkActive =
    'font-body text-base text-primary font-bold border-b-2 border-primary pb-1 px-3 py-1';

  return (
    <nav className="hidden md:flex gap-8 items-center">
      {isAuthenticated ? (
        <>
          <NavLink
            to="/todos"
            className={({ isActive }) => (isActive ? linkActive : linkBase)}
          >
            Todos
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? linkActive : linkBase)}
          >
            About
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? linkActive : linkBase)}
          >
            Profile
          </NavLink>
        </>
      ) : (
        <>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? linkActive : linkBase)}
          >
            About
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? linkActive : linkBase)}
          >
            Login
          </NavLink>
        </>
      )}
    </nav>
  );
}