import { useEffect, useState } from "react"
import BookingForm from "../booking/BookingForm"
import { getRoomById } from "../utils/APIConfig"
import { Link, useParams } from "react-router-dom"
import Spinner from "../../layout/Spinner"
import { FaCar, FaTv, FaUtensils, FaWifi } from "react-icons/fa6"
import { FaParking, FaTshirt, FaWineGlassAlt } from "react-icons/fa"
import RoomCarousel from "../common/RoomCarousel"

function CheckOut() {
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const { roomId } = useParams()
    const [roomInfo, setRoomInfo] = useState({
        photo: "",
        roomType: "",
        roomPrice: "",
    })

    const currentUser = localStorage.getItem("userId")

    useEffect(() => {
        setTimeout(() => {
            getRoomById(roomId).then((data) => {
                setRoomInfo(data)
                setIsLoading(false)
            }).catch((error) => {
                setError(error)
                setIsLoading(true)
            })
        }, 2000)
    }, [roomId])


     let url = `/login?next=/book-room/${roomId}`

    return (
       
        <>
            {currentUser === null ? (
                <p>
                    Vui lòng <Link to={url}>đăng nhập</Link> để thực hiện
                </p>
            ) : (
                <>
                    <div>
                        <section className="container">
                            <div className="row flex-column flex-md-row align-item-center">
                                <div className="col-md-4 mt-5 mb-5">
                                    {isLoading ? (
                                        <>

                                            <Spinner />
                                            <p>Loading ...</p>
                                        </>
                                    ) : error ? (
                                        <p>{error}</p>
                                    ) : (
                                        <div className="room-info">
                                            <img src={`data:image/png;base64,${roomInfo.photo}`}
                                                alt="Room photo"
                                                style={{ width: "100%", height: "200px" }} />

                                            <table className="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <th>Room type: </th>
                                                        <td>{roomInfo.roomType}</td>
                                                    </tr>

                                                    <tr>
                                                        <th>Room price: </th>
                                                        <td>{roomInfo.roomPrice}</td>
                                                    </tr>

                                                    <tr>
                                                        <th>Room Service:</th>
                                                        <td>
                                                            <ul className="list-unstyled" style={{ textAlign: "left" }}>
                                                                <li><FaWifi /> Wifi</li>

                                                                <li><FaTv /> Netfilx Premium</li>

                                                                <li><FaUtensils /> Breakfast</li>

                                                                <li><FaWineGlassAlt /> Mini bar refreshment</li>

                                                                <li><FaCar /> Car Service</li>

                                                                <li><FaParking /> Parking Space</li>

                                                                <li><FaTshirt /> Laundry</li>
                                                            </ul>
                                                        </td>
                                                    </tr>

                                                </tbody>
                                            </table>
                                        </div>
                                    )}

                                </div>
                                <div className="col-md-8">
                                    <BookingForm />
                                </div>
                            </div>
                        </section>
                        <div className="container ">
                            <RoomCarousel />

                        </div>
                    </div>
                </>
            )}
        </>
    )
}
export default CheckOut