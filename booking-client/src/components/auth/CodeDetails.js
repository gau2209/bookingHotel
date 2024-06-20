import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { validConfirmationCode } from "../utils/APIConfig"
import Spinner from "../../layout/Spinner"

function CodeDetail() {
    const [booking, setBooking] = useState(null)
    const { confirmationCode } = useParams()

    useEffect(() => {
        try {
            validConfirmationCode(confirmationCode).then((data) => {
                setBooking(data)
            })
        } catch (error) {
            console.error(error)
        }
    }, [confirmationCode])

    if (booking === null) {
        return <Spinner />
    }

    console.log("info:", booking)

    return (
        <>

                    {booking.id}
                    {booking.guestName}
                    {booking.guestEmail}
                    {booking.checkInDate}
                    {booking.checkOutDate}
                    {booking.numOfChildren}
                    {booking.room.id}
                    {booking.room.roomType}
                    {booking.room.roomPrice}


        </>
    )
}
export default CodeDetail