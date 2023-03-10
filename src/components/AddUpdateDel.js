import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from "react-bootstrap/Card";
import '../css/AddUpdateDel.css';

export default function Add({ client, refreshList, currentEvent, setMsgData }) {
	const navigate = useNavigate();

	const [disabled, changeDisabled] = useState(false);
	const [formData, changeFormData] = useState({
		title: '',
		date: '',
		time: '',
		duration: '',
		durationUnits: '',
		location: '',
		imageUrl: '',
		description: ''
	});

	// Update form fields state when currentEvent changes
	useEffect(() => {
		resetForm();
	}, [currentEvent]);

	function resetForm() {
		const { dateInputValue, timeInputValue } = dateTodateAndTimeInputValues(currentEvent?.date);
		changeFormData({
			title: currentEvent?.title || '',
			date: dateInputValue,
			time: timeInputValue,
			duration: currentEvent?.duration || '',
			durationUnits: currentEvent?.durationUnits || '',
			location: currentEvent?.location || '',
			imageUrl: currentEvent?.picture || '',
			description: currentEvent?.description || ''
		});
	}

	function handleChange(e) {
		changeFormData(formData => ({ ...formData, [e.target.name]: e.target.value }));
	}

	function dateTodateAndTimeInputValues(date) {
		const dateInputValue = date?.split('T')[0] || '';
		const timeInputValue = date?.split('T')[1].split('.')[0] || '';
		return { dateInputValue, timeInputValue }
	}

	const submitHandler = (e) => {
		e.preventDefault();
		changeDisabled(true); // Avoid overlapping requests

		let action = 'add';
		if (e.target.name === 'delete') action = 'delete';
		else if (currentEvent) action = 'update';

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
		};

		// Get request depending on action
		let request;
		if (action === 'add') request = client.addEvent(fieldsObj);
		else if (action === 'update') request = client.updateEvent(currentEvent._id, fieldsObj);
		else if (action === 'delete') request = client.removeEvent(currentEvent._id);

		// Do request
		request.then(() => {
			changeDisabled(false);
			if (action === 'add') resetForm();
			if (action === 'delete') navigate("/"); // Back to viewing all events after deleting currently selected one
			refreshList().then(() => {
				if (action === 'add' || action === 'update') {
					if (action === 'add') setMsgData({type: 'msg', msg: 'Event added'}) ;
					else setMsgData({type: 'msg', msg: 'Event updated'}) ;
					setTimeout(() => setMsgData({msg: null}), 2000) ;
				}
			});
		}).catch(err => {
			console.error(err);
			changeDisabled(false);
			alert("Unknown error occurred");
		});
	};

	const takeMeHome = () => {
		navigate("/");
	}

	// https://stackoverflow.com/questions/23640351/how-to-convert-html5-input-type-date-and-time-to-javascript-datetime/23640507#23640507
	// (this may not work in all browsers!)
	function dateAndTimeInputValuesToDate(dateInput, timeInput) {
		return new Date(dateInput + " " + timeInput)
	}

	return (
		<>
			<div className="form-wrapper">
				<Card className='addUpdateDelCard'>
					<Card.Title>Event Details</Card.Title>
					<Card.Img variant="top" src={formData.imageUrl} />
					<Card.Body>

						<Form id="addUpdateDelForm">
							<Form.Group className="mb-3" controlId="eventTitle">
								<Form.Label>Title</Form.Label>
								<Form.Control name="title" value={formData.title} onChange={handleChange} placeholder="Title of your event" disabled={disabled} />
							</Form.Group>

							<Row className="mb-3">
								<Form.Group as={Col} controlId="eventDate">
									<Form.Label>Date</Form.Label>
									<Form.Control name="date" type="date" value={formData.date} onChange={handleChange} disabled={disabled} />
								</Form.Group>

								<Form.Group as={Col} controlId="eventTime">
									<Form.Label>Time</Form.Label>
									<Form.Control name="time" type="time" value={formData.time} onChange={handleChange} placeholder="Time as HH:MM:SS (24-hour format)" disabled={disabled} />
								</Form.Group>

								<Form.Group md as={Col}>
									<label className="form-label" htmlFor="eventDuration">Duration</label>
									<div className="d-flex gap-1">
										<Form.Control name="duration" id="eventDuration" value={formData.duration} onChange={handleChange} placeholder="Length" disabled={disabled} />
										<Form.Select name="durationUnits" id="eventDurationUnits" value={formData.durationUnits} onChange={handleChange} aria-label="Length units" disabled={disabled} >
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
									<Form.Control name="location" value={formData.location} onChange={handleChange} placeholder="Location of your event" disabled={disabled} />
								</Form.Group>

								<Form.Group md as={Col} controlId="eventImageURL">
									<Form.Label>Image</Form.Label>
									<Form.Control name="imageUrl" placeholder="Image URL" disabled={disabled} value={formData.imageUrl} onChange={handleChange} />
								</Form.Group>
							</Row>

							<Form.Group as={Col} controlId="eventDescription">
								<Form.Label>Description</Form.Label>
								<Form.Control name="description" as="textarea" rows={3} value={formData.description} onChange={handleChange} placeholder="A description for your event" disabled={disabled} />
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
								<Button name="dashboard" onClick={takeMeHome} variant="primary" type="submit">
									Back to Dashboard
								</Button>
							</div>
						</Form>
					</Card.Body>
				</Card>
			</div>
		</>
	)
}