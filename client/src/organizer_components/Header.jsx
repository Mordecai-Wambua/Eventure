import { useState, useEffect } from 'react';
import Avatar from 'react-avatar';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, User, LogOut } from 'lucide-react';

 
const Header = () => {
  const apiLink = import.meta.env.VITE_SERVER_API;
  const [userProfile, setUserProfile] = useState(null);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const authHeader = useAuthHeader();
  const signOut = useSignOut();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!authHeader) {
        console.error('User is not authenticated, cannot fetch profile.');
        return;
      }

      try {
        const response = await fetch(`${apiLink}/api/organizer/profile`, {
          headers: {
            Authorization: authHeader,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          console.error('Failed to fetch user profile');
          return;
        }

        const data = await response.json();
        setUserProfile(data.profile);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [authHeader, apiLink]);

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return 'Good Morning';
    if (currentHour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const userName = userProfile?.name || userProfile?.username || 'User';
  const userAvatarUrl = userProfile?.avatar || '';

  const toggleSubmenu = () => setIsSubmenuOpen(!isSubmenuOpen);

  const handleSignOut = () => {
    signOut();
    navigate('/');
    console.log('User signed out');
  };

  return (
    <header className='flex items-center justify-between p-4 bg-white shadow-md'>
      <div className='flex items-center space-x-4'>
        <button
          onClick={() => navigate('/organizer')}
          className='p-2 rounded-md hover:bg-gray-200 transition-colors duration-200'
        >
          <ChevronLeft size={24} />
        </button>
        <div className='hidden md:block w-16'></div>
      </div>
      <div className='flex-1 flex flex-col sm:flex-row sm:items-center justify-center sm:justify-start space-y-2 sm:space-y-0 sm:space-x-4 ml-4 sm:ml-0'>
        <h1 className='text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-center sm:text-left'>
          {getGreeting()}, {userName}
        </h1>
        {userProfile?.role === 'organizer' && (
          <div className='text-gray-600 text-xs sm:text-sm md:text-base border rounded-full px-2 py-1 inline-block text-center'>
            Organizer
          </div>
        )}
      </div>

      <div
        className='relative'
        onMouseEnter={() => setIsSubmenuOpen(true)}
        onMouseLeave={() => setIsSubmenuOpen(false)}
      >
        <div
          className='flex items-center space-x-2 cursor-pointer'
          onClick={toggleSubmenu}
        >
          <span className='text-gray-600 text-sm sm:text-base hidden sm:inline'>{userName}</span>
          <Avatar name={userName} src={userAvatarUrl} size='40' round={true} />
        </div>

        {isSubmenuOpen && (
          <div className='absolute right-0 w-48 bg-white rounded-lg shadow-lg z-10'>
            <ul className='py-2'>
              <li
                className='flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer'
                onClick={() => navigate('/my-profile')}
              >
                <User className='mr-2' size={16} /> Profile
              </li>
              <li
                className='flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer'
                onClick={handleSignOut}
              >
                <LogOut className='mr-2' size={16} /> Sign Out
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
