import axios from 'axios';
import { BASE_URL } from '../index.js';

const apiKey = "2e5fcdab0565c0e9a05461d9d6652faa";
var data;

export const weatherWidgetService = {
	current,
	data
};

function current(city) {
	return axios.post(BASE_URL + '/widget/weatherWidget/current', { apiKey, city })
	.then((res) => {
		weatherWidgetService.data = res.data;
	})
}