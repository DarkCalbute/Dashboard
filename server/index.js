/*
**	Variables
*/

const express = require('express');
var cookieParser = require('cookie-parser')
const { body } = require('express-validator');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
var mysql = require('mysql');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
const uuid = require('uuid');
const crypto = require('crypto');
const OAuth = require('oauth');
const app = express();
const port = 8080;

/*
**	Variables
*/

/*
**	MiddleWare
*/

var twitterProfile;
var TWITTER_CONSUMER_KEY = "ldEV4lITa6EPKtcCJsVBIa9D9";
var TWITTER_CONSUMER_SECRET = "u6rRegetr6BQTP1VZkbOAPqp9cDbj1WdP6JddaEe5a579mKEfw";
var TWITTER_TOKEN, TWITTER_TOKEN_SECRET;

passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: "/auth/twitter/callback"
  },function(token, tokenSecret, profile, done) {
  	twitterProfile = profile;
  	TWITTER_TOKEN = token;
  	TWITTER_TOKEN_SECRET = tokenSecret;
  	return done(null, profile);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.use(cookieParser());
app.use(session({
	secret: 'session',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cors({
	credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, () => console.log(`Dashboard listening on port ${port}!`))

/*
**	MiddleWare
*/

/*
**	About.json
*/

app.get("/about.json", (req, res) => {
	var json = {
		client: {
			host: req.ip
		},
		server: {
			current_time: Date.now(),
			services: [{
				name: "Currency_converter",
				description: "Display the value of a currency compared other currency",
				params: [{}]
			},
			{
				name: "Weather",
				description: "Display weather information for a city",
				params: [{
					name: "city",
					type: "string"
				}]		
			},
			{
				name: "Twitter",
				description: "Display the user timeline and give him the option to retweet or like a post",
				params: [{}]
			}]
		}
	};
	res.send(json);
});

/*
**	About.json
*/

/*
**	Authentification
*/

app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback', passport.authenticate('twitter', { successRedirect: '/auth/twitter/login/success', failureRedirect: 'http://localhost:8092/signin' }));

app.get('/auth/twitter/login/success', (req, res) => {
    res.cookie('user', twitterProfile.username);
    res.cookie('AuthentificationWith', 'Twitter');
	res.redirect('http://localhost:8092/home');
});

/*
**	Authentification
*/

/*
**	Routes Account
*/

app.get("/account", (req, res) => {
	var connection = mysql.createConnection({
		host: 'database',
		port: '3306',
		user: 'dashboard',
		password: 'dashboard',
		database: 'dashboard'
	});
	connection.connect();
	connection.query('SELECT * FROM user', (err, resDB) => {
		if (err) {
			res.sendStatus(400);
			throw err;
		}
		res.status = 200;
		res.json(resDB);
		connection.end();
	});
});

app.post("/account/signin", (req, res) => {
	var connection = mysql.createConnection({
		host: 'database',
		port: '3306',
		user: 'dashboard',
		password: 'dashboard',
		database: 'dashboard'
	});
	connection.connect();
	connection.query('SELECT * FROM user WHERE ( username = \'' + req.body.user + '\' OR email = \'' + req.body.user + '\' ) AND password = \'' + req.body.password + '\'', (err, resDB) => {
		if (err) {
			res.sendStatus(400);
			throw err;
		}
        if (!resDB[0]) {
			res.sendStatus(400);
        }
		let data = resDB[0];
		res.send(data);
		connection.end();
	});
});

app.post("/account/signup", [
	body('email').not().isEmpty().isEmail().normalizeEmail(),
	body('username').not().isEmpty().trim().escape(),
	body('password').not().isEmpty().trim().escape()
	], (req, res) => {
	var connection = mysql.createConnection({
		host: 'database',
		port: '3306',
		user: 'dashboard',
		password: 'dashboard',
		database: 'dashboard'
	});
	connection.connect();
	connection.query('INSERT INTO user VALUES(0,\'' + req.body.username + '\' ,\'' + req.body.email + '\' ,\'' + req.body.password + '\');', (err, resDB1) => {
		if (err) {
			res.sendStatus(400);
			throw err;
		}
		connection.query('SELECT * FROM user WHERE username = \'' + req.body.username + '\' AND email = \'' + req.body.email + '\' AND password = \'' + req.body.password + '\';', (err, resDB2) => {
			if (err) {
				res.sendStatus(400);
				throw err;
			}
			let data = resDB2[0];
			res.send(data);
			connection.end();
		});
	});
});

app.post("/account/delete", [
	body('user').not().isEmpty()
	], (req, res) => {
	var connection = mysql.createConnection({
		host: 'database',
		port: '3306',
		user: 'dashboard',
		password: 'dashboard',
		database: 'dashboard'
	});
	connection.connect();
	connection.query('DELETE FROM user WHERE username = \'' + req.body.username + '\' AND email = \'' + req.body.email + '\' AND password = \'' + req.body.password + '\';', (err, resDB) => {
		if (err) {
			res.sendStatus(400);
			throw err;
		}
		res.sendStatus(200);
		connection.end();
	});
});

/*
**	Routes Account
*/

/*
**	Routes Widget
*/

app.get('/account/widget', (req, res) => {
	var connection = mysql.createConnection({
		host: 'database',
		port: '3306',
		user: 'dashboard',
		password: 'dashboard',
		database: 'dashboard'
	});
	connection.connect();
	connection.query('SELECT * FROM widget', (err, resDB) => {
		if (err) {
			res.sendStatus(400);
			throw err;
		}
		res.status = 200;
		res.json(resDB);
		connection.end();
	});
})

app.post("/account/addWidget",[
	body('name').not().isEmpty(),
	body('widgetId').not().isEmpty(),
	body('user').not().isEmpty(),
	body('state').not().isEmpty(),
	body('data').not().isEmpty()
	], (req, res) => {
	var connection = mysql.createConnection({
		host: 'database',
		port: '3306',
		user: 'dashboard',
		password: 'dashboard',
		database: 'dashboard'
	});
	connection.connect();
	connection.query('INSERT INTO widget VALUES(0,\'' + req.body.user + '\',\'' + req.body.widgetId + '\',\'' + req.body.name + '\',\'' + req.body.state + '\',\'' + req.body.data + '\');', (err, resDB) => {
		if (err) {
			res.sendStatus(400);
			throw err;
		}
		res.sendStatus(200);
		connection.end();
	});
});

app.post("/account/retrieveWidget",[
	body('user').not().isEmpty()
	], (req, res) => {
	var connection = mysql.createConnection({
		host: 'database',
		port: '3306',
		user: 'dashboard',
		password: 'dashboard',
		database: 'dashboard'
	});
	connection.connect();
	connection.query('SELECT * FROM widget WHERE user = \'' + req.body.user + '\';', (err, resDB) => {
		if (err) {
			res.sendStatus(400);
			throw err;
		}
		res.json(resDB);
		connection.end();
	});
});

app.post("/account/updateWidget",[
	body('widgetId').not().isEmpty(),
	body('user').not().isEmpty(),
	body('state').not().isEmpty(),
	body('data').not().isEmpty()
	], (req, res) => {
	var connection = mysql.createConnection({
		host: 'database',
		port: '3306',
		user: 'dashboard',
		password: 'dashboard',
		database: 'dashboard'
	});
	connection.connect();
	connection.query('UPDATE widget SET state = \'' + req.body.state + '\', data = \'' + req.body.data + '\' WHERE user = \'' + req.body.user + '\' AND widgetId = \'' + req.body.widgetId + '\';', (err, resDB) => {
		if (err) {
			res.sendStatus(400);
			throw err;
		}
		res.sendStatus(200);
		connection.end();
	});
});

app.post("/account/deleteWidget",[
	body('widgetId').not().isEmpty(),
	body('user').not().isEmpty()
	], (req, res) => {
	var connection = mysql.createConnection({
		host: 'database',
		port: '3306',
		user: 'dashboard',
		password: 'dashboard',
		database: 'dashboard'
	});
	connection.connect();
	connection.query('DELETE FROM widget WHERE user = \'' + req.body.user + '\' AND widgetId = \'' + req.body.widgetId + '\';', (err, resDB) => {
		if (err) {
			res.sendStatus(400);
			throw err;
		}
		res.sendStatus(200);
		connection.end();
	});
});

/*
**	Routes Widget
*/

/*
**	Routes CurrencyConverterWidget
*/

app.post('/widget/currencyConverterWidget/baseConverter', (req, res) => {
	var xmlreqBaseConverter = new XMLHttpRequest();
	xmlreqBaseConverter.onreadystatechange = function() {
        if (xmlreqBaseConverter.status == 200) {
    		res.send(xmlreqBaseConverter.responseText);
        } else {
        	res.sendStatus(400);
        }
    };
	xmlreqBaseConverter.open('GET', 'https://api.exchangeratesapi.io/latest?base=' + req.body.base, false);
	xmlreqBaseConverter.send();
})

/*
**	Routes CurrencyConverterWidget
*/

/*
**	Routes WeatherWidget
*/

app.post('/widget/weatherWidget/current', (req, res) => {
	var xmlreqCurrent = new XMLHttpRequest();
	xmlreqCurrent.onreadystatechange = function() {
        if (xmlreqCurrent.status == 200) {
    		res.send(xmlreqCurrent.responseText);
        } else {
        	res.sendStatus(400);
        }
    };
	xmlreqCurrent.open('GET', 'http://api.weatherstack.com/current?access_key=' + req.body.apiKey + '&query=' + req.body.city, false);
	xmlreqCurrent.send();
})

/*
**	Routes WeatherWidget
*/

/*
**	Routes TwitterWidget
*/


app.post('/widget/TwitterWidget/home_timeline/', (req, res) => {
  	var oauth = new OAuth.OAuth(
  		'https://api.twitter.com/oauth/request_token',
  		'https://api.twitter.com/oauth/access_token',
  		TWITTER_CONSUMER_KEY,
  		TWITTER_CONSUMER_SECRET,
  		'1.0A',
  		null,
  		'HMAC-SHA1'
	);

	oauth.get(
  	'https://api.twitter.com/1.1/statuses/home_timeline.json?count=' + req.body.count,
  	TWITTER_TOKEN,
  	TWITTER_TOKEN_SECRET,
  	function (error, data, response){
    	if (!error)
    		res.send(data);
    	else
        	res.send(error);
	});
})

app.post('/widget/TwitterWidget/retweet/', (req, res) => {
  	var oauth = new OAuth.OAuth(
  		'https://api.twitter.com/oauth/request_token',
  		'https://api.twitter.com/oauth/access_token',
  		TWITTER_CONSUMER_KEY,
  		TWITTER_CONSUMER_SECRET,
  		'1.0A',
  		null,
  		'HMAC-SHA1'
	);

	oauth.post(
  	'https://api.twitter.com/1.1/statuses/retweet/' + req.body.id + '.json',
  	TWITTER_TOKEN,
  	TWITTER_TOKEN_SECRET,
  	null,
  	null,
  	function (error, data, response){
    	if (!error)
    		res.send(data);
    	else
        	res.send(error);
	});
})

app.post('/widget/TwitterWidget/unretweet/', (req, res) => {
  	var oauth = new OAuth.OAuth(
  		'https://api.twitter.com/oauth/request_token',
  		'https://api.twitter.com/oauth/access_token',
  		TWITTER_CONSUMER_KEY,
  		TWITTER_CONSUMER_SECRET,
  		'1.0A',
  		null,
  		'HMAC-SHA1'
	);

	oauth.post(
  	'https://api.twitter.com/1.1/statuses/unretweet/' + req.body.id + '.json',
  	TWITTER_TOKEN,
  	TWITTER_TOKEN_SECRET,
  	null,
  	null,
  	function (error, data, response){
    	if (!error)
    		res.send(data);
    	else
        	res.sendStatus(400);
	});
})

app.post('/widget/TwitterWidget/favorite/', (req, res) => {
  	var oauth = new OAuth.OAuth(
  		'https://api.twitter.com/oauth/request_token',
  		'https://api.twitter.com/oauth/access_token',
  		TWITTER_CONSUMER_KEY,
  		TWITTER_CONSUMER_SECRET,
  		'1.0A',
  		null,
  		'HMAC-SHA1'
	);

	oauth.post(
  	'https://api.twitter.com/1.1/favorites/create.json?id=' + req.body.id,
  	TWITTER_TOKEN,
  	TWITTER_TOKEN_SECRET,
  	null,
  	null,
  	function (error, data, response){
    	if (!error)
    		res.send(data);
    	else
        	res.sendStatus(400);
	});
})

app.post('/widget/TwitterWidget/unfavorite/', (req, res) => {
  	var oauth = new OAuth.OAuth(
  		'https://api.twitter.com/oauth/request_token',
  		'https://api.twitter.com/oauth/access_token',
  		TWITTER_CONSUMER_KEY,
  		TWITTER_CONSUMER_SECRET,
  		'1.0A',
  		null,
  		'HMAC-SHA1'
	);

	oauth.post(
  	'https://api.twitter.com/1.1/favorites/destroy.json?id=' + req.body.id,
  	TWITTER_TOKEN,
  	TWITTER_TOKEN_SECRET,
  	null,
  	null,
  	function (error, data, response){
    	if (!error)
    		res.send(data);
    	else
        	res.sendStatus(400);
	});
})

/*
**	Routes TwitterWidget
*/