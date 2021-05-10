import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from '../pages components/Home.jsx';
import Signup from '../pages components/Signup.jsx';
import Signin from '../pages components/Signin.jsx';

const Main = () => {
	return (
    	<Switch>
    		<Redirect exact from='/' to='/signin'/>
    		<Route exact path="/home" component={Home}></Route>
    		<Route exact path="/signup" component={Signup}></Route>
    		<Route exact path="/signin" component={Signin}></Route>
    	</Switch>
    );
}

export default Main;