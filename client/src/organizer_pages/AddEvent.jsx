import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import Header from '@/organizer_components/Header';
import { CalendarIcon, MapPinIcon, UsersIcon, AlertCircle, FileTextIcon, TypeIcon } from 'lucide-react';

const AddEvent = () => {
  const apiLink = import.meta.env.VITE_SERVER_API;
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    venue: '',
    maxAttendees: '',
  });

  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const authHeader = useAuthHeader();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!authHeader) {
      return setMessage('Access denied. No token provided.');
    }

    try {
      const response = await fetch(`${apiLink}/api/organizer/event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authHeader,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        navigate('/organizer');
      } else {
        setMessage(data.message || 'Error creating event');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      setMessage(error.message || 'Server error');
    }
  };

  const inputFields = [
    { label: 'Title', name: 'title', type: 'text', icon: TypeIcon },
    { label: 'Description', name: 'description', type: 'textarea', icon: FileTextIcon },
    { label: 'Date', name: 'date', type: 'date', icon: CalendarIcon },
    { label: 'Venue', name: 'venue', type: 'text', icon: MapPinIcon },
    { label: 'Max Attendees', name: 'maxAttendees', type: 'number', icon: UsersIcon },
  ];

  return (
    <div className='min-h-screen bg-gray-100'>
      <Header />
      <div className='flex justify-center p-4'>
        <div className="w-full lg:max-w-2/3 md:max-w-2/3 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="mt-6 text-center text-2xl sm:text-3xl font-extrabold text-indigo-600">Create New Event</h2>
          {message && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span>{message}</span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {inputFields.map(({ label, name, type, icon: Icon }) => (
              <div key={name} className="rounded-md shadow-sm -space-y-px">
                <div className="flex items-center mb-2">
                  <Icon className="h-6 w-6 text-indigo-500 mr-2" aria-hidden="true" />
                  <label htmlFor={name} className="text-sm font-medium text-gray-700">
                    {label}
                  </label>
                </div>
                {type === 'textarea' ? (
                  <textarea
                    id={name}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    rows={4}
                  />
                ) : (
                  <input
                    type={type}
                    id={name}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  />
                )}
              </div>
            ))}
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
              >
                Add Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
