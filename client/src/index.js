import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Main from './composition components/Main.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

export const BASE_URL = "http://localhost:8080";

ReactDOM.render((
	<BrowserRouter>
		<div className="App">
			<Main/>
		</div>
	</BrowserRouter>
	), document.getElementById('root')
);