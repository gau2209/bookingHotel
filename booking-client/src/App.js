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
import HotelService from './components/common/HotelService';

function App() {
  return (
    <>
      <main>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edit-room/:roomId" element={<EditRoom />} />
            <Route path="/existing-rooms" element={<ExistingRooms />} />
            <Route path="/add-room" element={<AddRoom />} />
            <Route path="/browse-all-rooms" element={<RoomListting />} />
            {/* Admin */}
            <Route path='/admin' element={<Admin />} />

            {/* Service */}
            <Route path='/service' element={<HotelService/>}/>
          </Routes>
        </Router>
        <Footer />
      </main>
    </>
  );
}

export default App;
