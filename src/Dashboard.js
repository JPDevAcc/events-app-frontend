import "./css/Dashboard.css"
import EventCards from "./components/EventCards";
import SearchBar from "./components/SearchBar";
import { useEffect } from 'react';

export default function Dashboard({ events, setCurrentViewEvent, client, refreshList }) {

	// Refresh the list on component mount
	useEffect(() => {
		if (!events) refreshList();
	}, []);

	return (
		<>
			<h1 className="header-dash">My Dashboard</h1>
			<div className="dashboard-container">

				<SearchBar client={client} refreshList={refreshList} />

				<EventCards
					events={events}
					setCurrentViewEvent={setCurrentViewEvent}
				/>
			</div>
		</>
	)
}