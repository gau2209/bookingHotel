import { Link } from "react-router-dom"

function Admin() {
    return (
        <>
            <section className="container mt-5 ">
                <h2>Welcome to Admin Panel</h2>
                <hr />
                <Link to={"/add-room"}>
                    Manage room
                </Link>

                <Link to={"/existing-rooms"} className="btn btn-danger">
                Existing rooms
                </Link>
            </section>
        </>
    )
}
export default Admin