import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import CalculateByMonth from "./CalculateByMonth";
import Navbar from "../navbar";
import NewShift from "../NewShift";

export default function ViewJob() {
    const { jobId } = useParams();
    const [jobName, setJobName] = useState('');
    const [jobHourlyRate, setJobHourlyRate] = useState();
    const [shiftData, setShiftData] = useState([]);
    const [shiftDataLoaded, setShiftDataLoaded] = useState(false);

    useEffect(() => {
        const findJob = async (jobID) => {
            let { data, error } = await supabase
            .from('job')
            .select('name, hourlyRate')
            .eq('id', jobID)
            if (error) console.log(error)
            else {

                if (data.length > 0) {
                    setJobName(data[0].name);
                    setJobHourlyRate(data[0].hourlyRate);

                    const getJobShifts = async (jobID) => {
                        let { data, error } = await supabase
                        .from('shift')
                        .select('total, hoursWorked, date')
                        .eq('jobFK', jobID)
                        if (error) console.log('error', error)
                        else {
                            setShiftData(data);
                            setShiftDataLoaded(true);
                        }
                    };
            
                    getJobShifts(jobId);

                } else shiftDataLoaded(true);

            }
        }

        findJob(jobId);
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container mx-auto my-10 px-2 md:p-0">
                <div className="flex justify-between mb-5">
                    <div><p className="text-lg font-medium mt-1">{jobName}</p></div>
                    <div><NewShift jobId={jobId} jobHourlyRate={jobHourlyRate} /></div>
                </div>

                {shiftDataLoaded === true ? <CalculateByMonth jobId={jobId} shiftData={shiftData} /> : 'no shifts found'}
            </div>
        </div>
    )
};