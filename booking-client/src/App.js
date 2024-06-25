import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
import Home from './components/home/Home';
import EditRoom from './components/room/EditRoom';
import AddRoom from './components/room/addRoom';
import ExistingRooms from './components/room/ExistingRoom';
import NavBar from './layout/navbar';
import Footer from './layout/Footer';
import RoomListting from './components/room/RoomListing';
import Admin from './components/admin/Admin'
import BookingSuccess from"./components/booking/BookingSuccess";
import { useEffect } from 'react';
import GetRoom from './components/room/getRoom';
import Bookings from './components/booking/Bookings';
import FindBooking from './components/booking/FindBooking';
import Login from './components/auth/Login';
import Registration from './components/auth/Registration';
import Profile from './components/auth/Profile';
import { AuthProvider } from './components/auth/AuthProvider';
import CheckOut from './components/room/getRoom';




function App() {

  useEffect(() => {
    document.title = 'My booking app';
  }, []);

  return (
    <AuthProvider>
      <main>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edit-room/:roomId" element={<EditRoom />} />
            <Route path="/existing-rooms" element={<ExistingRooms />} />
            <Route path="/add-room" element={<AddRoom />} />
            {/* <Route path='/get-room/:roomId' element={<GetRoom/>}/> */}
            <Route path="/browse-all-rooms" element={<RoomListting />} />
            {/* Admin */}
            <Route path='/admin' element={<Admin />} />

            <Route path='/book-room/:roomId' element={<GetRoom/>}/>
            <Route path='/booking-success' element={<BookingSuccess/>}/>

            <Route path='/existing-bookings' element={<Bookings/>}/>
            <Route path='/find-booking' element={<FindBooking/>}/>

            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Registration/>}/>
            <Route path='/profile' element={<Profile/>}/>


          </Routes>
        </Router>
        <Footer />
      </main>
    </AuthProvider>
  );
}

export default App;
