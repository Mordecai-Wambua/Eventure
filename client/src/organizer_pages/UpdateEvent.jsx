/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from 'react';
import Header from '@/organizer_components/Header';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

const UpdateEvent = () => {
  const apiLink = import.meta.env.VITE_SERVER_API;
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
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
    setEditingEvent(null);
  }, []);

  const handleEditClick = useCallback((event) => {
    setEditingEvent(event);
    setSelectedEvent(null);
  }, []);

  const handleUpdateEvent = async (updatedEvent) => {
    try {
      const response = await fetch(
        `${apiLink}/api/organizer/event/${updatedEvent._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: authHeader,
          },
          body: JSON.stringify(updatedEvent),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update event');
      }

      setEvents(
        events.map((event) =>
          event._id === updatedEvent._id ? updatedEvent : event
        )
      );
      setEditingEvent(null);
      setError('');
      fetchEvents(); // Refresh the events list
    } catch (error) {
      setError(error.message);
    }
  };

  const closeOverlay = () => {
    setEditingEvent(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Update My Events</h2>
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
                onEdit={handleEditClick}
              />
            ))}
          </div>
        )}
      </div>

      {selectedEvent && (
        <EventDetailsModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}

      {editingEvent && (
        <EditEventModal
          event={editingEvent}
          onSubmit={handleUpdateEvent}
          onClose={closeOverlay}
        />
      )}
    </div>
  );
};

const EventCard = ({ event, onViewDetails, onEdit }) => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="px-4 py-5 sm:p-6">
      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">{event.title}</h3>
      <p className="text-sm text-gray-500 mb-4">{new Date(event.date).toLocaleString()}</p>
      <div className="flex justify-between">
        <button
          onClick={() => onViewDetails(event)}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          View Details
        </button>
        <button
          onClick={() => onEdit(event)}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Edit Event
        </button>
      </div>
    </div>
  </div>
);

const EventDetailsModal = ({ event, onClose }) => (
  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
    <div className="bg-white rounded-lg max-w-md w-full">
      <div className="px-4 pt-5 pb-4 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">{event.title}</h3>
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
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

const EditEventModal = ({ event, onSubmit, onClose }) => {
  const [formData, setFormData] = useState(event);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-lg w-full">
        <form onSubmit={handleSubmit} className="px-4 pt-5 pb-4 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Edit Event</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                id="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              ></textarea>
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date and Time</label>
              <input
                type="datetime-local"
                name="date"
                id="date"
                value={formData.date.slice(0, 16)}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="venue" className="block text-sm font-medium text-gray-700">Venue</label>
              <input
                type="text"
                name="venue"
                id="venue"
                value={formData.venue}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="maxAttendees" className="block text-sm font-medium text-gray-700">Max Attendees</label>
              <input
                type="number"
                name="maxAttendees"
                id="maxAttendees"
                value={formData.maxAttendees}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Update Event
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEvent;