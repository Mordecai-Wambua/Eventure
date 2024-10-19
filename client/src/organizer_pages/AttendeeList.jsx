/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo } from 'react';
import { Calendar, Clock, MapPin, Users, ChevronLeft } from 'lucide-react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import Header from '@/organizer_components/Header';

const AttendeeList = () => {
  const apiLink = import.meta.env.VITE_SERVER_API;
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const authHeader = useAuthHeader();
  const isLoggedIn = !!authHeader;

  useEffect(() => {
    const fetchEvents = async () => {
      if (!isLoggedIn) {
        setError('Authentication Required. You need to log in to see your events.');
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`${apiLink}/api/organizer/`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: authHeader,
          },
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.message || 'Failed to fetch events');

        setEvents(data.eventsPosted);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [authHeader, apiLink, isLoggedIn]);

  const fetchAttendees = async (eventId) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiLink}/api/organizer/event/${eventId}/tickets`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: authHeader,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch attendees');

      const data = await response.json();
      setAttendees(data);
      setSelectedEvent(events.find(event => event._id === eventId));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredAttendees = useMemo(() => {
    return attendees.filter(attendee =>
      attendee.attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.attendee.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [attendees, searchTerm]);

  const EventCard = ({ event }) => (
    <div 
      className="hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer border p-6 rounded-lg bg-gradient-to-r from-blue-200 to-blue-300"
      onClick={() => fetchAttendees(event._id)}
    >
      <h3 className="font-bold text-lg">{event.title}</h3>
      <div className="flex flex-col space-y-2 text-sm text-gray-700">
        <div className="flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-blue-600" />
          <span>{new Date(event.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center">
          <Clock className="mr-2 h-5 w-5 text-blue-600" />
          <span>{new Date(event.date).toLocaleTimeString()}</span>
        </div>
        <div className="flex items-center">
          <MapPin className="mr-2 h-5 w-5 text-blue-600" />
          <span>{event.venue}</span>
        </div>
        {event.maxAttendees && (
          <div className="flex items-center">
            <Users className="mr-2 h-5 w-5 text-blue-600" />
            <span>Max Attendees: {event.maxAttendees}</span>
          </div>
        )}
      </div>
    </div>
  );

  const AttendeeCard = ({ attendee }) => (
    <div className="border p-6 rounded-lg bg-white shadow hover:shadow-lg transition-shadow">
      <p className="font-semibold"><strong>Name:</strong> {attendee.attendee.name}</p>
      <p><strong>Email:</strong> {attendee.attendee.email}</p>
      <p><strong>Booked At:</strong> {new Date(attendee.bookedAt).toLocaleString()}</p>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border-red-500 text-red-500 p-4">
        <h3 className="font-bold">Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Attendee List</h1>

        {selectedEvent ? (
          <div>
            <button
              onClick={() => setSelectedEvent(null)}
              className="mb-4 text-blue-600 hover:text-blue-500 flex items-center border-none bg-transparent cursor-pointer"
            >
              <ChevronLeft className="mr-1 h-5 w-5" />
              Back to Events
            </button>
            <h2 className="text-2xl font-semibold mb-4">Attendees for {selectedEvent.title}</h2>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search attendees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md border rounded-full p-3 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAttendees.length > 0 ? (
                filteredAttendees.map((attendee) => (
                  <AttendeeCard key={`${attendee.attendee.email}-${attendee.attendee.name}`} attendee={attendee} />
                ))
              ) : (
                <p className="col-span-full text-gray-500">No attendees found for this event.</p>
              )}
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Select an Event</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {events.length > 0 ? (
                events.map(event => <EventCard key={event._id} event={event} />)
              ) : (
                <p className="col-span-full text-gray-500">No events found.</p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AttendeeList;
