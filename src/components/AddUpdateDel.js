import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from "react-bootstrap/Card";
import '../css/AddUpdateDel.css';

export default function Add({client, refreshList, currentEvent}) {

	const [disabled, changeDisabled] = useState(false) ;
	const [imageUrl, changeImageUrl] = useState('') ;
	const [htmlDateTime, changeHtmlDateTime] = useState({}) ;

	useEffect(() => {
		changeImageUrl(currentEvent?.picture || '')
		const {dateInputValue: currentEventDate, timeInputValue: currentEventTime} = dateTodateAndTimeInputValues(currentEvent?.date) ;
		changeHtmlDateTime({currentEventDate, currentEventTime}) ;
	}, [currentEvent]) ;

	function dateTodateAndTimeInputValues(date) {
		const dateInputValue = date?.split('T')[0] || '' ;
		const timeInputValue = date?.split('T')[1].split('.')[0] || '' ;
		return {dateInputValue, timeInputValue}
	}

	const submitHandler = (e) => {
		e.preventDefault();
		changeDisabled(true); // Avoid overlapping requests

		let action = 'add' ;
		if (e.target.name === 'delete') action = 'delete' ;
		else if (currentEvent) action = 'update' ;
	
		const dateObj = dateAndTimeInputValuesToDate(
			document.getElementById('eventDate').value,
			document.getElementById('eventTime').value
		)
		const fieldsObj = {
			title: document.getElementById('eventTitle').value,
			date: dateObj,
			duration: document.getElementById('eventDuration').value,
			durationUnits: document.getElementById('eventDurationUnits').value,
			location: document.getElementById('eventLocation').value,
			picture: document.getElementById('eventImageURL').value,
			description: document.getElementById('eventDescription').value
		} ;

		// Get request depending on action
		let request ;
		if (action === 'add') request = client.addEvent(fieldsObj) ;
		else if (action === 'update') request = client.updateEvent(currentEvent._id, fieldsObj) ;
		else if (action === 'delete') request = client.removeEvent(currentEvent._id) ;

		// Do request
		request.then(() => {
			changeDisabled(false) ;
			if (action === 'add') document.getElementById("addUpdateDelForm").reset() ;
			refreshList() ;
		}).catch(err => {
			console.error(err) ;
			changeDisabled(false) ;
			alert("Unknown error occurred") ;
		}) ;
	} ;

	// https://stackoverflow.com/questions/23640351/how-to-convert-html5-input-type-date-and-time-to-javascript-datetime/23640507#23640507
	// (this may not work in all browsers!)
	function dateAndTimeInputValuesToDate(dateInput, timeInput) {
		return new Date(dateInput + " " + timeInput)
	}

	return (
		<>
		 <Card className='addUpdateDelCard'>
		  <Card.Title>Event Details</Card.Title>
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body>

				<Form id="addUpdateDelForm">
					<Form.Group className="mb-3" controlId="eventTitle">
						<Form.Label>Title</Form.Label>
						<Form.Control defaultValue={currentEvent?.title} placeholder="Title of your event" disabled={disabled} />
					</Form.Group>

					<Row className="mb-3">
						<Form.Group as={Col} controlId="eventDate">
							<Form.Label>Date</Form.Label>
							<Form.Control type="date" defaultValue={htmlDateTime.currentEventDate} disabled={disabled} />
						</Form.Group>

						<Form.Group as={Col} controlId="eventTime">
							<Form.Label>Time</Form.Label>
							<Form.Control type="time" defaultValue={htmlDateTime.currentEventTime} placeholder="Time as HH:MM:SS (24-hour format)" disabled={disabled} />
						</Form.Group>

						<Form.Group md as={Col}>
							<label className="form-label" htmlFor="eventDuration">Duration</label>
							<div className="d-flex gap-1">
								<Form.Control id="eventDuration" defaultValue={currentEvent?.duration} placeholder="Length" disabled={disabled} />
								<Form.Select id="eventDurationUnits" defaultValue={currentEvent?.durationUnits} aria-label="Length units" disabled={disabled} >
									<option value="m">Minutes</option>
									<option value="h">Hours</option>
									<option value="d">Days</option>
									<option value="w">Weeks</option>
								</Form.Select>
							</div>
						</Form.Group>
					</Row>

					<Row className="mb-3">
						<Form.Group as={Col} controlId="eventLocation">
							<Form.Label>Location</Form.Label>
							<Form.Control defaultValue={currentEvent?.location} placeholder="Location of your event" disabled={disabled} />
						</Form.Group>

						<Form.Group md as={Col} controlId="eventImageURL">
							<Form.Label>Image</Form.Label>
							<Form.Control placeholder="Image URL" disabled={disabled}
							value={imageUrl} onChange={(e) => changeImageUrl(e.target.value)} />
						</Form.Group>
					</Row>

					<Form.Group as={Col} controlId="eventDescription">
						<Form.Label>Description</Form.Label>
						<Form.Control as="textarea" rows={3} defaultValue={currentEvent?.description} placeholder="A description for your event" disabled={disabled} />
					</Form.Group>

					<div className="mt-3">
						<Button name="addupdate" onClick={submitHandler} variant="primary" type="submit">
							{currentEvent ? 'Update Event' : 'Add Event'}
						</Button>
						
						{currentEvent &&
							<Button name="delete" onClick={submitHandler} variant="danger" type="submit">
								Delete Event
							</Button>
						}
					</div>
				</Form>
 			</Card.Body>
    </Card>
		</>
	)
}