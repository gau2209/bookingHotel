import { useState } from "react"
import { RegisterUser } from "../utils/APIConfig"
import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"

const Registration = () => {
    const [registration, setRegistration] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    })
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")


    const handleInputChange = (e) => {
        const { name, value } = e.target
        setRegistration({ ...registration, [name]: value })
    }

    const handleRegistration = async (e) => {
        e.preventDefault()
        try {
            const res = await RegisterUser(registration)
            setRegistration(res)
            console.log("res: ",res)
            setErrorMessage("")
            setRegistration({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
            })
        } catch (error) {
            setSuccessMessage("")
            setErrorMessage("Registration fail")
        }
        setTimeout(() => {
            setErrorMessage("")
            setSuccessMessage("")
        }, 4000);
    }
console.log("registration: ",registration)

    return (
        <>
            <section className="container col-6 mt-5 mb-5">
                {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
                {successMessage && <p className="alert alert-danger">{successMessage}</p>}
                 <h2>Register</h2>
                 <form onSubmit={handleRegistration}>
                 <div className="row mb-3">
                        <label htmlFor="firstName" className="col-sm-2 col-form-label">firstName</label>
                        <div>
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                className="form-control"
                                value={registration.firstName}
                                onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="lastName" className="col-sm-2 col-form-label">lastName</label>
                        <div>
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                className="form-control"
                                value={registration.lastName}
                                onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                        <div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className="form-control"
                                value={registration.email}
                                onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                        <div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className="form-control"
                                value={registration.password}
                                onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="mb-3">
                        <button type="btn btn-hotel" typeof="submit" style={{ marginRight: "10px" }}>
                            Submit
                        </button>
                        <span style={{ marginLeft: "10px" }}>Already have an account?<Link to={"/login"}>Login</Link></span>
                    </div>

                 </form>
            </section>
        </>
    )

}
export default Registration