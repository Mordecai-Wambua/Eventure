/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import { Calendar, UserPlus, List, PlusCircle, Users, Mail } from 'lucide-react';

const Card = ({ icon: Icon, title, description, buttonText, onClick, color }) => (
  <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300">
    <div className="flex items-center">
      <div className={`p-3 ${color} rounded-full`}>
        <Icon size={24} className={`text-${color.split('-')[0]}-500`} />
      </div>
      <div className="ml-3">
        <h2 className="text-lg font-bold text-gray-700">{title}</h2>
        <p className="text-gray-500 mt-1 text-sm">{description}</p>
      </div>
    </div>
    <button
      onClick={onClick}
      className={`mt-2 text-${color.split('-')[0]}-600 hover:text-${color.split('-')[0]}-800 font-medium text-sm`}
      aria-label={buttonText}
    >
      {buttonText} →
    </button>
  </div>
);

const QuickAction = ({ icon: Icon, text, onClick, color }) => (
  <div
    className="flex items-center p-4 border rounded-lg bg-white shadow-md hover:bg-gray-100 cursor-pointer transform hover:scale-105 transition-all duration-300"
    onClick={onClick}
    aria-label={text}
  >
    <Icon size={20} className={`mr-3 text-${color}-500`} />
    <span className="font-semibold text-sm sm:text-base">{text}</span>
  </div>
);

export default function MainDash() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-6 max-w-7xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Welcome</h1>
        <p className="text-gray-600 mt-2 text-base sm:text-lg">Here&apos;s what&apos;s happening with your events today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Card
          icon={UserPlus}
          title="Events Created"
          description="Manage all your created events"
          buttonText="View Details"
          onClick={() => navigate('/events-created')}
          color="bg-blue-100"
        />
        <Card
          icon={Calendar}
          title="Current Events"
          description="View events happening now"
          buttonText="View Current Events"
          onClick={() => navigate('/current-events')}
          color="bg-green-100"
        />
        <Card
          icon={List}
          title="Upcoming Events"
          description="Prepare for future events"
          buttonText="View Upcoming Events"
          onClick={() => navigate('/upcoming-events')}
          color="bg-yellow-100"
        />
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <QuickAction
            icon={PlusCircle}
            text="Create New Event"
            onClick={() => navigate('/add-event')}
            color="blue"
          />
          <QuickAction
            icon={Users}
            text="Manage Attendees"
            onClick={() => navigate('/manage-attendees')}
            color="green"
          />
          <QuickAction
            icon={Mail}
            text="Send Invitations"
            onClick={() => navigate('/send-invitations')}
            color="purple"
          />
        </div>
      </div>
    </div>
  );
}