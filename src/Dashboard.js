import "./css/Dashboard.css"
import { useEffect, useState } from "react";
import EventCards from "./components/EventCards";
import AddUpdateDel from "./components/AddUpdateDel";

export default function Dashboard(props) {
	const [events, changeEvents] = useState([]);
	const [currentForUpdate, changeCurrentForUpdate] = useState(undefined);

	const refreshList = () => {
		props.client.getEvents().then(response => {
			changeEvents(response.data);
		});
	}

	const handleUpdateEvent = (event) => {
		changeCurrentForUpdate(event);
	}

	useEffect(() => {
		refreshList();
	}, []);


	return (
		<>
			<h1>Dashboard</h1>
			<div className="dashboard-container">

				<EventCards
					events={events}
					setCurrentViewEvent={props.setCurrentViewEvent}
				/>
			</div>
			<AddUpdateDel client={props.client} currentEvent={events[2]} refreshList={() => {
				refreshList() ;
				changeCurrentForUpdate(undefined) ;
			}} />
		</>
	)
}