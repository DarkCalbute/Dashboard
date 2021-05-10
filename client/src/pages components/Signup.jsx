import React from 'react';
import { Link } from 'react-router-dom';
import { SignupForm } from '../composition components/SignupForm.jsx';

function Signup() {
	return (
		<div className="card mt-5 mx-auto" style={{width: "30rem"}}>
			<h1 className="card-title mx-auto">Sign Up</h1>
			<p className="card-text mx-auto">You already have an account, just <Link to='/signin'>signin</Link></p>
			<SignupForm/>
		</div>
	);
}

export default Signup;