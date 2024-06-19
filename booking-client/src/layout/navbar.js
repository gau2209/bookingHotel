import React, { useState } from "react"
import { NavLink, Link } from "react-router-dom"



const NavBar = () => {
	// const [showAccount, setShowAccount] = useState(false)

	// const handleAccountClick = () => {
	// 	setShowAccount(!showAccount)
	// }

	// const isLoggedIn = localStorage.getItem("token")
	// const userRole = localStorage.getItem("userRole")

	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 sticky-top">
			<div className="container-fluid">
				<Link to={"/"} className="navbar-brand">
					<span className="hotel-color">lakeSide Hotel</span>
				</Link>

				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarScroll"
					aria-controls="navbarScroll"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarScroll">
					<ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
						<li className="nav-item">
							<NavLink className="nav-link" aria-current="page" to={"/browse-all-rooms"}>
								Browse all rooms
							</NavLink>
						</li>

						{/* {isLoggedIn && userRole === "ROLE_ADMIN" && (
							<li className="nav-item">
								<NavLink className="nav-link" aria-current="page" to={"/admin"}>
									Admin
								</NavLink>
							</li>
						)} */}

						<li className="nav-item">
							<NavLink className="nav-link" aria-current="page" to={"/admin"}>
								Admin
							</NavLink>
						</li>

					</ul>

					<ul className="d-flex navbar-nav">
						<li className="nav-item">
							<NavLink className="nav-link" to={"/"}>
								Find my booking
							</NavLink>
						</li>
					</ul>

					<div class="dropdown">
						<a class="btn btn-info dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
							Account
						</a>

						<ul class="dropdown-menu">
							<li><a class="dropdown-item" href="#">Login</a></li>
							<li><a class="dropdown-item" href="#">Profile</a></li>
							<hr/>
							<li><a class="dropdown-item" href="#">Logout</a></li>
						</ul>
					</div>
				</div>
			</div>
		</nav>
	)
}

export default NavBar
