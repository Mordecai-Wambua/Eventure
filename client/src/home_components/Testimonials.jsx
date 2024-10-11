import Avatar from 'react-avatar';

const Testimonials = () => {
  // Data for the testimonials
  const users = [
    { name: 'Emily Jones', role: 'Music Enthusiast' },
    { name: 'David Smith', role: 'Event Organizer' },
    { name: 'Sophia Lee', role: 'Frequent Attendee' },
    { name: 'Michael Brown', role: 'Tech Blogger' },
    { name: 'Olivia White', role: 'Foodie Blogger' },
    { name: 'Ethan Miller', role: 'Fitness Trainer' },
    { name: 'Lily Davis', role: 'Art Lover' },
    { name: 'Noah Thompson', role: 'Travel Enthusiast' },
  ];

  return (
    <div className="py-16 px-8 mt-24">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">What Our Users Say</h1>
        <p className="text-gray-600 mt-2">
          Discover what our satisfied users have to say about their event experiences with Eventure.
        </p>
      </div>
      
      {/* Testimonial Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {users.map((user, index) => (
          <div key={index} className="flex flex-col items-center">
            <Avatar
              name={user.name}
              size="80" // Size of the avatar
              round={true} // Makes the avatar circular
              className="border-2 border-gray-300" // Adding border to the avatar
            />
            <h2 className="mt-4 text-lg font-semibold">{user.name}</h2>
            <p className="text-gray-500">{user.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
