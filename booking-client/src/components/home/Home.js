import { useLocation } from "react-router-dom"
import MainHeader from "../../layout/MainHeader"
import RoomSearch from "../booking/RoomSearch"
import HotelService from "../common/HotelService"
import Parallel from "../common/Parallel"
import RoomCarousel from "../common/RoomCarousel"

const Home = () => {
    const location = useLocation()
    const message = location.state && location.state.message
    const currentUser = localStorage.getItem("userId")

    return (
        <section>
            {message && <p className="text-warning px-5">{message}</p>}
            {currentUser && <h6 className="text-success text-center"> you are login as{currentUser}</h6>}
            <MainHeader />
            <section className="container">
                <RoomSearch />
                <RoomCarousel/>
                <Parallel/>
                <HotelService />
            </section>
        </section>
    )
}
export default Home