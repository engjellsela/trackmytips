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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title
);

export function useQuery() {
  return new URLSearchParams(useLocation().search);
};

export default function ViewJobShiftsByMonth() {
    const { jobId } = useParams();
    const [shifts, setShifts] = useState([]);
    const [totalTips, setTotalTips] = useState(0);
    const [totalHours, setTotalHours] = useState(0);
    const [total, setTotal] = useState(0);
    const [editTips, setEditTips] = useState(0);
    const [editHours, setEditHours] = useState(0);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const query = useQuery();
    const month = query.get("month");

    useEffect(() => {
        const date = new Date(`"${month}-01"`);
        const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const end = endDate.toISOString().split("T")[0];

        const getShifts = async () => {
            const {data, error} = await supabase
            .from('shift')
            .select('*')
            .eq('jobFK', jobId)
            .gte("date", `${month}-01`)
            .lte("date", `${end}`);
            if (error) console.log(error)
            else setShifts(data);
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

    const editShift = async (id, hourlyRate) => {
        const shift = shifts.find((s) => s.id === id);

        const newTips = editTips != 0 ? editTips : shift.tips;
        const newHours = editHours != 0 ? editHours : shift.hoursWorked;

        const { data, error } = await supabase
        .from('shift')
        .update({ tips: Number(newTips), hoursWorked: Number(newHours), total: Number(newTips) + Number(newHours) * hourlyRate })
        .eq('id', id)
        if (error) alert(error)
        else { 
            setShifts((prev) =>
                prev.map((s) =>
                s.id === id 
                ? { 
                    ...s, 
                    tips: Number(newTips),
                    hoursWorked: Number(newHours),
                    total: Number(newTips) + Number(newHours) * hourlyRate
                 } : s
                )
            );
            setEditTips(0);
            setEditHours(0);
            setOpenEditDialog(false);
        }
    };

    const deleteShift = async (id) => {
        const { error } = await supabase
        .from('shift')
        .delete()
        .eq('id', id)
        if (error) console.log(error)
        else setShifts((prev) => prev.filter((s) => s.id !== id));
    };

    const chartData = {
        labels: shifts.map(s => new Date(s.date).getDay() + 1),
        datasets: [
            {
                label: "Earnings",
                data: shifts.map(s => s.total),
                borderColor: "#4f46e5",
                backgroundColor: "rgba(79,70,229,0.1)",
                tension: 0.3,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Total shift income by day"
            },
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Day of Month"
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Total ($)"
                },
                beginAtZero: true,
            },
        },
    };

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

            <div className="container mx-auto my-5 border bg-white p-5">
                <Line data={chartData} options={chartOptions} />
            </div>

            <div className="container mx-auto my-5 border bg-white">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-indigo-50">
                            <TableHead className="w-[100px] border-r">Date</TableHead>
                            <TableHead className="border-r">Hours</TableHead>
                            <TableHead className="border-r">Tips</TableHead>
                            <TableHead className="border-r">Total</TableHead>
                            <TableHead className="border-r">Hourly Rate</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {shifts.sort((a, b) => new Date(a.date) - new Date(b.date)).map((shift) => (
                        <TableRow key={shift.id} className="hover:bg-indigo-50">
                            <TableCell className="border-r">{shift.date}</TableCell>
                            <TableCell className="border-r">{shift.hoursWorked}h</TableCell>
                            <TableCell className="border-r">${shift.tips.toFixed(2)}</TableCell>
                            <TableCell className="border-r">${shift.total}</TableCell>
                            <TableCell className="border-r">{(shift.total / shift.hoursWorked).toFixed(2)}h</TableCell>
                            <TableCell>
                                <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
                                    <DialogTrigger asChild>
                                        <Button size="sm" className="bg-green-600 hover:bg-green-700 mr-2">Edit</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-sm" aria-describedby={undefined}>
                                        <DialogHeader>
                                            <DialogTitle>Edit shift</DialogTitle>
                                        </DialogHeader>
                                        <FieldGroup>
                                            <Field>
                                                <Label htmlFor="username-1">Tips</Label>
                                                <Input id="tipsInput" name="tips" defaultValue={shift.tips} onChange={(e) => setEditTips(e.target.value)} />
                                            </Field>
                                            <Field>
                                                <Label htmlFor="name-1">Hours</Label>
                                                <Input id="hrsWorkedInput" name="hoursWorked" defaultValue={shift.hoursWorked} onChange={(e) => setEditHours(e.target.value)} />
                                            </Field>
                                        </FieldGroup>
                                        <DialogFooter>
                                            <DialogClose asChild>
                                                <Button variant="outline">Cancel</Button>
                                            </DialogClose>
                                            <Button onClick={() => editShift(shift.id, shift.hourlyRateAtTime)} type="submit">Save changes</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                                <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
                                    <DialogTrigger asChild>
                                        <Button size="sm" className="bg-red-600 hover:bg-red-700">Delete</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-sm" aria-describedby={undefined}>
                                        <DialogHeader>
                                            <DialogTitle>Are you sure you want to delete?</DialogTitle>
                                            <FieldGroup>
                                                <Field>
                                                    <Button onClick={() => deleteShift(shift.id)} className="bg-red-600 hover:bg-red-700">Delete</Button>
                                                </Field>
                                            </FieldGroup>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow className="hover:bg-indigo-50">
                            <TableCell className="w-[100px] border-r">Total</TableCell>
                            <TableCell className="border-r">{totalHours}h</TableCell>
                            <TableCell className="border-r">${totalTips.toFixed(2)}</TableCell>
                            <TableCell className="border-r">${total.toFixed(2)}</TableCell>
                            <TableCell className="border-r">{(total / totalHours).toFixed(2)}h</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableFooter>
                </Table>

            </div>
        </div>
    )
};