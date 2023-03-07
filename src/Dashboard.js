import "./css/Dashboard.css"
import { useEffect, useState } from "react";
import EventCards from "./components/EventCards";
import Add from "./Add";


export default function Dashboard(props) {
	const [events, changeEvents] = useState([]);
	const [current, changeCurrent] = useState(undefined);

	const refreshList = () => {
		props.client.getEvents().then(response => {
			changeEvents(response.data);
		});
	}

	const handleRemoveEvent = (id) => {
		props.client.removeEvent(id).then(() => refreshList());
	}

	const handleUpdateEvent = (event) => {
		changeCurrent(event);
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
				/>
			</div>
			{/* <Add client={props.client} currentAd={current} refreshList={() => {
				refreshList();
				changeCurrent(undefined);
			}} /> */}
		</>

	)
}