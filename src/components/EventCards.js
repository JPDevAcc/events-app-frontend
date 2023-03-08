import React from 'react'
import SingleEventCard from './SingleEventCard'

function EventCards(props) {
    console.log(props.events)


    const buildCards = () => {
        return props.events?.map(event => {
            // console.log(props.events)
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