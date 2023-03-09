import "./css/Dashboard.css"
import EventCards from "./components/EventCards";

export default function Dashboard({events, setCurrentViewEvent}) {
	return (
		<>
			<h1>Dashboard</h1>
			<div className="dashboard-container">

				<EventCards
					events={events}
					setCurrentViewEvent={setCurrentViewEvent}
				/>
			</div>
		</>
	)
}