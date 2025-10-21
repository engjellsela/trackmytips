import { useState, useEffect } from "react";
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemTitle,
  } from "@/components/ui/item";
import { Badge } from "@/components/ui/badge";

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
        <div className="flex flex-col">
            {data.length > 0 ? data.map(dataset => {
                return (
                    <Item variant="outline" key={dataset.date} className="m-2">
                        <ItemContent>
                            <ItemTitle>{dataset.date}</ItemTitle>
                            <ItemDescription>
                                Total <Badge>{(dataset.total).toFixed(2)}</Badge>
                            </ItemDescription>
                            <ItemDescription>
                                Hours worked  <Badge>{(dataset.hoursWorked).toFixed(2)}</Badge>
                            </ItemDescription>
                            <ItemDescription>
                                Average hour <Badge>{(dataset.total / dataset.hoursWorked).toFixed(2)}</Badge>
                            </ItemDescription>
                        </ItemContent>
                    </Item>
                )
            }) : 'there are not any shifts to this job'}
        </div>
    )
};