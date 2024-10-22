import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
import HeroImage from '../assets/HeroImage.webp';
import { motion } from 'framer-motion';  // Import motion from framer-motion

export default function Events() {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const apiLink = import.meta.env.VITE_SERVER_API;
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [apiLink]);

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const searchTerms = searchQuery.toLowerCase().split(' ');
      return searchTerms.every(term =>
        event.title.toLowerCase().includes(term) ||
        event.description.toLowerCase().includes(term) ||
        event.venue.toLowerCase().includes(term)
      );
    });
  }, [events, searchQuery]);

  const handleEventClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
          Discover Amazing Events
        </h1>
        <p className="text-gray-600 text-lg">
          Find exclusive deals and unforgettable experiences near you
        </p>

        <div className="max-w-2xl mx-auto mt-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search events by name, description, or venue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
          </div>
        ) : filteredEvents.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.5, staggerChildren: 0.2 } }
            }}
          >
            {filteredEvents.map((event) => (
              <motion.div
                key={event._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }} // Animation on hover
                whileTap={{ scale: 0.95 }}   // Animation on click
              >
                <div className="relative">
                  <img
                    src={HeroImage}
                    alt={event.title}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  <button className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white transition-colors">
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>

                <div className="p-4 space-y-4">
                  <h2 className="font-semibold text-xl">{event.title}</h2>
                  
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{event.venue}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="text-gray-600">
                      {new Date(event.date).toLocaleDateString('en-US', { 
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="text-purple-600 font-semibold">
                      KES {event.price || 'TBA'}
                    </div>
                  </div>

                  <button 
                    onClick={() => handleEventClick(event._id)}
                    className="w-full py-2 px-4 text-center text-white font-semibold rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition-opacity"
                  >
                    Book Now
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold text-gray-600">No events found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </div>
  );
}
