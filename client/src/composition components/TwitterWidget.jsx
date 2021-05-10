import React from 'react';
import Tweet from './Tweet.jsx'
import { twitterWidgetService } from '../services/twitterWidget.service.js';

export default class TwitterWidget extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			key: props.key,
			renderId: props.state,
			data: props.data,
			timeId: props.id,
			tweetArray: []
		}
		this.getTweets = this.getTweets.bind(this);
	}

	componentDidMount() {
		this.getTweets();
	}

	getTweets() {
		this.setState({tweetArray: []});
		// eslint-disable-next-line
		twitterWidgetService.homeTimeline().then((res) => res.data.map((tweet) => {
    		this.setState({tweetArray : [...this.state.tweetArray, <Tweet data={tweet}/>]});
		}));
	}

	render() {
		if (localStorage.getItem('AuthentificationWith') !== 'Twitter') {
			return <div className="col mb-4">
				<div className="card bg-primary text-white">
					<div className="card-header d-flex justify-content-between">
						<h5 className="card-title">Twitter Widget</h5>
						<button className="btn btn-dark" onClick={this.props.removeWidget}>Remove</button>
					</div>
					<div className="card-body">
						<p>Please connect with your twitter account to use this widget</p>
					</div>
					<div className="card-footer">
					</div>
				</div>
			</div>
		}
		return <div className="col mb-4">
			<div className="card bg-primary text-white">
				<div className="card-header d-flex justify-content-between">
					<h5 className="card-title">Twitter Widget</h5>
					<button className="btn btn-dark" onClick={this.props.removeWidget}>Remove</button>
				</div>
				<div className="card-body overflow-auto" style={{height: 680}}>
					{this.state.tweetArray.map((tweet, index) => <React.Fragment key={index}>
						{tweet}
					</React.Fragment>)}
					<div className="d-flex justify-content-around">
						<button className="btn btn-dark" onClick={this.getTweets}>Load next Tweets</button>
					</div>
				</div>
				<div className="card-footer">
				</div>
			</div>
		</div>
	}
}