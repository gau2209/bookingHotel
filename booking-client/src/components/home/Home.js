import MainHeader from "../../layout/MainHeader"
import RoomSearch from "../booking/RoomSearch"
import HotelService from "../common/HotelService"
import Parallel from "../common/Parallel"
import RoomCarousel from "../common/RoomCarousel"

const Home = () => {
    return (
        <section>
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