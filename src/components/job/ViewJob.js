import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import CalculateByMonth from "./CalculateByMonth";

export default function ViewJob() {
    const { jobID } = useParams();
    const [shiftData, setShiftData] = useState([]);
    const [shiftDataLoaded, setShiftDataLoaded] = useState(false);

    useEffect(() => {
        const getJobShifts = async (jobID) => {
            let { data, error } = await supabase
            .from('shift')
            .select('total, hoursWorked, date')
            .eq('jobFK', jobID)
            if (error) console.log(error)
            else {
                setShiftData(data);
                setShiftDataLoaded(true);
            }
        };

        getJobShifts(jobID);

    });

    return (
        <div>
            <p>job id: {jobID}</p>
            {shiftDataLoaded === true ? <CalculateByMonth shiftData={shiftData} /> : ''}
        </div>
    )
};