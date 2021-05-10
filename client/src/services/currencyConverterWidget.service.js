import axios from 'axios';
import { BASE_URL } from '../index.js';

var data;

export const currencyConverterWidgetService = {
	baseConverter,
	data
};

function baseConverter(base, widgetId) {
	return axios.post(BASE_URL + '/widget/currencyConverterWidget/baseConverter', { base })
	.then((res) => {
		currencyConverterWidgetService.data = res.data;
	})
}