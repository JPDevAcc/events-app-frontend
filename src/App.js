import './App.css';
import { Route, Routes, Link } from "react-router-dom";
import { useState } from 'react';
import ApiClient from './apiClient';
import Dashboard from './Dashboard';
import Login from './Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import EventPage from './EventPage';

function App() {
	const [token, setToken] = useState(window.localStorage.getItem("token"));
	const client = new ApiClient(() => token, logout);
	const [currenViewEvent, changeCurrentViewEvent] = useState(
		undefined

		// "id": 0,
		// "title": "Testing Event",
		// "date": "2021-05-01",
		// "location": "Testing Location",
		// "duration": "",
		// "description": "Testing Description",
		// "picture": ""
	)

	function setCurrentViewEvent(currentViewEvent) {
		changeCurrentViewEvent(currentViewEvent)
	}

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
			{/* <Link className="nav-link" to="/">View</Link>
			<Link className="nav-link" to="/test">Test</Link>
			<Link className="nav-link" to="/event">Event Page</Link> */}

			<Routes>
				<Route path="/test" element={
					<div>Test Route</div>
				} />

				<Route path="/" element={
					<>
						{(token) ?
							<Dashboard
								client={client}
								setCurrentViewEvent={setCurrentViewEvent}

							/> :
							<Login login={login} client={client} />}
					</>
				} />

				<Route path="/event" element={
					<EventPage
						client={client}
						currentViewEvent={currenViewEvent}
					/>
				} />


			</Routes>
		</div>
	);
}

export default App;
