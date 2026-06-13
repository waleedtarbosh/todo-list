import { NavLink } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

export default function Navigation({ mobile = false, onNavigate }) {
  const { isAuthenticated } = useAuth();

  const handleClick = () => {
    if (onNavigate) onNavigate();
  };

  // Desktop styles
  const linkBase =
    'font-body text-base text-on-surface-variant hover:text-primary transition-colors hover:bg-primary/10 duration-300 px-3 py-1 rounded-md';
  const linkActive =
    'font-body text-base text-primary font-bold border-b-2 border-primary pb-1 px-3 py-1';

  // Mobile styles
  const mobileLinkBase =
    'font-body text-lg text-on-surface-variant hover:text-primary transition-colors duration-300 py-3 px-4 rounded-lg hover:bg-primary/10';
  const mobileLinkActive =
    'font-body text-lg text-primary font-bold py-3 px-4 rounded-lg bg-primary/10';

  const base = mobile ? mobileLinkBase : linkBase;
  const active = mobile ? mobileLinkActive : linkActive;

  const links = isAuthenticated
    ? [
        { to: '/todos', label: 'Todos' },
        { to: '/about', label: 'About' },
        { to: '/profile', label: 'Profile' },
      ]
    : [
        { to: '/about', label: 'About' },
        { to: '/login', label: 'Login' },
      ];

  return (
    <nav
      className={
        mobile
          ? 'flex flex-col gap-1'
          : 'hidden md:flex gap-8 items-center'
      }
    >
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          onClick={handleClick}
          className={({ isActive }) => (isActive ? active : base)}
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}