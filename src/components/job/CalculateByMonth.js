import { useState, useEffect } from "react";

export default function CalculateByMonth({ shiftData }) {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        const calculateByMonth = () => {
            shiftData.map(data => data.date = data.date.substring(0, 7));

            const groupByMonth = Object.values(
                shiftData.reduce((acc, item) => {
                    if (!acc[item.date]) {
                        acc[item.date] = { date: item.date, total: item.total, hoursWorked: item.hoursWorked };
                    } else {
                        acc[item.date].total += item.total;
                        acc[item.date].hoursWorked += item.hoursWorked;
                    }
                    return acc;
                }, {})
            );            

            setData(groupByMonth);
        };

        calculateByMonth();
    }, [shiftData])

    return (
        <div>
            {data.length > 0 ? data.map(dataset => {
                return (
                    <div key={dataset.date} class="card m-4">
                        <div class="card-header">{dataset.date}</div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Total <span class="badge text-bg-secondary">{dataset.total}</span></li>
                            <li class="list-group-item">Hours worked <span class="badge text-bg-secondary">{dataset.hoursWorked}</span></li>
                            <li class="list-group-item">Average hour <span class="badge text-bg-secondary">{dataset.total / dataset.hoursWorked}</span></li>
                        </ul>
                    </div>
                )
            }) : 'no job data'}
        </div>
    )
};