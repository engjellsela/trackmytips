import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom"
import Navbar from "./navbar";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button"

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
            <div className="container mx-auto p-8 my-4 border">
                <div className="flex justify-between mb-4">
                    <div><p>Your Jobs</p></div>
                    <div><Link to="/newjob"><Button variant="link">+ New Job</Button></Link></div>
                </div>

                <div className="flex flex-row">
                    {jobs.length > 0 ?
                        jobs.map((job) => (
                            <div className="mx-2">
                                <Link to={`/job/${job.id}`} key={job.id}><Button>{job.name}</Button></Link>
                            </div>
                        )) : ''
                    }
                </div>
            </div>
        </div>
    )
}