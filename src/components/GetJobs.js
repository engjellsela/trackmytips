import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom"

export default function GetJobs({ userID }) {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const getJobsList = async () => {
            let { data, error } = await supabase
            .from('job')
            .select('id, name, hourlyRate')
            .eq('userFK', userID)
            if (error) console.log(error)
            else setJobs(data);
        }

        getJobsList();
    });
    
    return (
        <div>
            {jobs.length > 0 ?
                jobs.map((job) => (
                    <div key={job.id}>
                        <Link to={`/viewjob/${job.id}`}>{job.name}</Link>
                        <br /><br />
                    </div>
                )) : <p>add a job</p>
            }
        </div>
    )   
}