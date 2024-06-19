import { parseISO } from "date-fns"
import { useEffect, useState } from "react"
import DateSlider from "../common/DateSlider"

function BookingsTable({ bookingInfo, handleBookingCancellation }) {
    const [filterBookings, setFilterBookings] = useState(bookingInfo)
    const filterBooking = (startDate, endDate) => {
        let filtered = bookingInfo
        if (startDate && endDate) {
            filtered = bookingInfo.filter((booking) => {
                const bookingStartDate = parseISO(booking.checkIndate)
                const bookingEndDate = parseISO(booking.checkOutdate)
                return bookingStartDate >= startDate && bookingEndDate <= endDate && bookingEndDate > startDate

            })
        }
        setFilterBookings(filtered)
    }

    useEffect(() => {
        setFilterBookings(bookingInfo)
    }, [bookingInfo])

    return (
        <>
            <section className="p-4">
                <DateSlider onDateChange={filterBooking} onFilterChange={filterBooking} />
                <table>
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Booking Id</th>
                            <th>Room Id</th>
                            <th>Check-In date</th>
                            <th>Check-Out date</th>
                            <th>Guest Name</th>
                            <th>Guest Email</th>
                            <th>Adults</th>
                            <th>Chilren</th>
                            <th>Total Guest</th>
                            <th>Confirmation Code</th>
                            <th colSpan={2}>Actions</th>
                        
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {filterBookings.map((booking, index) => {
                            <tr key={booking.id}>
                                <td>{index + 1}</td>
                                <td>{booking.id}</td>
                                <td>{booking.room.id}</td>
                                <td>{booking.checkIndate}</td>
                                <td>{booking.checkOutdate}</td>
                                <td>{booking.numberOfAdults}</td>
                                <td>{booking.numberOfChildren}</td>
                                <td>{booking.totalNumOfGuest}</td>
                                <td>{booking.confirmationCode}</td>
                                <td>
                                    <button className="btn-danger" onClick={() => handleBookingCancellation(booking.id)}>
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
                {filterBooking === 0 && <p>No booking found from the selected dates</p>}
            </section>
        </>
    )
}
export default BookingsTable