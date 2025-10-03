import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import CalculateByMonth from "./CalculateByMonth";
import Navbar from "../navbar";

export default function ViewJob() {
    const { jobId } = useParams();
    const [jobName, setJobName] = useState('');
    const [shiftData, setShiftData] = useState([]);
    const [shiftDataLoaded, setShiftDataLoaded] = useState(false);

    useEffect(() => {
        const findJob = async (jobID) => {
            let { data, error } = await supabase
            .from('job')
            .select('name')
            .eq('id', jobID)
            if (error) console.log(error)
            else {

                if (data.length > 0) {
                    setJobName(data[0].name);

                    const getJobShifts = async (jobID) => {
                        let { data, error } = await supabase
                        .from('shift')
                        .select('total, hoursWorked, date')
                        .eq('jobFK', jobID)
                        if (error) console.log(error)
                        else {
                            console.log(data)
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
            <div className="container p-4 my-4 border">
                <div class="border-bottom">
                    <div class="row">
                        <div class="col-6"><p class="h4">{jobName}</p></div>
                        <div class="col-6"><Link to={`/newshift/${jobId}`} class="btn btn-success btn-sm float-end">+ New shift</Link></div>
                    </div>
                </div>

                {shiftDataLoaded === true ? <CalculateByMonth shiftData={shiftData} /> : 'no shifts found'}
            </div>
        </div>
    )
};