import React from 'react';
// import { youtubeWidgetService } from '../services/youtubeWidget.service.js';

export default class YoutubeWidget extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			key: props.key,
			renderId: props.state,
			data: props.data,
			timeId: props.id
		}
    	this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
    	const name = e.target.name;
    	this.setState({
      		[name]: e.target.value,
    	});
  	}

	handleSubmit(e) {
		e.preventDefault();
	}

	render() {
		if (this.state.renderId === 0) {
			return <div className="col mb-4">
				<div className="card bg-danger text-white">
					<div className="card-header d-flex justify-content-between">
						<h5 className="card-title">Youtube Widget</h5>
						<button className="btn btn-dark" onClick={this.props.removeWidget}>Remove</button>
					</div>
					<div className="card-body">
					</div>
					<div className="card-footer">
					</div>
				</div>
			</div>
		}
		return <div className="col mb-4">
				<div className="card bg-danger text-white">
					<div className="card-header d-flex justify-content-between">
						<h5 className="card-title">Youtube Widget</h5>
					</div>
					<div className="card-body d-flex justify-content-around">
					</div>
					<div className="card-footer">
					</div>
				</div>
			</div>
	}
}