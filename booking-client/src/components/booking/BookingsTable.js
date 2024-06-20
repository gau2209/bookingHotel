import { parseISO } from "date-fns"
import { useEffect, useState } from "react"
import DateSlider from "../common/DateSlider"

function BookingsTable({ bookingInfo, handleBookingCancellation }) {
    const [filterBookings, setFilterBookings] = useState(bookingInfo)

    const filterBooking = (startDate, endDate) => {
        let filtered = bookingInfo
        if (startDate && endDate) {
            filtered = bookingInfo.filter((booking) => {
                const bookingStartDate = parseISO(booking.checkInDate)
                const bookingEndDate = parseISO(booking.checkOutDate)
                return bookingStartDate >= startDate && bookingEndDate <= endDate && bookingEndDate > startDate

            })
        }
        setFilterBookings(filtered)
    }

    useEffect(() => {
        setFilterBookings(bookingInfo)
    }, [])


    return (
        <>
            <section className="p-4">
                <DateSlider onDateChange={filterBooking} onFilterChange={filterBooking} />
                <table className="table table-bordered table-hover shadow">
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Booking Id</th>
                            <th>Room Id</th>
                            <th>Room Type</th>
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
                            return (
                                <>
                                    <tr key={booking.id}>
                                        <td>{index + 1}</td>
                                        <td>{booking.id}</td>
                                        <td>{booking.room.id}</td>
                                        <td>{booking.room.roomType}</td>
                                        <td>{booking.checkInDate}</td>
                                        <td>{booking.checkOutDate}</td>
                                        <td>{booking.guestName}</td>
                                        <td>{booking.guestEmail}</td>
                                        <td>{booking.numOfAdults}</td>
                                        <td>{booking.numOfChildren}</td>
                                        <td>{booking.totalNumOfGuests}</td>
                                        <td>{booking.bookingConfirmationCode}</td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => handleBookingCancellation(booking.id)}>
                                                Cancel
                                            </button>
                                        </td>
                                    </tr>
                                </>
                            )
                        })}
                    </tbody>
                </table>
                {filterBooking === 0 && <p>No booking found from the selected dates</p>}
            </section>
        </>
    )
}
export default BookingsTable