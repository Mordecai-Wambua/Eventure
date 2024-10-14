import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import Header from '@/organizer_components/Header';

export default function DeleteEvent() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');

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

  const handleDelete = async (eventId) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    
    try {
      const response = await fetch(`http://localhost:5000/api/organizer/event/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete event');
      }

      // Update the state to remove the deleted event
      setEvents(events.filter(event => event._id !== eventId));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <div>
        <Header/>
      </div>
      <h2 className="text-xl font-semibold mb-4">Delete Events</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      {isLoading ? (
        <p>Loading events...</p>
      ) : (
        <ul className="space-y-4">
          {events.length > 0 ? (
            events.map((event) => (
              <li key={event._id} className="border p-4 rounded-lg shadow flex items-center justify-between">
                <div>
                  <h3 className="font-bold">{event.title}</h3>
                  <p>{event.description}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(event.date).toLocaleString()}
                  </p>
                </div>
                <button 
                  onClick={() => handleDelete(event._id)} 
                  className="ml-4 text-red-600 hover:text-red-800"
                  aria-label="Delete event"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No events found.</p>
          )}
        </ul>
      )}
    </div>
  );
}
