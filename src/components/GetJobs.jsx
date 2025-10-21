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
                    <div><Link to="/newjob"><Button>+ New Job</Button></Link></div>
                </div>

                <div className="flex flex-col sm:flex-row">
                    {jobs.length > 0 ?
                        jobs.map((job) => (
                            <div key={job.id} className="mx-0 my-1 sm:mx-2 sm:my-0">
                                <Link to={`/job/${job.id}`}><Button className="bg-gray-600 hover:bg-gray-500">{job.name}</Button></Link>
                            </div>
                        )) : ''
                    }
                </div>
            </div>
        </div>
    )
}