import './App.css';
import { Route, Routes, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import ApiClient from './apiClient';
import Dashboard from './Dashboard';
import Login from './Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import EventPage from './EventPage';
import AddUpdateDel from "./components/AddUpdateDel";


function App() {
	const [token, setToken] = useState(window.localStorage.getItem("token")); // Restore token from localstorage
	const client = new ApiClient(() => token, logout);
	const [currentEvent, changeCurrentEvent] = useState(null) // Currently selected event for viewing/updating/deleting

	// Events retrieval and refresh
	const [events, changeEvents] = useState([]);
	const refreshList = () => {
		client.getEvents().then(response => changeEvents(response.data));
	}
	useEffect(refreshList, []);

	// Login and logout
	function login(token) {
		window.localStorage.setItem("token", token);
		setToken(token);
	}
	function logout() {
		window.localStorage.removeItem("token");
		setToken(null);
	}

	// Template
	return (
		<div className="App">
			<header>
				<Link className="nav-link" to="/">Dashboard</Link>
				<Link className="nav-link" to="/addUpdate">Add/Update Event</Link>
			</header>

			<Routes>
				<Route path="/" element={
					<>
						{(token) ?
							<Dashboard
								client={client}
								events={events}
								setCurrentViewEvent={changeCurrentEvent}
							/> :
							<Login login={login} client={client} />}
					</>
				} />

				<Route path="/event" element={
					<EventPage
						client={client}
						currentViewEvent={currentEvent}
					/>
				} />

				<Route path="/addUpdate" element={
					<AddUpdateDel client={client} refreshList={refreshList} currentEvent={currentEvent} />
				} />

			</Routes>
		</div>
	);
}

export default App;
