import { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function useQuery() {
  return new URLSearchParams(useLocation().search);
};

export default function ViewJobShiftsByMonth() {
    const { jobId } = useParams();
    const [shifts, setShifts] = useState([]);
    const [totalTips, setTotalTips] = useState(0);
    const [totalHours, setTotalHours] = useState(0);
    const [total, setTotal] = useState(0);

    const query = useQuery();
    const month = query.get("month");

    useEffect(() => {
        const getShifts = async () => {
            const {data, error} = await supabase
            .from('shift')
            .select('*')
            .eq('jobFK', jobId)
            .gte("date", `${month}-01`)
            .lte("date", `${month}-31`);
            if (error) console.log(error)
            setShifts(data);
        };

        getShifts();

    }, [jobId, month]);

    useEffect(() => {
        let tipsSum = 0;
        let hoursWorkedSum = 0;
        let totalSum = 0;

        shifts.map(shift => {
            tipsSum += shift.tips;
            hoursWorkedSum += shift.hoursWorked;
            totalSum += shift.total;
        });

        setTotalTips(tipsSum);
        setTotalHours(hoursWorkedSum);
        setTotal(totalSum);
    }, [shifts]);

    return (
        <div>
            <nav className="bg-indigo-500 py-4 px-2 md:px-0">
                <div className="container mx-auto">
                    <Link to={`/jobs/${jobId}`}><Button variant="link" className="text-white font-semibold hover:no-underline hover:bg-indigo-600 hover:cursor-pointer">Back</Button></Link>
                </div>
            </nav>

            <div className="container mx-auto mt-5">
                <p className="text-lg font-medium">
                    Shifts data for {new Date(month + "-01").toLocaleString("en-US", { month: "long", year: "numeric"})}
                </p>
            </div>

            <div className="container mx-auto my-5 border bg-white">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-indigo-50">
                            <TableHead className="w-[100px] border-r">Date</TableHead>
                            <TableHead className="border-r">Tips</TableHead>
                            <TableHead className="border-r">Hours worked</TableHead>
                            <TableHead>Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {shifts.sort((a, b) => new Date(a.date) - new Date(b.date)).map((shift) => (
                        <TableRow key={shift.id} className="hover:bg-indigo-50">
                            <TableCell className="border-r">{shift.date}</TableCell>
                            <TableCell className="border-r">{shift.tips}</TableCell>
                            <TableCell className="border-r">{shift.hoursWorked}</TableCell>
                            <TableCell>{shift.total}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow className="hover:bg-indigo-50">
                            <TableCell className="w-[100px] border-r">Total</TableCell>
                            <TableCell className="border-r">{totalTips}</TableCell>
                            <TableCell className="border-r">{totalHours}</TableCell>
                            <TableCell>{total}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>

            </div>

            <div className="container mx-auto">
                <p className="text-sm">Total hourly rate: <span className="font-semibold">${total / totalHours}</span></p>
            </div>
        </div>
    )
};