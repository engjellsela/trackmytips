import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GetJobs from "./components/GetJobs";
import ViewJob from "./components/job/ViewJob";
import NewJob from "./components/NewJob";
import NewShift from "./components/NewShift";
import Login from "./components/auth/login";
import SignUp from "./components/auth/signup";
import ErrorPage from "./components/errorPage";

export default function App() {
  const [userID, setUserID] = useState('');
  const [userAuth, setUserAuth] = useState(false);
  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        setUserID(user.id);
        setUserAuth(true);
      }

      setAuthLoaded(true);
    }

    checkAuth();
  })

  if (!authLoaded) return <p>loading...</p>

  return (
    <>
    <Router>
      <Routes>
        {userAuth === false ? (
          <>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*"  element={<Login />} />
          </>
        ) : (
          <>
            <Route path="/" element={<GetJobs userID={userID} />} />
            <Route path="/viewjob/:jobId" element={<ViewJob />} />
            <Route path="/newjob" element={<NewJob userID={userID} />} />
            <Route path="/newshift/:jobId" element={<NewShift userID={userID} />} />
            <Route path="*" element={<ErrorPage />} />
          </>
        )}
      </Routes>
    </Router>
    </>
  );
}