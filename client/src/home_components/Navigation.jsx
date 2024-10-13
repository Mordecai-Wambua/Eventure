import { NavLink } from 'react-router-dom';
import { Link } from 'react-scroll';

export default function Navigation() {
  const navLinks = [
    { name: 'Events', path: '/' },
    { name: 'FAQ', path: 'faq-section', isScroll: true },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="container mx-auto px-4 lg:px-10 md:mt-4 mt-2">
      <ul className="flex space-x-3 md:space-x-6 justify-center md:justify-start">
        {navLinks.map((link, index) => (
          <li key={index}>
            {link.isScroll ? (
              <Link
                to={link.path}
                smooth={true}
                offset={0}
                duration={1000}
                className="text-gray-700 cursor-pointer no-underline hover:text-blue-500 transition duration-300"
              >
                {link.name}
              </Link>
            ) : (
              <NavLink
                to={link.path}
                className="text-gray-700 no-underline hover:text-blue-500 transition duration-300"
                activeClassName="font-bold text-blue-700"
              >
                {link.name}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
