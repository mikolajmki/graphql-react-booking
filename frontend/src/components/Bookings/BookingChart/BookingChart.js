import React from "react";
import { Bar } from "react-chartjs";

const BOOKINGS_BUCKETS = {
    Cheap: {
        min: 0,
        max: 100
    },
    Normal: {
        min: 100,
        max: 200
    },
    Expensive: {
        min: 200,
        max: 10000000
    }
}

const bookingChart = props => {

    let values = [];
    const chartData = {labels: [], datasets: []};
    for (const bucket in BOOKINGS_BUCKETS) {
        const filteredBookingsCount = props.bookings.reduce((prev, current) => {
            console.log(current.event.price);
            if (current.event.price > BOOKINGS_BUCKETS[bucket].min && 
                current.event.price < BOOKINGS_BUCKETS[bucket].max) {
                return prev + 1;
            } else {
                return prev;
            }
        }, 0);
        values.push(filteredBookingsCount);
        chartData.labels.push(bucket);
        chartData.datasets.push({
            barPercentage: 0.5,
            barThickness: 6,
            maxBarThickness: 8,
            minBarLength: 2,
            data: values
      })
      values = [...values];
      values[values.length - 1] = 0;
    }
    return <div style={{textAlign: "center"}}><Bar data={chartData}/></div>
}

export default bookingChart;