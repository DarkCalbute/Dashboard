import React from 'react';
import Header from '../composition components/Header.jsx';
import { authentificationService } from "../services/authentification.service.js";
import { widgetService } from '../services/widget.service.js';
import CurrencyConverterWidget from '../composition components/CurrencyConverterWidget.jsx';
import WeatherWidget from '../composition components/WeatherWidget.jsx';
import YoutubeWidget from '../composition components/YoutubeWidget.jsx';
import TwitterWidget from '../composition components/TwitterWidget.jsx';

export default class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			componentsArray: []
		}
		authentificationService.isConnected();
		this.removeWidget = this.removeWidget.bind(this);
    	this.createCurrencyConverterWidget = this.createCurrencyConverterWidget.bind(this);
    	this.createWeatherWidget = this.createWeatherWidget.bind(this);
    	this.createYoutubeWidget = this.createYoutubeWidget.bind(this);
    	this.createTwitterWidget = this.createTwitterWidget.bind(this);
    	// eslint-disable-next-line
    	widgetService.retrieveWidget().then((res) => res.data.map((widget) => {
    	    if (widget.name === "CurrencyConverterWidget")
    	    	this.setState({componentsArray : [...this.state.componentsArray,{component: <CurrencyConverterWidget id={widget.widgetId} state={widget.state} data={JSON.parse(widget.data)} removeWidget={() => {this.removeWidget(widget.widgetId)}}/>, id: widget.widgetId}]})
    	    if (widget.name === "WeatherWidget")
    	    	this.setState({componentsArray : [...this.state.componentsArray,{component: <WeatherWidget id={widget.widgetId} state={widget.state} data={JSON.parse(widget.data)} removeWidget={() => {this.removeWidget(widget.widgetId)}}/>, id: widget.widgetId}]})
    	    if (widget.name === "YoutubeWidget")
    	    	this.setState({componentsArray : [...this.state.componentsArray,{component: <YoutubeWidget id={widget.widgetId} state={widget.state} data={JSON.parse(widget.data)} removeWidget={() => {this.removeWidget(widget.widgetId)}}/>, id: widget.widgetId}]})
			if (widget.name === "TwitterWidget")
    	    	this.setState({componentsArray : [...this.state.componentsArray,{component: <TwitterWidget id={widget.widgetId} state={widget.state} data={JSON.parse(widget.data)} removeWidget={() => {this.removeWidget(widget.widgetId)}}/>, id: widget.widgetId}]})
    	    }));
	}

	removeWidget(id) {
		let array = this.state.componentsArray;
		let index = array.findIndex((component) => {
			return (component.id === id);
		});
		array.splice(index, 1);
		this.setState({componentsArray : array});
		widgetService.deleteWidget(id);
	}

	createCurrencyConverterWidget() {
		let id = Date.now();
		this.setState({componentsArray : [...this.state.componentsArray,{component: <CurrencyConverterWidget id={id} state={0} data={"{}"} removeWidget={() => {this.removeWidget(id)}}/>, id: id}]});
		widgetService.addWidget('CurrencyConverterWidget', id, 0, '{}');
	}

	createWeatherWidget() {
		let id = Date.now();
		this.setState({componentsArray : [...this.state.componentsArray,{component: <WeatherWidget id={id} state={0} data={"{}"} removeWidget={() => {this.removeWidget(id)}}/>, id: id}]});
		widgetService.addWidget('WeatherWidget', id, 0, '{}');
	}

	createYoutubeWidget() {
		let id = Date.now();
		this.setState({componentsArray : [...this.state.componentsArray,{component: <YoutubeWidget id={id} state={0} data={"{}"} removeWidget={() => {this.removeWidget(id)}}/>, id: id}]});
		widgetService.addWidget('YoutubeWidget', id, 0, '{}');
	}

	createTwitterWidget() {
		let id = Date.now();
		this.setState({componentsArray : [...this.state.componentsArray,{component: <TwitterWidget id={id} state={0} data={"{}"} removeWidget={() => {this.removeWidget(id)}}/>, id: id}]});
		widgetService.addWidget('TwitterWidget', id, 0, '{}');
	}

	render() {
		return <div>
			<Header/>
			<div className="d-flex flex-row ml-3">
				<div className="btn-group py-3" role="group">
					<button type="button" onClick={this.createCurrencyConverterWidget} className="btn btn-info">CurrencyConverterWidget</button>
					<button type="button" onClick={this.createWeatherWidget} className="btn btn-primary">WeatherWidget</button>
					<button type="button" onClick={this.createYoutubeWidget} className="btn btn-danger">YoutubeWidget</button>
					<button type="button" onClick={this.createTwitterWidget} className="btn btn-primary">TwitterWidget</button>
				</div>
			</div>
			<div className="m-3">
				<div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
					{this.state.componentsArray.map((components, index) => <React.Fragment key={index}>
						{components.component}
					</React.Fragment>)}
				</div>
			</div>
		</div>
	}
}