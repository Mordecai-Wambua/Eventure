import Header from '@/organizer_components/Header';
import { Calendar, UserPlus, List } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <Header />

      {/* Welcome Section */}
      <div className="text-center mt-10">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Welcome to Your Dashboard
        </h1>
        <p className="text-lg text-gray-500 mt-4">
          Here’s a summary of your event management activities
        </p>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto mt-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Events Created */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center">
              <div className="p-4 bg-blue-100 rounded-full">
                <UserPlus size={40} className="text-blue-500" />
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-bold text-gray-700">Events Created</h2>
                <p className="text-gray-500 mt-2">Manage all your created events</p>
              </div>
            </div>
            <div className="mt-4">
              <button className="text-blue-600 hover:text-blue-800 font-medium">
                View Details →
              </button>
            </div>
          </div>

          {/* Card 2: Current Events */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center">
              <div className="p-4 bg-green-100 rounded-full">
                <Calendar size={40} className="text-green-500" />
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-bold text-gray-700">Current Events</h2>
                <p className="text-gray-500 mt-2">View events happening now</p>
              </div>
            </div>
            <div className="mt-4">
              <button className="text-green-600 hover:text-green-800 font-medium">
                View Current Events →
              </button>
            </div>
          </div>

          {/* Card 3: Upcoming Events */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center">
              <div className="p-4 bg-yellow-100 rounded-full">
                <List size={40} className="text-yellow-500" />
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-bold text-gray-700">Upcoming Events</h2>
                <p className="text-gray-500 mt-2">Prepare for future events</p>
              </div>
            </div>
            <div className="mt-4">
              <button className="text-yellow-600 hover:text-yellow-800 font-medium">
                View Upcoming Events →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Padding */}
      <div className="pb-16"></div>
    </div>
  );
}
