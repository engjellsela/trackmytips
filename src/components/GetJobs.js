import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom"
import Navbar from "./navbar";
import { useAuth } from "../context/AuthContext";

export default function GetJobs() {
    const { userId } = useAuth();
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const getJobsList = async () => {
            let { data, error } = await supabase
            .from('job')
            .select('id, name, hourlyRate')
            .eq('userFK', userId)
            if (error) console.log(error)
            else setJobs(data);
        }

        getJobsList();
    }, [userId]);
    
    return (
        <div>
            <Navbar />
            <div className="container p-4 my-4 border">
                <p>Your Jobs</p>
                <div className="row my-4">
                    <div class="col-4"></div>
                    <div class="col-4"></div>
                    <div class="col-4"><Link to="/newjob" class="btn btn-success float-end">+ New Job</Link></div>
                </div>

                <div>
                {jobs.length > 0 ?
                    jobs.map((job) => (
                        <Link className="btn btn-success mx-1" to={`/viewjob/${job.id}`}>{job.name}</Link>
                    )) : ''
                }
                </div>
            </div>
        </div>
    )
}