import React from 'react'
import SingleEventCard from './SingleEventCard'
import { formatTime } from '../utils';

function EventCards(props) {
    const buildCards = () => {
        return props.events?.map(event => {
            if (event.date) {
              event.time = formatTime(event.date)
            }

            return (
                <SingleEventCard
                    key={event._id}
                    event={event}
                    setCurrentViewEvent={props.setCurrentViewEvent}
                />
            )
        })
    };

    return (
        <>
            <div className='card-wrapper'>
                {buildCards()}
            </div>

        </>
    )
}

export default EventCards