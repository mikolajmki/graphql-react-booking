import React from "react";
import './EventItem.css';

const eventItem = props => (
    <li key={ props.eventId } className='event__list-item'>
        <div>
            <h1>{ props.title }</h1>
            <h2>${ props.price } - { new Date (props.date).toLocaleDateString() }</h2>
        </div>
        <div>
            {props.userId === props.creatorId ? (<p>You're the owner of this event</p>) : (<button onClick={props.onDetail.bind(this, props.eventId)} className="btn">View details</button>)}
        </div>
    </li>
);

export default eventItem;