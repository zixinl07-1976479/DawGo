import React from "react";
import { Link } from "react-router-dom";

export default function NavLinks() {
	return (
		<div className="navigations col col-lg-3">
			<nav className="navbar navbar-expand navbar-light">
				<div className="navbar-nav" id="navbarSupportedContent">
					<ul
						className="navbar-nav navbar-expand-sm navbar-light me-auto mb-2 mb-lg-0"
						id="navIcon"
					>
						<li className="nav-item">
							<Link
								className="nav-link"
								to="/post"
								data-toggle="tooltip"
								data-placement="bottom"
								title="Post Item"
							>
                <span>
								<i className="bi bi-plus-circle"></i>
                </span>
                <span>Post Item</span>
							</Link>
						</li>

						<li className="nav-item">
							<Link
								className="nav-link"
								to="/savedItems"
								data-toggle="tooltip"
								data-placement="bottom"
								title="Saved Items"
							>
                <span>
								<i className="bi bi-heart"></i>
                </span>
                <span>Saved Items</span>
							</Link>
						</li>

						<li className="nav-item">
							<Link
								className="nav-link"
								to="/personal"
								data-toggle="tooltip"
								data-placement="bottom"
								title="Personal Center"
							>
								<span>
									<i className="bi bi-person-circle"></i>
								</span>
								<span>Personal Center</span>
							</Link>
						</li>

						<li className="nav-item">
							<Link
								className="nav-link"
								to="/support"
								data-toggle="tooltip"
								data-placement="bottom"
								title="Supports"
							>

                <span>
								<i className="bi bi-question-circle"></i>
                </span>
                <span>Support</span>
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
}
