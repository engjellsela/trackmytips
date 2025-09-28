import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export default function NewShift({ userID }) {
  const [jobs, setJobs] = useState([]);
  const [jobId, setJobId] = useState('');  
  const [hoursWorked, setHoursWorked] = useState(0);
  const [tips, setTips] = useState(0);
  const [date, setDate] = useState('');

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

  const insertShift = async () => {
    for (let i = 0; i < jobs.length; i++) {

      if (jobs[i].id === jobId) {
     
        const { data, error } = await supabase
        .from('shift')
        .insert(
          { hoursWorked: hoursWorked, tips: tips, total: tips + (hoursWorked * jobs[i].hourlyRate), date: date, jobFK: jobId },
        )
        if (error) console.log(error)
        else console.log(data)
        
      }

    }
  };

  return (
    <div>
      <h1>Add new shift</h1>
      <div>
        <label>Hours worked: </label>
        <input type="number" onChange={(e) => setHoursWorked(Number(e.target.value))} />
      </div>

      <br />
    
      <div>
        <label>Tips: </label>
        <input type="number" onChange={(e) => setTips(Number(e.target.value))} />
      </div>

      <br />

      <div>
        <label>Date: </label>
        <input type="text" onChange={(e) => setDate(e.target.value)} placeholder="y-m-d" />
      </div>
    
      <br />

      <div>
        <label>Choose job:</label>
        <select onChange={(e) => setJobId(e.target.value)}>
          <option disabled>Please select</option>
          {jobs.map(job => <option key={job.id} value={job.id}>{job.name}</option>)}
        </select>
      </div>
          
      <button onClick={insertShift}>Submit</button>
      </div>
    );
};