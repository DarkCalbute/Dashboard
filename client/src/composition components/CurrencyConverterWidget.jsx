import React from 'react';
import { widgetService } from '../services/widget.service.js';
import { currencyConverterWidgetService } from '../services/currencyConverterWidget.service.js';

export default class CurrencyConverterWidget extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			key: props.key,
			renderId: props.state,
			currency: '',
			data: props.data,
			timeId: props.id
		}
		this.getCurrency = this.getCurrency.bind(this);
		this.renderIdTo0 = this.renderIdTo0.bind(this);
	}

	getCurrency(cur) {
		this.setState({currency: cur});
		currencyConverterWidgetService.baseConverter(cur, this.state.timeId);
		setTimeout(() => {
			if (currencyConverterWidgetService.data && currencyConverterWidgetService.baseConverter) {
				this.setState({renderId: 1, data: currencyConverterWidgetService.data});
				widgetService.updateWidget(this.state.timeId, this.state.renderId, JSON.stringify(this.state.data));
			}
		}, 2000);
	}

	renderIdTo0() {
		this.setState({renderId: 0, data: "{}"});
		widgetService.updateWidget(this.state.timeId, 0, "{}");
	}

	render() {
		if (this.state.renderId === 0) {
			return <div className="col mb-4">
				<div className="card bg-info text-white">
					<div className="card-header d-flex justify-content-between">
						<h5 className="card-title">Currency Converter Widget</h5>
						<button className="btn btn-dark" onClick={this.props.removeWidget}>Remove</button>
					</div>
					<div className="card-body">
						<div className="row row-cols-6 row-cols-md-4 row-cols-xl-8 g-4">
        					<button className="btn btn-light mx-1 my-1" onClick={() => this.getCurrency("AUD")}>AUD</button>
        					<button className="btn btn-light mx-1 my-1" onClick={() => this.getCurrency("BGN")}>BGN</button>
        					<button className="btn btn-light mx-1 my-1" onClick={() => this.getCurrency("BRL")}>BRL</button>
        					<button className="btn btn-light mx-1 my-1" onClick={() => this.getCurrency("CAD")}>CAD</button>
        					<button className="btn btn-light mx-1 my-1" onClick={() => this.getCurrency("CHF")}>CHF</button>
        					<button className="btn btn-light mx-1 my-1" onClick={() => this.getCurrency("CNY")}>CNY</button>
        					<button className="btn btn-light mx-1 my-1" onClick={() => this.getCurrency("CZK")}>CZK</button>
        					<button className="btn btn-light mx-1 my-1" onClick={() => this.getCurrency("DKK")}>DKK</button>
        					<button className="btn btn-light mx-1 my-1" onClick={() => this.getCurrency("EUR")}>EUR</button>
        					<button className="btn btn-light mx-1 my-1" onClick={() => this.getCurrency("GBP")}>GBP</button>
        					<button className="btn btn-light mx-1 my-1" onClick={() => this.getCurrency("HKD")}>HKD</button>
        					<button className="btn btn-light mx-1 my-1" onClick={() => this.getCurrency("HRK")}>HRK</button>
        					<button className="btn btn-light mx-1 my-1" onClick={() => this.getCurrency("HUF")}>HUF</button>
        					<button className="btn btn-light mx-1 my-1" onClick={() => this.getCurrency("IDR")}>IDR</button>
        					<button className="btn btn-light mx-1 my-1" onClick={() => this.getCurrency("ILS")}>ILS</button>
        					<button className="btn btn-light mx-1 my-1" onClick={() => this.getCurrency("ISK")}>ISK</button>
        					<button className="btn btn-light mx-1 my-1" onClick={() => this.getCurrency("INR")}>INR</button>
        					<button className="btn btn-light mx-1 my-1" onClick={() => this.getCurrency("ISK")}>ISK</button>
        					<button className="btn btn-light mx-1 my-1" onClick={() => this.getCurrency("JPY")}>JPY</button>
        					<button className="btn btn-light mx-1 my-1" onClick={() => this.getCurrency("KRW")}>KRW</button>
        					<button className="btn btn-light mx-1 my-1" onClick={() => this.getCurrency("MWN")}>MWN</button>
        					<button className="btn btn-light mx-1 my-1" onClick={() => this.getCurrency("MYR")}>MYR</button>
        					<button className="btn btn-light mx-1 my-1" onClick={() => this.getCurrency("NZD")}>NZD</button>
        					<button className="btn btn-light mx-1 my-1" onClick={() => this.getCurrency("PHP")}>PHP</button>
        					<button className="btn btn-light mx-1 my-1" onClick={() => this.getCurrency("PLN")}>PLN</button>
        					<button className="btn btn-light mx-1 my-1" onClick={() => this.getCurrency("RON")}>RON</button>
        					<button className="btn btn-light mx-1 my-1" onClick={() => this.getCurrency("RUB")}>RUB</button>
        					<button className="btn btn-light mx-1 my-1" onClick={() => this.getCurrency("SEK")}>SEK</button>
        					<button className="btn btn-light mx-1 my-1" onClick={() => this.getCurrency("SGD")}>SGD</button>
        					<button className="btn btn-light mx-1 my-1" onClick={() => this.getCurrency("THB")}>THB</button>
        					<button className="btn btn-light mx-1 my-1" onClick={() => this.getCurrency("TRY")}>TRY</button>
        					<button className="btn btn-light mx-1 my-1" onClick={() => this.getCurrency("USD")}>USD</button>
        					<button className="btn btn-light mx-1 my-1" onClick={() => this.getCurrency("ZAR")}>ZAR</button>
        				</div>
					</div>
					<div className="card-footer">
					</div>
				</div>
			</div>
		}
		return <div className="col mb-4">
				<div className="card bg-info text-white">
					<div className="card-header d-flex justify-content-between">
						<h5 className="card-title">Currency Converter Widget</h5>
						<button className="btn btn-dark" onClick={this.renderIdTo0}>Reset</button>
					</div>
					<div className="card-body d-flex justify-content-around">
						<div className="row row-cols-3 row-cols-md-2 row-cols-xl-3 g-4">
							<p>AUD: {this.state.data.rates.AUD}</p>
							<p>BGN: {this.state.data.rates.BGN}</p>
							<p>BRL: {this.state.data.rates.BRL}</p>
							<p>CAD: {this.state.data.rates.CAD}</p>
							<p>CHF: {this.state.data.rates.CHF}</p>
							<p>CNY: {this.state.data.rates.CNY}</p>
							<p>CZK: {this.state.data.rates.CZK}</p>
							<p>DKK: {this.state.data.rates.DKK}</p>
							<p>EUR: {this.state.data.rates.EUR}</p>
							<p>GBP: {this.state.data.rates.GBP}</p>
							<p>HKD: {this.state.data.rates.HKD}</p>
							<p>HRK: {this.state.data.rates.HRK}</p>
							<p>HUF: {this.state.data.rates.HUF}</p>
							<p>IDR: {this.state.data.rates.IDR}</p>
							<p>ILS: {this.state.data.rates.ILS}</p>
							<p>INR: {this.state.data.rates.INR}</p>
							<p>ISK: {this.state.data.rates.ISK}</p>
							<p>JPY: {this.state.data.rates.JPY}</p>
							<p>KRW: {this.state.data.rates.KRW}</p>
							<p>MXN: {this.state.data.rates.MXN}</p>
							<p>MYR: {this.state.data.rates.MYR}</p>
							<p>NOK: {this.state.data.rates.NOK}</p>
							<p>NZD: {this.state.data.rates.NZD}</p>
							<p>PHP: {this.state.data.rates.PHP}</p>
							<p>PLN: {this.state.data.rates.PLN}</p>
							<p>RON: {this.state.data.rates.RON}</p>
							<p>RUB: {this.state.data.rates.RUB}</p>
							<p>SEK: {this.state.data.rates.SEK}</p>
							<p>SGD: {this.state.data.rates.SGD}</p>
							<p>THB: {this.state.data.rates.THB}</p>
							<p>TRY: {this.state.data.rates.TRY}</p>
							<p>USD: {this.state.data.rates.USD}</p>
							<p>ZAR: {this.state.data.rates.ZAR}</p>
						</div>
					</div>
					<div className="card-footer">
					</div>
				</div>
			</div>
	}
}