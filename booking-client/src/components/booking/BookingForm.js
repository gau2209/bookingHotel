import { useEffect, useState } from "react"
import { bookRoom, getRoomById } from "../utils/APIConfig"
import { useNavigate, useParams } from "react-router-dom"
import moment from "moment"
import { Form, FormControl } from "react-bootstrap"
import BookingSummary from "./BookingSummary"

const BookingForm = () => {
    const [isValidated, setIsValidated] = useState(false)
    const [isSubmited, setIsSubmited] = useState(false)
    const [errMessage, setErrMessage] = useState("")
    const [roomPrice, setRoomPrice] = useState(0)
    const { roomId } = useParams()
    const nav = useNavigate()

    const [booking, setBooking] = useState({
        guestFullName: "",
        guestEmail: "",
        checkInDate: "",
        checkOutDate: "",
        numberOfAdults: "",
        numberOfChildren: 0,
    })

    function handleInputChange(e) {
        const { name, value } = e.target
        setBooking({ ...booking, [name]: value })
        setErrMessage("")
    }

    useEffect(() => {
        const getRoomPriceById = async () => {
            try {
                const res = await getRoomById(roomId)
                setRoomPrice(res.roomPrice)
            } catch (error) {
                setErrMessage(error.message)
            }
        }
        getRoomPriceById();
    }, [roomId])

    const isGuestValid = () => {
        const adultCount = parseInt(booking.numberOfAdults)
        const childrenCount = parseInt(booking.numberOfChildren)
        const totalCount = adultCount + childrenCount
        return totalCount >= 1 && adultCount >= 1
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
        const diffInDays = checkOutDate.diff(checkInDate,"days")
        return roomPrice * diffInDays;
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.currentTarget
        if (form.checkValidity() === false || !isGuestValid() || !isCheckOutDateValid()) {
            e.stopPropagation()
        } else {
            setIsSubmited(true)
        }
        setIsValidated(true)
    }

    const handleBooking = async () => {
        try {
            const confirmationCode = await bookRoom(roomId, booking)
            setIsSubmited(true)
            nav("/booking-success", { state: { message: confirmationCode } })
        } catch (error) {
            const errMessage = "This room has been booked in that days selected"
            nav("/booking-success", { state: { error: errMessage } })
        }
    }

    return (
        <>
            <div className="container mb-5">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card card-body mt-5" style={{backgroundColor:"#BF9DCD"}}>
                            <h4 className="card-title">Reserve Room</h4>
                            <Form noValidate validated={isValidated} onSubmit={handleSubmit}>

                                <Form.Group >
                                    <Form.Label htmlFor="guestFullName" style={{color:"#562236"}}>Full Name:</Form.Label>
                                    <FormControl required type="text" id="guestFullName" name="guestFullName" value={booking.guestFullName} placeholder="Enter Your full name" onChange={handleInputChange} />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your full name
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group >
                                    <Form.Label htmlFor="guestEmail">Email:</Form.Label>
                                    <FormControl required type="email" id="guestEmail" name="guestEmail" value={booking.guestEmail} placeholder="Enter Your Email" onChange={handleInputChange} />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your email
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <fieldset style={{ border: "2px" }}>
                                    <legend >Lodging period</legend>
                                    <div className="row">

                                        <div className="col-6">
                                            <Form.Label htmlFor="checkInDate">Check-In Date:</Form.Label>
                                            <FormControl required type="date"
                                                id="checkInDate" name="checkInDate"
                                                value={booking.checkInDate}
                                                placeholder="Check-In Date"
                                                onChange={handleInputChange} />

                                            <Form.Control.Feedback type="invalid">
                                                Please select a check-in date
                                            </Form.Control.Feedback>
                                        </div>

                                        <div className="col-6">
                                            <Form.Label htmlFor="checkOutDate">Check-Out Date:</Form.Label>
                                            <FormControl required type="date" id="checkOutDate"
                                                name="checkOutDate"
                                                value={booking.checkOutDate}
                                                placeholder="Check-Out Date"
                                                onChange={handleInputChange} />
                                            <Form.Control.Feedback type="invalid">
                                                Please select a check-out date
                                            </Form.Control.Feedback>
                                        </div>
                                        {errMessage && <p className="error-message text-danger">{errMessage}</p>}
                                    </div>
                                </fieldset>

                                <fieldset>
                                    <legend className="">Number of guests</legend>
                                    <div className="row">

                                        <div className="col-6">
                                            <Form.Label htmlFor="numberOfAdults">Adults: </Form.Label>
                                            <FormControl required type="number"
                                                id="numberOfAdults" name="numberOfAdults"
                                                value={booking.numberOfAdults}
                                                placeholder="0" min={1}
                                                onChange={handleInputChange} />
                                            <Form.Control.Feedback type="invalid">
                                                Please select at least 1 adult.
                                            </Form.Control.Feedback>
                                        </div>

                                        <div className="col-6">
                                            <Form.Label htmlFor="numberOfChildren">Children: </Form.Label>
                                            <FormControl type="number"
                                                id="numberOfChildren"
                                                name="numberOfChildren"
                                                value={booking.numberOfChildren}
                                                min={0}
                                                defaultValue={0}
                                                placeholder="0"
                                                onChange={handleInputChange} />
                                        </div>

                                    </div>
                                </fieldset>

                                <div className="form-group mt-2 mb-2">
                                    <button type="submit" className="btn btn-danger">Continue</button>
                                </div>
                            </Form>
                        </div>
                    </div>
                    <div className="col-md-6">
                        {isSubmited && (
                            <BookingSummary booking={booking}
                                isFormValid={isValidated}
                                onConfirm={handleBooking}
                                payment={calculatePayment()} />
                        )}

                    </div>
                </div>
            </div>
        </>
    )
}
export default BookingForm
