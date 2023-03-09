import "./EventPage.css"

import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

function EventPage(props) {
    console.log("Event Page: ", props.currentViewEvent)
    return (
        <>
            {props.currentViewEvent &&
                <>
                    <h1>Event page
                        <span className="link"><Link className="nav-link" to="/">Back to Dashboard</Link></span>
                    </h1>

                    <div className='event-page-container'>
                        <Card className="event-page-card text-center">
                            <Card.Header className="left-header">
                                {props.currentViewEvent.date}
                                <img className='event-page-image' src={props.currentViewEvent.picture} />
                            </Card.Header>
                            <Card.Body className="event-page-card-body">
                                <Card.Title className="card-title-page">Welcome to <span className="event-title">
                                    {props.currentViewEvent.title} </span>
                                    event page
                                </Card.Title>
                                <Card.Text className="card-text-wrapper">


                                    The event will take place at:
                                    <span className="event-location">
                                        {props.currentViewEvent.location}
                                    </span>
                                    <span>
                                        Opening time: 1800 <br />
                                        Duration: 4 hours
                                    </span>


                                    <span className="event-description">
                                        {props.currentViewEvent.description}
                                    </span>
                                    <Button variant="primary" className="btn">Update</Button>
                                </Card.Text>
                            </Card.Body>
                            {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
                        </Card>

                    </div>
                </>
            }
        </>
    )
}

export default EventPage