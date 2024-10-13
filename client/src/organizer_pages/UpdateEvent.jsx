/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import Header from '@/organizer_components/Header';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

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

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setEditingEvent(null);
  };

  const handleEditClick = (event) => {
    setEditingEvent(event);
    setSelectedEvent(null);
  };

  const handleUpdateEvent = async (updatedEvent) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:5000/api/organizer/event/${updatedEvent._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedEvent),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update event');
      }

      setEvents(events.map(event => event._id === updatedEvent._id ? updatedEvent : event));
      setEditingEvent(null);
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  const EventForm = ({ event, onSubmit }) => {
    const [formData, setFormData] = useState(event);

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Event Title"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Event Description"
        />
        <input
          type="datetime-local"
          name="date"
          value={formData.date.slice(0, 16)}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="venue"
          value={formData.venue}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Venue"
        />
        <input
          type="number"
          name="maxAttendees"
          value={formData.maxAttendees}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Max Attendees"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Update Event
        </button>
      </form>
    );
  };

  return (
    <div className="p-6 bg-gray-100">
      <div>
        <Header />
      </div>
      <h2 className="text-xl font-semibold mb-4">Update My Events</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {isLoading ? (
        <p>Loading events...</p>
      ) : (
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event._id} className="border p-4 rounded-lg shadow">
              <h3 className="font-bold">{event.title}</h3>
              <p className="text-sm text-gray-500">{new Date(event.date).toLocaleString()}</p>
              <button 
                onClick={() => handleEventClick(event)} 
                className="text-blue-500 mt-2 mr-2"
              >
                View Details
              </button>
              <button 
                onClick={() => handleEditClick(event)} 
                className="text-green-500 mt-2"
              >
                Edit Event
              </button>
            </li>
          ))}
        </ul>
      )}

      {selectedEvent && (
        <div className="mt-6 p-4 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-bold">{selectedEvent.title}</h2>
          <p>{selectedEvent.description}</p>
          <p><strong>Date:</strong> {new Date(selectedEvent.date).toLocaleString()}</p>
          <p><strong>Venue:</strong> {selectedEvent.venue}</p>
          <p><strong>Max Attendees:</strong> {selectedEvent.maxAttendees}</p>
        </div>
      )}

      {editingEvent && (
        <div className="mt-6 p-4 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Edit Event</h2>
          <EventForm event={editingEvent} onSubmit={handleUpdateEvent} />
        </div>
      )}
    </div>
  );
};

export default EventList;