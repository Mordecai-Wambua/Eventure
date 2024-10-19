/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, CalendarPlus, List, PlusCircle, Trash, ChevronRight } from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', icon: Home, path: '/dashboard', overview: 'Overview of your dashboard' },
  { name: 'My Events', icon: Calendar, path: '/my-events', overview: 'View and manage your events' },
  { name: 'Add Event', icon: PlusCircle, path: '/add-event', overview: 'Create and schedule a new event' }, // Changed UserPlus to PlusCircle
  { name: 'Attendee List', icon: List, path: '/attendee-list', overview: 'Check the list of all attendees' },
  { name: 'Update Event', icon: CalendarPlus, path: '/update-event', overview: 'Update created events' }, // Changed PlusCircle to Calendar
  { name: 'Delete Event', icon: Trash, path: '/delete-event', overview: 'Delete created events' }
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 ease-in-out z-50
                  ${isOpen ? 'w-64' : 'w-20'}
                  ${isMobile ? (isOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className={`text-2xl font-bold transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          Eventure
        </h2>
        <button 
          onClick={toggleSidebar} 
          className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        >
          <ChevronRight size={24} className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <nav>
        <ul className="mt-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);

            return (
              <li 
                key={item.name} 
                className="relative group"
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link
                  to={item.path}
                  className={`flex items-center p-3 mx-2 rounded-lg transition-all duration-300
                              ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'}`}
                  onClick={() => isMobile && toggleSidebar()}
                >
                  <item.icon className="w-6 h-6 flex-shrink-0" />
                  <span className={`ml-3 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>
                    {item.name}
                  </span>
                </Link>

                {hoveredItem === item.name && !isOpen && !isMobile && (
                  <div className="absolute left-full top-0 ml-2 w-48 bg-white p-2 shadow-lg rounded-md z-10">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.overview}</p>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
