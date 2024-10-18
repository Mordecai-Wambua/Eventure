import { useState, useEffect } from 'react';
import Avatar from 'react-avatar';

const Header = () => {
  const apiLink = import.meta.env.VITE_SERVER_API;
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token =
          localStorage.getItem('token') || sessionStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await fetch(`${apiLink}/api/organizer/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const data = await response.json();
        setUserProfile(data.profile);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return 'Good Morning';
    } else if (currentHour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };

  // Safely access user properties
  const userName = userProfile?.name || userProfile?.username || 'User';
  const userAvatarUrl = userProfile?.avatar || '';

  return (
    <header className='flex items-center justify-between mb-6 p-4 bg-white shadow space-x-4'>
      <div className='flex items-center space-x-4'>
        <h1 className='text-xl font-semibold'>
          {getGreeting()}, {userName}
        </h1>
        {userProfile?.role === 'organizer' && (
          <div className='text-gray-600 text-sm border rounded-full px-2'>
            Organizer
          </div>
        )}
      </div>
      {/* Avatar Section */}
      <div className='flex items-center space-x-2'>
        <span className='text-gray-600'>{userName}</span>
        <Avatar name={userName} src={userAvatarUrl} size='40' round={true} />
      </div>
    </header>
  );
};

export default Header;
