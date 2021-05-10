import { Link } from 'react-router-dom';
import { SigninForm } from '../composition components/SigninForm.jsx';

function Signin() {
	return (
		<div className="card mt-5 mx-auto" style={{width: "30rem"}}>
			<h1 className="card-title mx-auto">Sign In</h1>
			<p className="card-text mx-auto">or <Link to='/signup'>signup</Link></p>
			<SigninForm/>
			<a className="btn btn-outline-primary mx-1 my-1" href="http://localhost:8080/auth/twitter">Sign in with Twitter</a>
		</div>
	);
}

export default Signin;