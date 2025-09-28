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
                    <div key={dataset.date}>
                        <p>date: {dataset.date}</p>
                        <p>total: {dataset.total}</p>
                        <p>hours worked: {dataset.hoursWorked}</p>
                        <p>avg hour: {dataset.total / dataset.hoursWorked}</p>
                        <br /><br />
                    </div>
                )
            }) : 'no job data'}
        </div>
    )
};