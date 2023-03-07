import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from "react-bootstrap/Card";
import './AddUpdateDel.css' ;

export default function Add(props) {

	const [disabled, changeDisabled] = useState(false) ;
	const [imageUrl, changeImageUrl] = useState('') ;

	const submitHandler = (e) => {
		e.preventDefault() ;
		changeDisabled(true) ; // Avoid overlapping requests

		let action = 'add' ;
		if (e.target.name === 'delete') action = 'delete' ;
		else if (props.currentEvent) action = 'update' ;

		console.log("Action: ", action) ;
	} ;

	return (
		 <Card className='addUpdateDelCard'>
		  <Card.Title>Add Event</Card.Title>
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body>

				<Form id="addUpdateDelForm">
					<Form.Group className="mb-3" controlId="eventName">
						<Form.Label>Name</Form.Label>
						<Form.Control placeholder="Name of your event" disabled={disabled} />
					</Form.Group>

					<Row className="mb-3">
						<Form.Group as={Col} controlId="eventDate">
							<Form.Label>Date</Form.Label>
							<Form.Control type="date" disabled={disabled} />
						</Form.Group>

						<Form.Group as={Col} controlId="eventTime">
							<Form.Label>Time</Form.Label>
							<Form.Control placeholder="Time as HH:MM:SS (24-hour format)" disabled={disabled} />
						</Form.Group>

						<Form.Group as={Col} controlId="eventDuration">
							<Form.Label>Duration</Form.Label>
							<Form.Control placeholder="Length in mins" disabled={disabled} />
						</Form.Group>
					</Row>

					<Row className="mb-3">
					<Form.Group as={Col} controlId="eventLocation">
						<Form.Label>Location</Form.Label>
						<Form.Control placeholder="Location of your event" disabled={disabled} />
					</Form.Group>

					<Form.Group as={Col} controlId="eventImageURL">
						<Form.Label>Image</Form.Label>
						<Form.Control placeholder="Image URL" disabled={disabled}
						value={imageUrl} onChange={(e) => changeImageUrl(e.target.value)} />
					</Form.Group>
					</Row>

					<Button name="addupdate" onClick={submitHandler} variant="primary" type="submit">
						Add / Update
					</Button>
					
					<Button name="delete" onClick={submitHandler} variant="danger" type="submit">
						Delete
					</Button>
				</Form>
 			</Card.Body>
    </Card>
	)
}