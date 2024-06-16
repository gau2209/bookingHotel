import { useEffect, useState } from "react"
import { getAllRoom } from "../utils/APIConfig"
import Spinner from "../../layout/Spinner"
import { Link } from "react-router-dom"
import { Card, Carousel, CarouselItem, Col, Container, Row } from "react-bootstrap"

function RoomCarousel() {
    const [rooms, setRooms] = useState([{id:"",roomType:"",roomPrice: "",photo:""}])
    const [errorMessage, setErrorMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        setIsLoading(true)
        getAllRoom().then((data) => {
            setRooms(data)
            setIsLoading(false)
        }).catch((error) => {
            setErrorMessage(error.message)
            setIsLoading(false)
        })
    }, [])

    if (isLoading === true) {
        return <Spinner />
    }

    if (errorMessage) {
        return <div className="text-danger mt-5 mt-5">Error: {errorMessage}</div>
    }


    return (
        <>
            <section className="bg-light mb-5 mt-5 shadow">
                <Link to={"/browse-all-rooms"} className="hote-color text-center">
                    Browse all rooms
                </Link>
                <Container>
                    <Carousel indicators={false}>
                        {[...Array(Math.ceil(rooms.length / 4))].map((_, index) => (
                            <Carousel.Item key={index}>
                                <Row>
                                    {rooms.slice(index * 4, index * 4 + 4).map((room) => (
                                        <Col key={room.id} className="mb-4" xs={12} md={6} lg={3}>
                                            <Card>
                                                <Link to={`/book-room/${room.id}`} >
                                                    <Card.Img variant="top" src={`data:image/png;base64,${room.photo}`} alt="Room photo" className="w-100" style={{ height: "200px" }} />
                                                </Link>

                                                <Card.Body>
                                                    <Card.Title className="hotel-color">{room.roomType}</Card.Title>
                                                    <Card.Title className="room-price">{room.roomPrice}</Card.Title>
                                                    <div className="flex-shrink-0 ">
                                                        <Link className="btn btn-danger" to={`/book-room/${room.id}`}>
                                                        Book Now
                                                        </Link>
                                                    </div>
                                                </Card.Body>
                                            </Card>

                                        </Col>
                                    ))}
                                </Row>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Container>
            </section>
        </>
    )
}
export default RoomCarousel