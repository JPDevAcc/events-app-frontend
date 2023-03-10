import "./css/Dashboard.css"
import EventCards from "./components/EventCards";
import SearchBar from "./components/SearchBar";

export default function Dashboard({ events, setCurrentViewEvent, client, refreshList }) {

	// Get the events list if we don't have it yet
	if (!events) refreshList();

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