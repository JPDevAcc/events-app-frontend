import './App.css';
import { Route, Routes, Link } from "react-router-dom";
import { useState } from 'react';
import ApiClient from './apiClient';
import Dashboard from './Dashboard';
import Login from './Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import EventPage from './EventPage';
import AddUpdateDel from "./components/AddUpdateDel";
import Message from './components/Message';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './style.css';
import Card from 'react-bootstrap/Card';
import { useNavigate, Navigate } from 'react-router-dom';

function App() {
	const navigate = useNavigate();

	const [token, setToken] = useState(window.localStorage.getItem("token")); // Restore token from localstorage
	const [currentEvent, changeCurrentEvent] = useState(null) // Currently selected event for viewing/updating/deleting
	const [msgData, setMsgData] = useState({ msg: null, type: null }) ;

	// Error handling
	function setError(msg) {
		setMsgData({ type: "err", msg }) ;
	}

	// Events retrieval and refresh
	const client = new ApiClient(() => token, logout, setError) ;
	const [events, changeEvents] = useState(null);
	const refreshList = () => {
		return client.getEvents().then(response => {
			changeEvents(response.data)
		});
	}

	// Login and logout
	function login(token) {
		window.localStorage.setItem("token", token);
		setToken(token);
	}
	function logout() {
		window.localStorage.removeItem("token");
		setToken(null);
		Navigate("/") ;
	}

	function addEvent() {
		changeCurrentEvent(null) ;
		navigate('/addUpdate') ;
	}

	// Template
	return (
		<div className="App">
			<Navbar bg="light" expand="lg">
				<Container>
					<Navbar.Brand>Welcome to our ultimate event page</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						{token && <Nav className="me-auto">
							<Link className="nav-link" to="/">Dashboard</Link>
							<span className="nav-link" onClick={addEvent}>Add New Event</span>
						</Nav>}
						{token && <button onClick={logout}>Logout</button>}
					</Navbar.Collapse>
				</Container>
			</Navbar>

			<Message msgData={msgData} setMsgData={setMsgData} />

			<main>
				<Routes>
					<Route path="/" element={
						<>
							{(token) ?
								<Dashboard
									client={client}
									events={events}
									setCurrentViewEvent={changeCurrentEvent}
									refreshList={refreshList}
								/> :
								<Login login={login} client={client} />}
						</>
					} />
						{(token) &&
					<Route path="/event" element={
						<EventPage
							client={client}
							currentViewEvent={currentEvent}
						/>
					} />}

					{(token) &&
					<Route path="/addUpdate" element={
						<AddUpdateDel client={client} refreshList={refreshList} currentEvent={currentEvent} setMsgData={setMsgData} />
					} />}

					<Route path="*" element={<Navigate to="/" replace />} />

				</Routes>
			</main>

			<footer>
				<Card className="text-center">
					<Card.Header>You have reached the bottom😆 </Card.Header>
					<Card.Footer className="text-muted">Copyrights @TheBrutalEventListenersGang</Card.Footer>
				</Card>
			</footer>
		</div>
	);
}

export default App;
