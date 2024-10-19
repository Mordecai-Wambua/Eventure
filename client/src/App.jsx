import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Event from './pages/Event';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Organizer from './pages/Organizer';
import AddEvent from './organizer_pages/AddEvent';
import Dashboard from './organizer_pages/Dashboard';
import MyEvents from './organizer_pages/MyEvents';
import AttendeeList from './organizer_pages/AttendeeList';
import DeleteEvent from './organizer_pages/DeleteEvent';
import BookEvents from './pages/BookEvents';
import Register from './organizer_pages/Register';
import ProtectedRoute from './ProtectedRoutes';
import UpdateEvent from './organizer_pages/UpdateEvent';
import SendInvites from './organizer_pages/SendInvites';
import Events from './organizer_pages/CurrentEvents';
import MyProfile from './organizer_pages/MyProfile';

// Vercel analytics
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
	<>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/events' element={<Event />} />
      <Route path='/login' element={<Login />} />
      <Route path='/admin' element={<Admin />} />

      {/* Protected Routes */}
      <Route path='/organizer' element={<ProtectedRoute><Organizer /></ProtectedRoute>} />
      <Route path='/add-event' element={<ProtectedRoute><AddEvent /></ProtectedRoute>} />
      <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path='/my-events' element={<ProtectedRoute><MyEvents /></ProtectedRoute>} />
      <Route path='/attendee-list' element={<ProtectedRoute><AttendeeList /></ProtectedRoute>} />
      <Route path='/delete-event' element={<ProtectedRoute><DeleteEvent /></ProtectedRoute>} />
      <Route path='/update-event/' element={<ProtectedRoute><UpdateEvent /></ProtectedRoute>} />
      <Route path='/send-invitations' element={<ProtectedRoute><SendInvites /></ProtectedRoute>} />
      <Route path='/current-events' element={<ProtectedRoute><Events /></ProtectedRoute>} />
      <Route path='/upcoming-events' element={<ProtectedRoute><Events /></ProtectedRoute>} />
      <Route path='/events-created' element={<ProtectedRoute><Events /></ProtectedRoute>} />
      <Route path='/my-profile' element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />

      {/* Public Routes */}
      <Route path="/events/:id" element={<BookEvents />} />
      <Route path="/register" element={<Register />} />

    </Routes>
	<Analytics />
	</>
  );
}

export default App;
