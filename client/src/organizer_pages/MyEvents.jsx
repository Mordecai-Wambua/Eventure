import  { useState, useEffect } from 'react';
import Header from '@/organizer_components/Header';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { Calendar, Clock, MapPin, Users, ChevronRight, X } from 'lucide-react';

const Events = () => {
  const apiLink = import.meta.env.VITE_SERVER_API;
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null); // To track selected event for the modal
  const authHeader = useAuthHeader();

  useEffect(() => {
    if (!authHeader) {
      setIsLoggedIn(false);
      return;
    }

    const fetchEvents = async () => {
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
    };

    fetchEvents();
  }, [authHeader, apiLink]);

  const openModal = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">My Events</h1>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
              <p>{error}</p>
            </div>
          )}

          {!isLoggedIn ? (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
              <p className="font-bold">Authentication Required</p>
              <p>You need to log in to see your events.</p>
            </div>
          ) : isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.length > 0 ? (
                events.map((event) => (
                  <EventCard key={event._id} event={event} onViewDetails={() => openModal(event)} />
                ))
              ) : (
                <div className="col-span-full text-center py-12 bg-white rounded-lg shadow">
                  <p className="text-gray-500 text-lg">No events found.</p>
                  <p className="mt-2 text-sm text-gray-400">Create your first event to get started!</p>
                </div>
              )}
            </div>
          )}

          {/* Modal for event details */}
          {selectedEvent && <EventModal event={selectedEvent} onClose={closeModal} />}
        </div>
      </main>
    </div>
  );
};

const EventCard = ({ event, onViewDetails }) => (
  <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300">
    <div className="px-4 py-5 sm:p-6">
      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">{event.title}</h3>
      <p className="text-sm text-gray-500 mb-4 line-clamp-2">{event.description}</p>
      <div className="space-y-2">
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="mr-2 h-5 w-5" />
          <span>{new Date(event.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="mr-2 h-5 w-5" />
          <span>{new Date(event.date).toLocaleTimeString()}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <MapPin className="mr-2 h-5 w-5" />
          <span>{event.venue}</span>
        </div>
        {event.maxAttendees && (
          <div className="flex items-center text-sm text-gray-500">
            <Users className="mr-2 h-5 w-5" />
            <span>Max Attendees: {event.maxAttendees}</span>
          </div>
        )}
      </div>
    </div>
    <div className="bg-gray-50 px-4 py-4 sm:px-6">
      <div className="text-sm">
        <button
          onClick={onViewDetails}
          className="font-medium text-blue-600 hover:text-blue-500 flex items-center"
        >
          View details
          <ChevronRight className="ml-1 h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
);

const EventModal = ({ event, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
      <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800" onClick={onClose}>
        <X className="h-6 w-6" />
      </button>
      <h3 className="text-xl font-bold mb-4">{event.title}</h3>
      <p className="text-gray-700 mb-2">{event.description}</p>
      <div className="text-sm text-gray-600 space-y-2">
        <div className="flex items-center">
          <Calendar className="mr-2 h-5 w-5" />
          <span>{new Date(event.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center">
          <Clock className="mr-2 h-5 w-5" />
          <span>{new Date(event.date).toLocaleTimeString()}</span>
        </div>
        <div className="flex items-center">
          <MapPin className="mr-2 h-5 w-5" />
          <span>{event.venue}</span>
        </div>
        {event.maxAttendees && (
          <div className="flex items-center">
            <Users className="mr-2 h-5 w-5" />
            <span>Max Attendees: {event.maxAttendees}</span>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default Events;
