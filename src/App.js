import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Events from './pages/Events'
import Users from './pages/Users'
import Event from './pages/Event'
import User from './pages/User'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/signin' element={<SignIn/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/events' element={<Events/>} />
          <Route path='/users' element={<Users/>} />
          <Route path='/event' element={<Event/>} />
          <Route path='/user' element={<User/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/notifications' element={<Notifications/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
