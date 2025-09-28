import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function NewJob({ userID }) {
    const [name, setName] = useState('');
    const [hourlyRate, setHourlyRate] = useState(0);

    const insertJob = async () => {
        const { data, error } = await supabase
        .from('job')
        .insert(
          { name: name, hourlyRate: hourlyRate, userFK: userID },
        )
        if (error) console.log(error)
        else console.log(data)
    };

    return (
        <div>
            <h2>New job</h2>
            <div>
                <label>Job Name</label>
                <input type="name" onChange={(e) => setName(e.target.value)} />
            </div>

            <br />

            <div>
                <label>Hourly rate</label>
                <input type="number" onChange={(e) => setHourlyRate(e.target.value)} />
            </div>

            <br />

            <button onClick={insertJob}>Submit</button>
        </div>
    )
}