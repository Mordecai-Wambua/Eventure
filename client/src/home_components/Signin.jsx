import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignIn = () => {
    console.log('Sign In clicked!');
    navigate('/login');
  };

  const handleCreateEvent = () => {
    console.log('Create Event clicked');
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu visibility
  };

  return (
    <div className="flex items-center justify-between min-w-fit">
      <div className="md:hidden md:fixed">
        <button
          onClick={toggleMenu}
          className="text-black focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg">
            <button
              onClick={handleSignIn}
              className="block px-4 py-2 text-black hover:bg-gray-100 w-full text-left"
            >
              Sign In
            </button>
            <button
              onClick={handleCreateEvent}
              className="block px-4 py-2 text-black hover:bg-gray-100 w-full text-left"
            >
              Get Started
            </button>
          </div>
        )}
      </div>

      <div className="hidden md:flex space-x-6">
        <button
          onClick={handleSignIn}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Sign In
        </button>
        <button
          onClick={handleCreateEvent}
          className="bg-inherit text-black px-4 py-2 rounded border"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
