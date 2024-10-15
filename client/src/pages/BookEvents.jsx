import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HeroImage from '../assets/HeroImage.webp';

export default function BookEvents() {
  const [events, setEvents] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bookingMessage, setBookingMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const apiLink = import.meta.env.VITE_SERVER_API;

  // Fetch events only once or when the apiLink changes
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
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [apiLink]);

  // Find selected event from the events list based on the URL parameter 'id'
  const selectedEvent = events.find(e => e._id === id);

  // Format the date for display
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle booking form submission
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBookingMessage('');

    if (!name || !email) {
      setBookingMessage('Name and email are required.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${apiLink}/event/${id}/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      const result = await response.json();

      if (response.ok) {
        setBookingMessage('Event booked successfully!');
        setName('');
        setEmail('');
      } else {
        setBookingMessage(result.message || 'Failed to book the event.');
      }
    } catch (error) {
      console.error('Error booking event:', error);
      setBookingMessage('An error occurred while booking the event.');
    }

    setLoading(false);
  };

  // Render loading state while events are being fetched
  if (!selectedEvent) {
    return <div>Loading Your Event...</div>;
  }

  // Render the event details and booking form once the event is selected
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img className="h-96 w-full object-cover md:w-96" src={HeroImage} alt={selectedEvent.title} />
            </div>
            <div className="p-8">
              <h1 className="mt-1 text-4xl font-extrabold text-gray-900">
                {selectedEvent.title}
              </h1>
              <h2 className="mt-1 text-2xl font-bold text-gray-700">
                Organized by: {selectedEvent.organizer.organizerName}
              </h2>
              <div className="tracking-wide text-xl text-indigo-500 font-semibold">
                {formatDate(selectedEvent.date)}
              </div>
              <p className="mt-2 text-gray-500">
                Venue: {selectedEvent.venue}
              </p>
              <div className="mt-4 text-gray-700">
                <h3 className="text-xl font-bold mb-2">Event Description</h3>
                <p>{selectedEvent.description}</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Book Your Ticket
            </h2>
            {bookingMessage && (
              <div className={`mb-4 text-sm ${bookingMessage.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                {bookingMessage}
              </div>
            )}
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {loading ? 'Booking...' : 'Book Now'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
