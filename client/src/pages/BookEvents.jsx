import HeroImage from '../assets/HeroImage.webp';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Ticket, 
  Mail,
  User,
  Loader2,
  ArrowRight
} from 'lucide-react';

export default function BookEvents() {
  const [events, setEvents] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bookingMessage, setBookingMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const apiLink = import.meta.env.VITE_SERVER_API;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${apiLink}/events`);
        if (!response.ok) throw new Error('Failed to fetch events');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, [apiLink]);

  const selectedEvent = events.find(e => e._id === id);

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

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
        headers: { 'Content-Type': 'application/json' },
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

  if (!selectedEvent) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden">
        <div className="lg:flex h-full">
          {/* Left Column - Event Details */}
          <div className="lg:w-7/12 relative">
            {/* Hero Image with Overlay */}
            <div className="relative h-48 lg:h-full">
              <img 
                className="h-full w-full object-cover" 
                src={HeroImage}
                alt={selectedEvent.title} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
              
              {/* Event Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {selectedEvent.title}
                </h1>
                <div className="flex items-center space-x-2 text-white/90">
                  <Users className="h-5 w-5" />
                  <span className="text-lg">{selectedEvent.organizer.organizerName}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details & Booking */}
          <div className="lg:w-5/12 p-6 lg:p-8">
            <div className="space-y-8">
              {/* Event Details */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  <span>{formatDate(selectedEvent.date)}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  <span>{selectedEvent.venue}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <span>2 Hours</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">About This Event</h3>
                <p className="text-gray-600 leading-relaxed">
                  {selectedEvent.description}
                </p>
              </div>

              {/* Booking Form */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Ticket className="h-6 w-6 text-blue-500" />
                  <h2 className="text-xl font-semibold text-gray-900">Book Your Ticket</h2>
                </div>

                {bookingMessage && (
                  <div className={`p-4 rounded-lg ${
                    bookingMessage.includes('successfully') 
                      ? 'bg-green-50 text-green-800 border border-green-200' 
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                    <p>{bookingMessage}</p>
                  </div>
                )}

                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="space-y-4">
                    <div className="relative">
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white/50 backdrop-blur-sm"
                        />
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>
                    </div>

                    <div className="relative">
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        Email
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white/50 backdrop-blur-sm"
                        />
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg
                      hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                      transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin h-5 w-5" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>Reserve Your Spot</span>
                        <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}