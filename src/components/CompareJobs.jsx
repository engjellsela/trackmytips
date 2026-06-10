import { useState, useEffect, useMemo } from "react";
import { supabase } from "../supabaseClient";
import Navbar from "./navbar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CompareJobs() {
    const [jobs, setJobs] = useState([]);
    const [shifts, setShifts] = useState([]);
    const [firstJob, setFirstJob] = useState();
    const [secondJob, setSecondJob] = useState();
    const [firstJobSummary, setFirstJobSummary] = useState({total: 0, hoursWorked: 0, hourlyAvg: 0});
    const [secondJobSummary, setSecondJobSummary] = useState({total: 0, hoursWorked: 0, hourlyAvg: 0});
    const [monthsList, setMonthsList] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [showComparison, setShowComparison] = useState(false);

    const filteredShifts = shifts.filter(shift => shift.date.slice(0, 7) === selectedMonth);
    
    useEffect(() => {
        const getJobsList = async () => {
            let { data, error } = await supabase
            .from('job')
            .select('id, name')
            if (error) console.log(error)
            else setJobs(data);            
        };

        getJobsList();
    }, []);

    useEffect(() => {
        if (!firstJob || !secondJob || firstJob === secondJob) return;

        getJobShifts();
    }, [firstJob, secondJob]);

    useEffect(() => {
        const monthsSet = new Set();

        shifts.forEach(shift => {
            monthsSet.add(shift.date.slice(0, 7));
        });

        setMonthsList([...monthsSet]);
    }, [shifts]);

    useEffect(() => {
        const first = { total: 0, hoursWorked: 0, hourlyAvg: 0 };

        const second = { total: 0, hoursWorked: 0, hourlyAvg: 0 };

        filteredShifts.forEach(shift => {
            if (shift.jobFK === firstJob) {
                first.total += shift.total;
                first.hoursWorked += shift.hoursWorked;
            } else if (shift.jobFK === secondJob) {
                second.total += shift.total;
                second.hoursWorked += shift.hoursWorked;
            }
        });

        first.hourlyAvg = first.hoursWorked > 0 ? first.total / first.hoursWorked : 0;

        second.hourlyAvg = second.hoursWorked > 0 ? second.total / second.hoursWorked : 0;

        if (firstJob && secondJob && selectedMonth) setShowComparison(true);
        
        setFirstJobSummary(first);
        setSecondJobSummary(second);
    }, [shifts, selectedMonth, firstJob, secondJob]);

    const getJobShifts = async () => {
        const { data, error } = await supabase
        .from('shift')
        .select('*')
        .in("jobFK", [firstJob, secondJob])
        if (error) console.log(error)
        else setShifts(data);
    };

    return (
        <div>
            <Navbar />

            <div className="container mx-auto my-10">
                <Select onValueChange={(value) => setFirstJob(value)}>
                    <SelectTrigger className="w-full bg-white mb-2">
                        <SelectValue placeholder="Select Job 1" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {jobs.map(job =><SelectItem key={job.id} value={job.id}>{job.name}</SelectItem>)}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Select onValueChange={(value) => setSecondJob(value)}>
                    <SelectTrigger className="w-full bg-white mb-2">
                        <SelectValue placeholder="Select Job 2" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {jobs.map(job =><SelectItem key={job.id} value={job.id}>{job.name}</SelectItem>)}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Select
                    disabled={!firstJob || !secondJob || firstJob === secondJob} 
                    onValueChange={(value) => setSelectedMonth(value)}
                >
                    <SelectTrigger className="w-full bg-white mb-2">
                        <SelectValue placeholder={!firstJob || !secondJob ? 'Select two jobs first' : 'Select month'} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {monthsList.map(month =>
                                <SelectItem key={month} value={month}>
                                    {new Date(`"${month}"`).toLocaleString("en-US", { month: "long", year: "numeric", })}
                                </SelectItem>
                            )}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        
            {showComparison && (
                <div className="container grid grid-cols-2 mx-auto p-8 border bg-white">
                    <div>
                        <p>Job: <span className="font-semibold">{jobs.find(job => job.id === firstJob)?.name}</span></p>
                        <p>Total: <span className="font-semibold">${firstJobSummary.total.toFixed(2)}</span></p>
                        <p>Hours: {firstJobSummary.hoursWorked.toFixed(2)}</p>
                        <p>Hourly average: ${firstJobSummary.hourlyAvg.toFixed(2)}</p>
                    </div>

                    <div>
                        <p>Job: <span className="font-semibold">{jobs.find(job => job.id === secondJob)?.name}</span></p>
                        <p>Total: <span className="font-semibold">${secondJobSummary.total.toFixed(2)}</span></p>
                        <p>Hours: {secondJobSummary.hoursWorked.toFixed(2)}</p>
                        <p>Hourly average: ${secondJobSummary.hourlyAvg.toFixed(2)}</p>
                    </div>
                </div>
            )}
        </div>
    );
};