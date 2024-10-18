import { useState, useEffect, useCallback } from 'react';
import Header from '@/organizer_components/Header';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { Calendar, Clock, MapPin, Users, Trash2 } from 'lucide-react';

const DeleteEvent = () => {
  const apiLink = import.meta.env.VITE_SERVER_API;
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const authHeader = useAuthHeader();

  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiLink}/api/organizer/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authHeader,
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
  }, [apiLink, authHeader]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleEventClick = useCallback((event) => {
    setSelectedEvent(event);
  }, []);

  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await fetch(
        `${apiLink}/api/organizer/event/${eventId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: authHeader,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete event');
      }

      setEvents(events.filter((event) => event._id !== eventId));
      setSelectedEvent(null);
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Delete My Events</h2>
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
            <p>{error}</p>
          </div>
        )}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                onViewDetails={handleEventClick}
                onDelete={handleDeleteEvent}
              />
            ))}
          </div>
        )}
      </div>

      {selectedEvent && (
        <DeleteEventModal 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)}
          onDelete={handleDeleteEvent}
        />
      )}
    </div>
  );
};

const EventCard = ({ event, onViewDetails, onDelete }) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden">
    <div className="px-4 py-5 sm:p-6">
      <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
      <p className="mt-1 text-sm text-gray-500">{new Date(event.date).toLocaleString()}</p>
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => onViewDetails(event)}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          View Details
        </button>
        <button
          onClick={() => onDelete(event._id)}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </button>
      </div>
    </div>
  </div>
);

const DeleteEventModal = ({ event, onClose, onDelete }) => (
  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
    <div className="bg-white rounded-lg max-w-md w-full">
      <div className="px-4 pt-5 pb-4 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{event.title}</h3>
        <p className="text-sm text-gray-500 mb-4">{event.description}</p>
        <div className="space-y-2">
          <div className="flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-gray-400" />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 h-5 w-5 text-gray-400" />
            <span>{new Date(event.date).toLocaleTimeString()}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="mr-2 h-5 w-5 text-gray-400" />
            <span>{event.venue}</span>
          </div>
          <div className="flex items-center">
            <Users className="mr-2 h-5 w-5 text-gray-400" />
            <span>Max Attendees: {event.maxAttendees}</span>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          onClick={() => {
            onDelete(event._id);
            onClose();
          }}
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Confirm Delete
        </button>
        <button
          type="button"
          onClick={onClose}
          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
);

export default DeleteEvent;