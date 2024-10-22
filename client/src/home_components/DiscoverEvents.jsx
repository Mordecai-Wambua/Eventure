import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Calendar, MapPin, ArrowRight, Bookmark } from 'lucide-react';
import HeroImage from '../assets/HeroImage.webp';
import '../styles/fonts.css';

export default function DiscoverEvents() {
  const apiLink = import.meta.env.VITE_SERVER_API;
  const [events, setEvents] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();

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
        
        // Filter out past events and sort by date
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const upcomingEvents = data
          .filter(event => {
            const eventDate = new Date(event.date);
            eventDate.setHours(0, 0, 0, 0);
            return eventDate >= today;
          })
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 4);

        setEvents(upcomingEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [apiLink]);

  const handleEventClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Reset hours to compare dates properly
    today.setHours(0, 0, 0, 0);
    tomorrow.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    if (date.getTime() === today.getTime()) {
      return 'Today';
    } else if (date.getTime() === tomorrow.getTime()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      });
    }
  };

  return (
    <div className="flex justify-center mt-20 flex-col items-center space-y-16 px-4 sm:px-6 lg:px-8 bg-inherit">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="kodchasan-bold text-lg md:text-2xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
          Upcoming Events
        </h1>
        <p className="text-base sm:text-lg text-gray-600">
          Don&apos;t miss out on these exciting upcoming events near you
        </p>
      </div>

      <div className="w-full max-w-7xl">
        {events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No upcoming events available at the moment</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {events.map((event, index) => (
              <div
                key={event._id}
                className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative w-full h-48 overflow-hidden rounded-t-2xl">
                  <img
                    src={event.image || HeroImage}
                    alt={event.title || 'Event Image'}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200">
                      {hoveredIndex === index ? (
                        <Bookmark className="w-5 h-5 text-purple-600" />
                      ) : (
                        <Heart className="w-5 h-5 text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <div className="space-y-2">
                    <h2 className="kodchasan-bold text-lg line-clamp-1">{event.title || 'Untitled Event'}</h2>
                    <div className="flex items-center text-gray-500 space-x-2">
                      <MapPin className="w-4 h-4" />
                      <p className="text-sm line-clamp-1">{event.venue || 'Unknown Location'}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {formatEventDate(event.date)}
                      </span>
                    </div>
                    <span className="font-bold text-lg text-purple-600">
                      KES {event.price || 'TBA'}
                    </span>
                  </div>

                  <button 
                    onClick={() => handleEventClick(event._id)}
                    className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => navigate('/events')}
        className="group flex items-center space-x-2 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-300"
      >
        <span className="font-medium">Explore All Events</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
      </button>
    </div>
  );
}