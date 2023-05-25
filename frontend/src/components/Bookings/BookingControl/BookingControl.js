import React from "react";
import './BookingControl.css';

const bookingControl = props => {
    return (
        <div className="bookings-control">
            <button className={props.outputType==='list' ? 'active' : ''} onClick={props.onChange.bind(this, 'list')}>
                List
            </button>
            <button className={props.outputType==='chart' ? 'active' : ''} onClick={props.onChange.bind(this, 'chart')}>
                Chart
            </button>
        </div>
    )
}

export default bookingControl;