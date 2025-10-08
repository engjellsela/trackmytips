import { useState } from "react";
import { supabase } from "../supabaseClient";
import Navbar from "./navbar";
import { useAuth } from "../context/AuthContext";

export default function NewJob() {
    const { userId } = useAuth();
    const [name, setName] = useState('');
    const [hourlyRate, setHourlyRate] = useState(0);

    const insertJob = async () => {
        const { data, error } = await supabase
        .from('job')
        .insert({ name: name, hourlyRate: hourlyRate, userFK: userId })
        if (error) console.log(error)
        else window.location.href="/";
    };

    return (
        <div>
            <Navbar />
            <div className="container p-4 my-4 border">
                <div className="border-bottom">
                    <h2 className="h4">New job</h2>
                </div>

                <div className="my-3">
                    <span className="h6">Job name</span>
                    <input type="text" className="form-control" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                </div>


                <div className="my-3">
                    <span className="h6">Hourly rate</span>
                    <input type="number" className="form-control" placeholder="Hourly rate" onChange={(e) => setHourlyRate(e.target.value)} />
                </div>

                <button type="button" className="btn btn-success" onClick={insertJob}>Submit</button>
            </div>
        </div>
    )
}