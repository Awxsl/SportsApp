import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Events from './pages/Events'
import Users from './pages/Users'
import Event from './pages/Event'
import User from './pages/User'
import Profile from './pages/Profile'
import UserProfile from './pages/UserProfile';
import Notifications from './pages/Notifications'
import AddEvent from './pages/AddEvent';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/signin' element={<SignIn/>} />
            <Route path='/signup' element={<SignUp/>} />
            <Route path='/events' element={<Events/>} />
            <Route path='/users' element={<Users/>} />
            <Route path='/event' element={<Event/>} />
            <Route path='/user' element={<User/>} />
            <Route path='/profile' element={<PrivateRoute/>}>
              <Route path='/profile' element={<Profile/>} />
            </Route>
            <Route path='/users/:userId' element={<UserProfile/>}>
            </Route>
            <Route path='/notifications' element={<Notifications/>} />
            <Route path='/addEvent' element={<AddEvent/>} />
          </Routes>
        </div>
        <Navbar/>
      </Router>
      <ToastContainer rtl={true} />
    </>
  );
}

export default App;
