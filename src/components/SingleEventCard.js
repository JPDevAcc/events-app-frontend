import "../css/Dashboard.css"
import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


function SingleEventCard(props) {
    const event = props.event

    return (
        <>
            <Card className="event-card" style={{ width: '18rem' }}>
                <Card.Body className="card-body-date">
                    {event.date}

                </Card.Body>
                <Card.Body className="card-body-middle">
                    <Card.Title>{event.title}</Card.Title>
                    <Card.Text>
                        <u>{event.location}</u>
                        <br />
                        <br />
                        {event.description}
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