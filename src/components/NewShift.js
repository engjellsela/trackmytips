import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Navbar from "./navbar";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

export default function NewShift() {
  const { jobId } = useParams();
  const { userId } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [hoursWorked, setHoursWorked] = useState(0);
  const [tips, setTips] = useState(0);
  const [date, setDate] = useState('');
  const navigate = useNavigate();
  
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
  }, []);

  const insertShift = async () => {
    for (let i = 0; i < jobs.length; i++) {

      if (jobs[i].id === jobId) {     
        const { data, error } = await supabase
        .from('shift')
        .insert(
          { hoursWorked: hoursWorked, tips: tips, total: tips + (hoursWorked * jobs[i].hourlyRate), date: date, jobFK: jobId },
        )
        if (error) console.log(error)
        else navigate(-1);
      }

    }
  };

  return (
    <div>
      <Navbar />
      <div className="container p-4 my-4 border">
        <div className="border-bottom">
          <p className="h4">Create a new shift</p>
        </div>

        <div className="my-3">
          <span class="h6">Tips</span>
          <input type="number" onChange={(e) => setTips(Number(e.target.value))} class="form-control" placeholder="Add tips" />
        </div>

        <div className="my-3">
          <span class="h6">Hours worked</span>
          <input type="number" onChange={(e) => setHoursWorked(Number(e.target.value))} class="form-control" placeholder="Hours worked" />
        </div>

        <div className="my-3">
          <span class="h6">Date</span>
          <input type="text" onChange={(e) => setDate(e.target.value)} class="form-control" placeholder="year-month-date" />
        </div>      

        <button type="button" onClick={insertShift} class="btn btn-success">Submit</button>
      </div>
    </div>
    );
};