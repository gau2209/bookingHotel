import { useContext, useState } from "react"
import { loginUser } from "../utils/APIConfig"
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom"
import { AuthContext } from "./AuthProvider"

const Login=()=> {
    const [errorMessage, setErrorMessage] = useState("")
    const [login, setLogin] = useState({
        email: "",
        password: "",
    })
    const nav = useNavigate()
    const [q] = useSearchParams();
    const {handleLogin} = useContext(AuthContext)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setLogin({ ...login, [name]: value })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await loginUser(login)

        if (res) {
            const token = res.token
            handleLogin(token)
            nav("/")
        }
        else {
            setErrorMessage("Invalid username or password. Please try again")
        }
        setTimeout(() => {
            setErrorMessage("")
        }, 3000)
    }

    return (
        <>
            <section className="container col-6 mt-5 mb -6">
                {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>

                    <div className="row mb-3">
                        <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                        <div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className="form-control"
                                value={login.email}
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
                                value={login.password}
                                onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="mb-3 ">
                        <button type="btn btn-danger" typeof="submit" style={{ marginRight: "10px" }}>
                            Login
                        </button>
                        <span style={{ marginLeft: "10px" }}>Don't have an account yet?<Link to={"/register"}>Register</Link></span>
                    </div>

                </form>
            </section>
        </>
    )
}
export default Login