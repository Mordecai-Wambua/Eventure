import Header from "@/organizer_components/Header";
import { Calendar, UserPlus, List } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="p-6">
      {/* Header Section */}
      <Header />

      {/* Welcome Section */}
      <div className="flex justify-center mt-8">
        <h1 className="text-3xl font-bold">Welcome to your Dashboard</h1>
      </div>

      {/* Stats Section */}
      <div className="flex justify-center mt-10 space-x-8">
        {/* Card 1: Events Created */}
        <div className="border w-fit p-8 rounded-md shadow-md bg-gray-100 flex items-center">
          <div className="mr-4">
            <UserPlus size={40} className="text-blue-500" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Events Created</h1>
            <p className="text-gray-600">Manage all your created events</p>
          </div>
        </div>

        {/* Card 2: Current Events */}
        <div className="border w-fit p-8 rounded-md shadow-md bg-gray-100 flex items-center">
          <div className="mr-4">
            <Calendar size={40} className="text-green-500" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Current Events</h1>
            <p className="text-gray-600">View events happening now</p>
          </div>
        </div>

        {/* Card 3: Upcoming Events */}
        <div className="border w-fit p-8 rounded-md shadow-md bg-gray-100 flex items-center">
          <div className="mr-4">
            <List size={40} className="text-yellow-500" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Upcoming Events</h1>
            <p className="text-gray-600">Prepare for future events</p>
          </div>
        </div>
      </div>
    </div>
  );
}
