import "./EventPage.css"
import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { convertDate, convertDuration } from "./utils";

function EventPage(props) {
    const navigate = useNavigate();

    function handleButtonClick() {
        navigate("/addUpdate");
    }

    return (
        <>
            {props.currentViewEvent &&
                <>

                    <div className='event-page-container'>
                        <Card className="event-page-card text-center">
                            <Card.Header className="left-header">
                                {convertDate(props.currentViewEvent.date)}<br />
                                <img className='event-page-image' alt="" src={props.currentViewEvent.picture} />
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
                                    <span className="time">
                                        Opening time: {props.currentViewEvent.time} <br />
                                        Duration: {props.currentViewEvent.duration} {convertDuration(props.currentViewEvent.duration, props.currentViewEvent.durationUnits)}
                                    </span>


                                    <span className="event-description">
                                        {props.currentViewEvent.description}
                                    </span>
                                    <Button onClick={handleButtonClick} variant="primary" className="btn">Update</Button>
                                </Card.Text>
                            </Card.Body>

                        </Card>

                    </div>
                </>
            }
        </>
    )
}

export default EventPage