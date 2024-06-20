import { Link } from "react-router-dom"

function Admin() {
    return (
        <>
            <section className="container mt-5 ">
                <h2>Welcome to Admin Panel</h2>
                <hr />
                <Link className="btn btn-info" to={"/add-room"}>
                    Add room
                </Link>

                <Link to={"/existing-rooms"} className="btn btn-danger">
                Existing rooms
                </Link>

                <Link className="btn btn-primary" to={"/existing-bookings"}>
                    Existing Booking
                </Link>
            </section>
        </>
    )
}
export default Admin