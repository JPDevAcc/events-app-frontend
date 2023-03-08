import "../css/Dashboard.css"
import React from 'react'
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import EventPage from "../EventPage";


function SingleEventCard(props) {

    const event = props.event


    const navigate = useNavigate();

    function handleClick() {
        // setCurrentEvent(event)
        props.setCurrentViewEvent(props.event)


        navigate("/event");
    }

    return (
        <>


            <Card onClick={handleClick} className="event-card" style={{ width: '18rem' }}>
                <Card.Body className="card-body-date">
                    {event.date}

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