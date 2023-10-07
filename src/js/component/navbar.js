import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<Link className="text-decoration-none" to="/">
				<span className="navbar-brand mb-0 mx-3 h1"> My Contact List</span>
			</Link>
			<div className="ml-auto">
				<Link to="/createContact">
					<button className="btn btn-success mx-3">Add new Contact</button>
				</Link>
			</div>
		</nav>
	);
};