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
            <div className="container mx-auto my-10 px-2 md:p-0">
                <div className="flex justify-between mb-5">
                    <div><p>Your Jobs</p></div>
                    <div><Link to="/newjob"><Button>+ New Job</Button></Link></div>
                </div>

                <div className="flex flex-col">
                    {jobs.map((job) => (
                        <Link to={`/jobs/${job.id}`} key={job.id}>
                            <div className="border w-full rounded-sm p-5 my-5 hover:bg-gray-100">
                                {job.name}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};