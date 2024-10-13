import { CalendarDays, PlusCircle, Users, Mail } from 'lucide-react';

export default function MainDash() {
  return (
    <div className="p-8">
      {/* Welcome Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Welcome</h1>
        <p className="text-gray-600 mt-2">Here&apos;s what&apos;s happening with your events today.</p>
      </div>

      {/* Key Stats Overview */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="border p-6 rounded-md shadow-md bg-white flex flex-col items-center">
          <CalendarDays size={36} className="text-blue-500 mb-2" />
          <h2 className="text-lg font-semibold">Total Events</h2>
          <p className="text-xl font-bold">10</p>
        </div>
        <div className="border p-6 rounded-md shadow-md bg-white flex flex-col items-center">
          <Users size={36} className="text-green-500 mb-2" />
          <h2 className="text-lg font-semibold">Total Attendees</h2>
          <p className="text-xl font-bold">120</p>
        </div>
        <div className="border p-6 rounded-md shadow-md bg-white flex flex-col items-center">
          <CalendarDays size={36} className="text-purple-500 mb-2" />
          <h2 className="text-lg font-semibold">Upcoming Events</h2>
          <p className="text-xl font-bold">5</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-6">
          <div className="flex items-center p-4 border rounded bg-white shadow-md hover:bg-gray-200 cursor-pointer">
            <PlusCircle size={24} className="mr-3 text-blue-500" />
            <span className="font-semibold">Create New Event</span>
          </div>
          <div className="flex items-center p-4 border rounded bg-white shadow-md hover:bg-gray-200 cursor-pointer">
            <Users size={24} className="mr-3 text-green-500" />
            <span className="font-semibold">Manage Attendees</span>
          </div>
          <div className="flex items-center p-4 border rounded bg-white shadow-md hover:bg-gray-200 cursor-pointer">
            <Mail size={24} className="mr-3 text-purple-500" />
            <span className="font-semibold">Send Invitations</span>
          </div>
        </div>
      </div>
    </div>
  );
}
