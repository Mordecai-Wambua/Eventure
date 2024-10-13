import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Event from './pages/Event';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Organizer from './pages/Organizer';
import AddEvent from './organizer_pages/AddEvent';
import Dashoard from './organizer_pages/Dashboard';
import MyEvents from './organizer_pages/MyEvents';
import AttendeeList from './organizer_pages/AttendeeList';
import UpdateEvent from './organizer_pages/UpdateEvent';
import DeleteEvent from './organizer_pages/DeleteEvent';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/events' element={<Event />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/organizer' element={<Organizer />} />
        <Route path='/add-event' element={<AddEvent />} />
        <Route path='/dashboard' element={<Dashoard />} />
        <Route path='/my-events' element={<MyEvents />} />
        <Route path='/attendee-list' element={<AttendeeList />} />
        <Route path='/update-event:id' element={<UpdateEvent />} />
        <Route path='/delete-event' element={<DeleteEvent />} />
      </Routes>
    </>
  );
}

export default App;