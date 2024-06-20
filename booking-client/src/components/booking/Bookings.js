import { useEffect, useState } from "react"
import { api, cancelBooking, getAllBooking } from "../utils/APIConfig"
import { Await } from "react-router-dom"
import Header from "../common/Header"
import Spinner from "../../layout/Spinner"
import BookingsTable from "./BookingsTable"

function Bookings() {
    const [bookingInfo, setBookingInfo] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [errMessage, setErrMessage] = useState("")

    // useEffect(() => {
    //     const loadBooking = async () => {
    //         try {
    //             // const e = "api/booked/all-booked"
    //             // const res = await api.get(e)
    //             // setBookingInfo(res.data)

    //             // let {res} = await api.get(`/api/booked/all-booked`).then((data)=>{
    //             //     setBookingInfo(data.data)

    //             const data = await getAllBooking()
    //             setBookingInfo(data)

    //         } catch (error) {
    //             console.error(error)
    //         }
    //     }
    //     loadBooking();
    // }, [])


    useEffect(() => {
        setTimeout(() => {
            getAllBooking().then((data) => {
                setBookingInfo(data)
                setIsLoading(false)
            }).catch((error) => {
                console.error(error)
                setErrMessage(errMessage)
                setIsLoading(false)
            })
        }, 2000)
    }, [bookingInfo])


    const handleBookingCancellation = async (bookingId) => {
        try {
            await cancelBooking(bookingId)
            const data = await getAllBooking()
            setBookingInfo(data)
        } catch (error) {
            console.error(error)
            setErrMessage(errMessage)
        }
    }

    return (
        <>
            <section className="container" style={{backgroundColor:"whitesmoke"}}>
                <Header title={"Existing bookings"}/>
                {errMessage &&(<div className="text-danger">{errMessage}</div>)}
                {isLoading ? (
                    <Spinner/>
                ): (
                    <BookingsTable bookingInfo={bookingInfo} 
                    handleBookingCancellation={handleBookingCancellation}/>
                )}
            </section>
        </>
    )
}

export default Bookings