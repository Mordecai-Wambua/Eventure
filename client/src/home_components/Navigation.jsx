import { NavLink } from 'react-router-dom';
import { Link } from 'react-scroll';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navigation() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null); // Reference to the menu for click detection

  const navLinks = [
    { name: 'Events', path: '/events' },
    { name: 'FAQ', path: 'faq-section', isScroll: true },
    { name: 'Contact', path: '/contact' },
  ];

  const handleSignIn = () => {
    console.log('Sign In clicked!');
    navigate('/login');
    setIsMenuOpen(false); // Close menu on Sign In
  };

  const handleCreateEvent = () => {
    console.log('Create Event clicked');
    navigate('/register');
    setIsMenuOpen(false); // Close menu on Get Started
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu visibility
  };

  // Close menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Clean up the event listener on component unmount
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className='container mx-auto px-4 lg:px-10 md:mt-4 mt-2 flex items-center justify-between'>
      {/* Hamburger Menu for Small Screens */}
      <div className='md:hidden flex items-center absolute right-2 border p-2 rounded-md'>
        <button onClick={toggleMenu} className='text-black focus:outline-none'>
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16m-7 6h7'
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div
            ref={menuRef} // Attach ref to the menu
            className='absolute right-0 mt-36 w-48 bg-white rounded-md shadow-lg z-10'
          >
            <ul className='py-2'>
              {navLinks.map((link, index) => (
                <li key={index}>
                  {link.isScroll ? (
                    <Link
                      to={link.path}
                      smooth={true}
                      offset={0}
                      duration={1000}
                      onClick={() => setIsMenuOpen(false)} // Close menu on item click
                      className='block px-4 py-2 text-black hover:bg-gray-100'
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <NavLink
                      to={link.path}
                      onClick={() => setIsMenuOpen(false)} // Close menu on item click
                      className='block px-4 py-2 text-black hover:bg-gray-100'
                    >
                      {link.name}
                    </NavLink>
                  )}
                </li>
              ))}
              <li>
                <button
                  onClick={handleSignIn}
                  className='block px-4 py-2 text-black hover:bg-gray-100 w-full text-left'
                >
                  Sign In
                </button>
              </li>
              <li>
                <button
                  onClick={handleCreateEvent}
                  className='block px-4 py-2 text-black hover:bg-gray-100 w-full text-left'
                >
                  Get Started
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <div className='hidden md:flex justify-center flex-1'>
        <ul className='flex space-x-3 md:space-x-6'>
          {navLinks.map((link, index) => (
            <li key={index}>
              {link.isScroll ? (
                <Link
                  to={link.path}
                  smooth={true}
                  offset={0}
                  duration={1000}
                  className='text-gray-700 cursor-pointer no-underline hover:text-blue-500 transition duration-300'
                >
                  {link.name}
                </Link>
              ) : (
                <NavLink
                  to={link.path}
                  className='text-gray-700 no-underline hover:text-blue-500 transition duration-300'
                  activeclassname='font-bold text-blue-700'
                >
                  {link.name}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop Buttons */}
      <div className='hidden md:flex space-x-6'>
        <button
          onClick={handleSignIn}
          className='bg-black text-white px-4 py-2 rounded'
        >
          Sign In
        </button>
        <button
          onClick={handleCreateEvent}
          className='bg-inherit text-black px-4 py-2 rounded border'
        >
          Get Started
        </button>
      </div>
    </nav>
  );
}
