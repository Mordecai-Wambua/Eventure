import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, UserPlus, List, PlusCircle, Trash } from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', icon: Home, path: '/dashboard', overview: 'Overview of your dashboard' },
  { name: 'MyEvents', icon: Calendar, path: '/my-events', overview: 'View and manage your events' },
  { name: 'Add Event', icon: UserPlus, path: '/add-event', overview: 'Create and schedule a new event' },
  { name: 'AtendeeList', icon: List, path: '/attendee-list', overview: 'Check the list of all attendees' },
  { name: 'Update Event', icon: PlusCircle, path:'/update-event:id', overview: 'Updates created events'},
  { name: 'Delete Event', icon: Trash, path:'/delete-event', overview: 'Deletes created events'}

];

const Sidebar = () => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <div className="w-64 bg-gray-200 p-4 rounded-r-2xl py-16 relative">
      <h2 className="text-2xl font-bold mb-6">Eventure</h2>
      <ul>
        {menuItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);

          return (
            <li 
              key={item.name} 
              className="mb-4 relative"
              onMouseEnter={() => setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Link
                to={item.path}
                className={`flex items-center text-gray-700 p-2 rounded 
                ${isActive ? 'bg-gray-300 font-semibold' : 'hover:bg-gray-300'}`}
              >
                <item.icon className="mr-2" /> {item.name}
              </Link>

              {hoveredItem === item.name && (
                <div className="absolute left-full top-0 ml-2 w-56 bg-white p-3 shadow-lg rounded-lg z-10">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-gray-600">{item.overview}</p>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;