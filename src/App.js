import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GetJobs from "./components/GetJobs";
import ViewJob from "./components/job/ViewJob";
import NewJob from "./components/NewJob";
import NewShift from "./components/NewShift";

export default function App() {
  const [userID] = useState('64902827-9ba4-44e7-acc9-c30cbe6bc7be');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<GetJobs userID={userID} />} />
        <Route path="/viewjob/:jobID" element={<ViewJob />} />
        <Route path="/newjob" element={<NewJob userID={userID} />} />
        <Route path="/newshift" element={<NewShift userID={userID} />} />
      </Routes>
    </Router>
  );
}