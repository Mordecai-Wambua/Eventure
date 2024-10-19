import { useState, useEffect } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import Avatar from 'react-avatar';

export default function MyProfile() {
  const apiLink = import.meta.env.VITE_SERVER_API;
  const [userProfile, setUserProfile] = useState(null);
  const authHeader = useAuthHeader();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!authHeader) {
        console.error('User is not authenticated, cannot fetch profile.');
        return;
      }

      try {
        const response = await fetch(`${apiLink}/api/profile`, {
          headers: {
            Authorization: authHeader(),
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

  if (!userProfile) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='text-center'>
          <div className='loader mb-4'></div>
          <p className='text-lg text-gray-600'>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto max-w-2xl p-6'>
      <div className='bg-white rounded-lg shadow-lg p-6'>
        <h1 className='text-3xl font-bold text-center mb-8'>My Profile</h1>

        <div className='flex flex-col items-center'>
          <Avatar name={userProfile.name} size='100' round={true} />

          <div className='mt-6'>
            <h2 className='text-xl font-semibold text-center'>{userProfile.name}</h2>
            <p className='text-gray-500 text-center'>{userProfile.email}</p>
          </div>

          <div className='w-full mt-6 grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='p-4 bg-gray-100 rounded-lg text-center'>
              <h3 className='text-lg font-medium text-gray-700'>Full Name</h3>
              <p className='text-gray-600'>{userProfile.name}</p>
            </div>

            <div className='p-4 bg-gray-100 rounded-lg text-center'>
              <h3 className='text-lg font-medium text-gray-700'>Email</h3>
              <p className='text-gray-600'>{userProfile.email}</p>
            </div>

            <div className='p-4 bg-gray-100 rounded-lg text-center'>
              <h3 className='text-lg font-medium text-gray-700'>Joined</h3>
              <p className='text-gray-600'>{new Date(userProfile.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
