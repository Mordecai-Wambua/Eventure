import { NavLink } from 'react-router-dom';

export default function Navigation() {
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="container mx-auto mt-2">
      <ul className="flex space-x-6">
        {navLinks.map((link, index) => (
          <li key={index}>
            <NavLink
              to={link.path}
              className="text-gray-700 hover:text-blue-500"
              activeClassName="font-bold text-blue-700"
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
