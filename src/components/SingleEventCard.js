import "../css/Dashboard.css"
import React from 'react'
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { formatMonth, convertDate } from "../utils";


function SingleEventCard(props) {

    const event = props.event

    const navigate = useNavigate();

    function handleClick() {
        props.setCurrentViewEvent(props.event)
        navigate("/event");
    }

    return (
        <>
            <Card onClick={handleClick} className="event-card" style={{ width: '18rem' }}>
                <Card.Body className="card-body-date">
                    {event.date ? formatMonth(convertDate(event.date)) : "undefined"}
                </Card.Body>
                <Card.Body className="card-body-middle">
                    <Card.Title>{event.title}</Card.Title>
                    <Card.Text>
                        <u>{event.location}</u>
                    </Card.Text>
                    {/* <Button variant="primary">Go somewhere</Button> */}
                </Card.Body>
                <Card.Body className="card-body-image">
                    <Card.Img variant="top" className='card-image' src={event.picture} />
                </Card.Body>
            </Card>
        </>
    )
}

export default SingleEventCard