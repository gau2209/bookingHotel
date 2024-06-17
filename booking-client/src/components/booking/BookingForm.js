import { useEffect, useState } from "react"
import { getRoomById } from "../utils/APIConfig"
import { useNavigate, useParams } from "react-router-dom"
import moment from "moment"

const BookingForm = () => {
    const [isValidated, setIsValidated] = useState(false)
    const [summited, setIsSummited] = useState(false)
    const [errMessage, setErrMessage] = useState("")
    const [roomPrice, setRoomPrice] = useState(0)
    const { roomId } = useParams()
    const nav = useNavigate()
    const [roomInfo, setRoomInfo] = useState({
        photo: "",
        roomType: "",
        roomPrice: "",
    })

    const [booking, setBooking] = useState({
        guestName: "",
        guestEmail: "",
        checkInDate: "",
        checkOutDate: "",
        numberOfAdults: "",
        numberOfChildren: "",
    })

    function handleInputChange(e) {
        const { name, value } = e.target.value
        setBooking({ ...booking, [name]: value })
        setErrMessage("")
    }

    useEffect(() => {
        const getRoomPriceById = async (roomId) => {
            try {
                const res = await getRoomById(roomId)
                setRoomPrice(res.roomPrice)
            } catch (error) {
                setErrMessage(error.message)
            }
        }
        getRoomPriceById();
    }, [roomId])

    function isGuestValid() {
        const adultsCount = parseInt(booking.numberOfAdults)
        const childrenCount = parseInt(booking.numberOfChildren)
        const totalGuest = adultsCount + childrenCount
        return totalGuest >= 1 && adultsCount >= 1
    }

    function isCheckOutDateValid() {
        if (!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))) {
            setErrMessage("Check out date must come before check in date")
            return false
        }
        else {
            setErrMessage("")
            return true
        }
    }

    const calculatePayment = () => {
        const checkInDate = moment(booking.checkInDate)
        const checkOutDate = moment(booking.checkOutDate)
        const diffInDays = checkOutDate.diff(checkInDate)
        const paymentPricePerDay = roomPrice ? roomPrice : 0
        return diffInDays * paymentPricePerDay

        // const day = checkOutDate - checkInDate
        // return roomPrice * day;
    }

    const handleSummit = (e) => {
        e.preventDefault()
        const form = e.currentTarget
        if (form.checkValidity() === false || !isGuestValid() || !isCheckOutDateValid()) {
            e.stopPropagation()
        } else {
            setIsSummited(true)
        }
        setIsValidated(true)
    }

    const handleBooking = async() =>{
        try {
            const confirmMationCode = await bookRoom(roomId,booking)
            setIsSummited(true)
            nav("/",{state:{message: confirmMationCode}})
        } catch (error) {
            setErrMessage(error.message)
            nav("/",{state:{error: errMessage}})
        }
    }

    return (
        <>
            <div>


            </div>
        </>
    )
}
export default BookingForm