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
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function App() {
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
		client.getEvents().then(response => {
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
	}

	// Template
	return (
		<div className="App">
			<Navbar bg="light" expand="lg">
				<Container>
					<Navbar.Brand href="#home">Welcome to our ultimate event page</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Link className="nav-link" to="/">Dashboard</Link>
							<Link className="nav-link" to="/addUpdate">Add/Update Event</Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>

			<Message msgData={msgData} setMsgData={setMsgData} />

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
			<Card className="text-center">
      <Card.Header>You have reached the bottom😆 </Card.Header>
      <Card.Footer className="text-muted">Copyrights @TheBrutalEventListenersGang</Card.Footer>
    </Card>
		</div>
	);
}

export default App;
