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
                    <div key={dataset.date} className="card m-4">
                        <div className="card-header">{dataset.date}</div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Total <span className="badge text-bg-secondary">{dataset.total}</span></li>
                            <li className="list-group-item">Hours worked <span className="badge text-bg-secondary">{dataset.hoursWorked}</span></li>
                            <li className="list-group-item">Average hour <span className="badge text-bg-secondary">{dataset.total / dataset.hoursWorked}</span></li>
                        </ul>
                    </div>
                )
            }) : 'no job data'}
        </div>
    )
};