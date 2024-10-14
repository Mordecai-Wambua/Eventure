import { useState, useEffect } from 'react';
import Header from '@/organizer_components/Header';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Track if user is logged in

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      setIsLoggedIn(false); // Set logged-in state to false if no token
      return;
    } else {
      setIsLoggedIn(true);
    }

    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/organizer/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch events');
        }

        setEvents(data.eventsPosted);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 w-full">
      {/* Header Div */}
      <div className="w-full">
        <Header />
      </div>

      {/* Events Div */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-11/12 mt-4">
        <h2 className="text-xl font-semibold mb-4">My Events</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        {!isLoggedIn ? (
          <p className="text-yellow-600">You need to log in to see your events.</p>
        ) : isLoading ? (
          <p>Loading events...</p>
        ) : (
          <ul className="space-y-4">
            {events.length > 0 ? (
              events.map((event) => (
                <li key={event._id} className="border p-4 rounded-lg shadow">
                  <h3 className="font-bold">{event.title}</h3>
                  <p>{event.description}</p>
                  <p>{event.venue}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(event.date).toLocaleString()}
                  </p>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No events found.</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Events;
