import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<React.Fragment>
			<div className="bg-warning p-3 w-100 d-flex align-items-center justify-content-between">
				<Link
					to="/students"
					style={{ textDecoration: "none", color: "inherit" }}>
					<button className="btn btn-primary">Students</button>
				</Link>
				<Link
					to="/teachers"
					style={{ textDecoration: "none", color: "inherit" }}>
					<button className="btn btn-dark">Teacher</button>
				</Link>
				<Link to="/marks" style={{ textDecoration: "none", color: "inherit" }}>
					<button className="btn btn-success">Marks</button>
				</Link>
			</div>
		</React.Fragment>
	);
};

export default Navbar;
