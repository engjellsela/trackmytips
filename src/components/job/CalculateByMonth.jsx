import { useState, useEffect } from "react";
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemTitle,
  } from "@/components/ui/item";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button";

export default function CalculateByMonth({ jobId, shiftData }) {
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
        <div className="flex flex-col">
            {data.length > 0 ? data.map(dataset => {
                return (
                    <div key={dataset.date} className='bg-white rounded-sm hover:border-indigo-400 hover:bg-indigo-50 border w-full mb-5'>
                        <Link to={`/jobs/${jobId}/shifts?month=${dataset.date}`}>
                            <Item className="px-0">
                                <ItemContent>
                                    <ItemTitle className="border-b w-full pl-2 pb-2">
                                        {new Date(`"${dataset.date}-01"`).toLocaleString("en-US", {
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </ItemTitle>
                                    <ItemDescription className="px-2">
                                        Total<span className="float-right text-black font-medium">${(dataset.total).toFixed(2)}</span>
                                    </ItemDescription>
                                    <ItemDescription className="px-2">
                                        Hours worked<span className="float-right text-black font-medium">{(dataset.hoursWorked).toFixed(2)}</span>
                                    </ItemDescription>
                                    <ItemDescription className="px-2">
                                        Average hour<span className="float-right text-black font-medium">{(dataset.total / dataset.hoursWorked).toFixed(2)}</span>
                                    </ItemDescription>
                                </ItemContent>
                            </Item>
                        </Link>
                    </div>
                )
            }) : 'there are not any shifts to this job'}
        </div>
    )
};