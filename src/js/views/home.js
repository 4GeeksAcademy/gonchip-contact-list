import React from "react";
import "../../styles/home.css";

export const Home = () => (
	<div className= "container d-flex justify-content-center align-items-center">
		<div className="card mb-3" style={{ maxWidth: "840px" }}>
			<div className="row g-0">
				<div className="col-md-4">
					<img
						src="https://picsum.photos/id/64/4326/4000"
						className="img-fluid rounded-circle p-4"
						alt="Descripción de la imagen"
					/>
				</div>
				<div className="col-md-8">
					<div className="card-body">
						<h5 className="card-title">Martina Suarez</h5>
						<p className="card-text">
							This is a wider card with supporting text below as a natural
							lead-in to additional content. This content is a little bit longer.
						</p>
						<p className="card-text">
							<small className="text-body-secondary">Last updated 3 mins ago</small>
						</p>
					</div>
				</div>
			</div>
		</div>
		</div>
);
