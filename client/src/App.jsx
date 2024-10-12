import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Event from './pages/Event';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Organizer from './pages/Organizer';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/event/:eventId' element={<Event />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/organizer/:organizerId' element={<Organizer />} />
      </Routes>
    </>
  );
}

export default App;
