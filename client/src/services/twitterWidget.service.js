import axios from 'axios';
import { BASE_URL } from '../index.js';

export const twitterWidgetService = {
	homeTimeline,
	retweet,
	unretweet,
	favorite,
	unfavorite
};

var count = 0;

function homeTimeline() {
	count += 20;

	return axios.post(BASE_URL + '/widget/TwitterWidget/home_timeline/', { count });
}

function retweet(id) {
	return axios.post(BASE_URL + '/widget/TwitterWidget/retweet/', { id })
}

function unretweet(id) {
	return axios.post(BASE_URL + '/widget/TwitterWidget/unretweet/', { id });
}

function favorite(id) {
	return axios.post(BASE_URL + '/widget/TwitterWidget/favorite/', { id });
}

function unfavorite(id) {
	return axios.post(BASE_URL + '/widget/TwitterWidget/unfavorite/', { id });
}

/*
**	api-key: ldEV4lITa6EPKtcCJsVBIa9D9
**	api-secret: u6rRegetr6BQTP1VZkbOAPqp9cDbj1WdP6JddaEe5a579mKEfw
**
**	bearer: AAAAAAAAAAAAAAAAAAAAAK2zLwEAAAAA3HHUkmXYWtEj4SsGlXm49S45U7A%3D14OLIkz3IvERvAmlDYnyOkOleUFFlwTaqNd8xE5dJhQIlM7j0p
**	access-token: 1176510811948355584-3YzWbeSpQiSSR259jmTQPNTZkedeWG
**	access-token-secret: MRzvVkUbvOCtPcas4nw0erfZ55meZqkKPzFY9gjeOJbMe
*/