import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GetJobs from "./components/GetJobs";
import ViewJob from "./components/job/ViewJob";
import NewJob from "./components/NewJob";
import NewShift from "./components/NewShift";
import Login from "./components/auth/login";
import SignUp from "./components/auth/signup";
import ErrorPage from "./components/ErrorPage";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { userAuth, authLoaded } = useAuth();

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
            <Route path="/" element={<GetJobs />} />
            <Route path="/job/:jobId" element={<ViewJob />} />
            <Route path="/newjob" element={<NewJob />} />
            <Route path="/newshift/:jobId" element={<NewShift />} />
            <Route path="*" element={<ErrorPage />} />
          </>
        )}
      </Routes>
    </Router>
    </>
  );
}