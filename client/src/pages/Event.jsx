import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroImage from '../assets/HeroImage.webp';

export default function Event() {
  const [events, setEvents] = useState([]);
  const apiLink = import.meta.env.VITE_SERVER_API;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${apiLink}/events`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }

        const data = await response.json();

        const upcomingEvents = data.filter(event => new Date(event.date) > new Date());

        setEvents(upcomingEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [apiLink]);

  const handleEventClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  // Format the date for display
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className='min-h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 py-10 px-5 sm:px-10 lg:px-20'>
      {/* Page Header */}
      <div className='mb-12 text-center'>
        <h1 className='font-extrabold text-4xl sm:text-5xl text-gray-800'>
          Upcoming Events
        </h1>
        <p className='mt-4 text-gray-600 text-lg'>
          Explore the latest events happening around you!
        </p>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto'>
        {events.map((event) => (
          <div
            key={event._id}
            className='bg-white rounded-2xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 duration-300 cursor-pointer'
            onClick={() => handleEventClick(event._id)}
          >
            {/* Event Image */}
            <img
              src={HeroImage}
              alt={event.title}
              className='w-full h-48 object-cover'
            />
            <div className='p-6'>
              <h2 className='font-semibold text-xl mb-2 truncate'>
                {event.title}
              </h2>
              <p className='text-gray-600 mb-4 line-clamp-3 text-sm'>
                {event.description}
              </p>
              <div className='flex justify-between items-center text-sm text-gray-500'>
                <span className='bg-gray-100 text-gray-600 px-3 py-1 rounded-lg'>
                  {event.venue}
                </span>
                <span>{formatDate(event.date)}</span>
              </div>
            </div>
            <div className='p-4 text-center'>
              <button className='bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-700 transition-all'>
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
