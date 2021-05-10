import React from 'react';
import Field from "./Field.jsx";
import { widgetService } from '../services/widget.service.js';
import { weatherWidgetService } from '../services/weatherWidget.service.js';

export default class WeatherWidget extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			key: props.key,
			renderId: props.state,
			city: '',
			data: props.data,
			timeId: props.id
		}
    	this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.renderIdTo0 = this.renderIdTo0.bind(this);
	}

	handleChange(e) {
    	const name = e.target.name;
    	this.setState({
      		[name]: e.target.value,
    	});
  	}

	handleSubmit(e) {
		e.preventDefault();
		weatherWidgetService.current(this.state.city);
		setTimeout(() => {
			if (weatherWidgetService.data && weatherWidgetService.data.current) {
				this.setState({renderId: 1, data: weatherWidgetService.data});
				widgetService.updateWidget(this.state.timeId, this.state.renderId, JSON.stringify(this.state.data));
			} else
				this.setState({city: ''});
		}, 2000);
	}

	renderIdTo0() {
		this.setState({renderId: 0, data: "{}"});
		widgetService.updateWidget(this.state.timeId, 0, "{}");
	}

	isDisabled(state) {
    	return (
      		(state.city.length === 0) === true
    	);
  	}

	render() {
		if (this.state.renderId === 0) {
			return <div className="col mb-4">
				<div className="card bg-primary text-white">
					<div className="card-header d-flex justify-content-between">
						<h5 className="card-title">Weather Widget</h5>
						<button className="btn btn-dark" onClick={this.props.removeWidget}>Remove</button>
					</div>
					<div className="card-body">
						<form onSubmit={this.handleSubmit}>
							<Field name="city" 
								value={this.state.city} 
								onChange={this.handleChange}>
								City
							</Field>
							<input className="btn btn-dark ml-3" 
								disabled={this.isDisabled(this.state)}
          						type="submit"
          						value="Search"
        					/>
						</form>
					</div>
					<div className="card-footer">
					</div>
				</div>
			</div>
		}
		return <div className="col mb-4">
				<div className="card bg-primary text-white">
					<div className="card-header d-flex justify-content-between">
						<h5 className="card-title">Weather Widget</h5>
						<button className="btn btn-dark" onClick={this.renderIdTo0}>Reset</button>
					</div>
					<div className="card-body d-flex justify-content-around">
						<div>
							<h1>{this.state.data.request.query}, {this.state.data.location.country}</h1>
							<p>{this.state.data.location.localtime}</p>
							<p>The temperature in this city is {this.state.data.current.temperature}C°</p>
							<p>L'humidité est de {this.state.data.current.humidity}%</p>
						</div>
						<div>
							<img src={this.state.data.current.weather_icon} className="img-fluid" alt="icon local weather"/>
						</div>
					</div>
					<div className="card-footer">
					</div>
				</div>
			</div>
	}
}