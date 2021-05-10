import React from 'react';
import { authentificationService } from "../services/authentification.service.js";

export default class Header extends React.Component {
	render() {
		return <div>
			<nav className="navbar navbar-expend-sm navbar-dark bg-dark mb-2 py-0">
				<div className="container">
					<a href="/" className="navbar-brand mx-1">Dashboard</a>
				</div>
				<div className="d-flex flex-row">
					<div className="btn-group py-3" role="group">
						<button type="button" onClick={authentificationService.logout} className="btn btn-secondary">Logout</button>
						<button type="button" onClick={authentificationService.unregister} className="btn btn-secondary">Unregister</button>
					</div>
				</div>
			</nav>
		</div>
	}
}