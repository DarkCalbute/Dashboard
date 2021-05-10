import axios from 'axios';
import { BASE_URL } from '../index.js';

export const widgetService = {
	addWidget,
	retrieveWidget,
	updateWidget,
	deleteWidget
};

function addWidget(name, widgetId, state, data) {
	var user = JSON.parse(localStorage.getItem('currentUser')).username;
	return axios.post(BASE_URL + '/account/addWidget', { name, widgetId, user, state, data });
}

function retrieveWidget() {
	var user = JSON.parse(localStorage.getItem('currentUser')).username;
	return axios.post(BASE_URL + '/account/retrieveWidget', { user });
}

function updateWidget(widgetId, state, data) {
	var user = JSON.parse(localStorage.getItem('currentUser')).username;
	return axios.post(BASE_URL + '/account/updateWidget', { widgetId , user , state, data });
}

function deleteWidget(widgetId) {
	var user = JSON.parse(localStorage.getItem('currentUser')).username;
	return axios.post(BASE_URL + '/account/deleteWidget', { widgetId, user });
}