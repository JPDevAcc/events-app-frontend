import './App.css';
import { useState } from 'react';
import ApiClient from './apiClient';
import Dashboard from './Dashboard';
import Login from './Login';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	const [token, setToken] = useState(window.localStorage.getItem("token"));
	const client = new ApiClient(() => token, logout);

	function login(token) {
		window.localStorage.setItem("token", token);
		setToken(token);
	}

	function logout() {
		window.localStorage.removeItem("token");
		setToken(undefined);
	}

	return (
		<div className="App">
			{(token) ?
				<Dashboard client={client} /> :
				<Login login={login} client={client} />}
		</div>
	);
}

export default App;
