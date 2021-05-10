import React from 'react';
import '../views.css';
import { twitterWidgetService } from '../services/twitterWidget.service.js';

export default class Tweet extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: props.data,
			time: '',
			contentsArray: []
		}
		this.retweet = this.retweet.bind(this);
		this.favorite = this.favorite.bind(this);
	}

	componentDidMount() {
		var arrayTime = this.state.data.created_at.split(' ');
		var time = '';
		var date = new Date();
		if (date.getFullYear().toString() === arrayTime[5])
			time = arrayTime[0] + ' ' + arrayTime[1] + ' ' + arrayTime[2] + ' ' + arrayTime[3];
		else
			time = arrayTime[1] + ", " + arrayTime[5];
		this.setState({time: time});

		if (this.state.data.extended_entities !== undefined) {
			var imgArray = [];
    		// eslint-disable-next-line
			this.state.data.extended_entities.media.map((image, index) => {
				imgArray = [...imgArray, <img key={index} src={image.media_url} className="img-fluid" alt="tweet content img"/>];
			});
			this.setState({contentsArray : imgArray});
		}
	}

	retweet() {
		var newData = this.state.data;
		if (this.state.data.retweeted) {
			twitterWidgetService.unretweet(this.state.data.id_str);
			newData.retweeted = false;
			newData.retweet_count--;
		} else {
			twitterWidgetService.retweet(this.state.data.id_str);
			newData.retweeted = true;
			newData.retweet_count++;
		}
		this.setState({data: newData});
	}

	favorite() {
		var newData = this.state.data;
		if (this.state.data.favorited) {
			twitterWidgetService.unfavorite(this.state.data.id_str);
			newData.favorited = false;
			newData.favorite_count--;
		} else {
			twitterWidgetService.favorite(this.state.data.id_str);
			newData.favorited = true;
			newData.favorite_count++;
		}
		this.setState({data: newData});
	}

	render() {
		return <div className="card bg-dark text-white mb-2 my-2">
			<div className="card-header d-flex">
				<div className="mr-2">
					<img src={this.state.data.user.profile_image_url} alt="profile_img"/>
				</div>
				<div>
					<h3>{this.state.data.user.name}</h3>
					<p className="pg">@{this.state.data.user.screen_name}</p>
				</div>
				<div className="ml-auto">
					<p>{this.state.time}</p>
				</div>
			</div>
			<div className="card-body">
				<p>{this.state.data.text}</p>
				<div>
					{this.state.contentsArray.map((content, index) => <React.Fragment key={index}>
						{content}
					</React.Fragment>)}
				</div>
			</div>
			<div className="card-footer" style={{height: 50}}>
				<div className="d-flex justify-content-around">
					<div className="d-flex" role="button" onClick={this.retweet}>
						{this.state.data.retweeted ? <svg className="ret" viewBox="0 0 24 24" style={{height: 25}}><g><path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path></g></svg> : <svg className="non-ret" viewBox="0 0 24 24" style={{height: 25}}><g><path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path></g></svg>}
						{this.state.data.retweeted ? <p className="retp">&nbsp;{this.state.data.retweet_count}</p> : <p className="non-retp">&nbsp;{this.state.data.retweet_count}</p>}
					</div>
					<div className="d-flex" role="button" onClick={this.favorite}>
						{this.state.data.favorited ? <svg className="fav" viewBox="0 0 24 24" style={{height: 25}}><g><path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12z"></path></g></svg> : <svg className="non-fav" viewBox="0 0 24 24" style={{height: 25}}><g><path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path></g></svg>}
						{this.state.data.favorited ? <p className="favp">&nbsp;{this.state.data.favorite_count}</p> : <p className="non-favp">&nbsp;{this.state.data.favorite_count}</p>}
					</div>
				</div>
			</div>
		</div>
	}
}