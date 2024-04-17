import './css/doctor_portal.css';
import './css/fontRubik.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './doctor/loginSignup/Login.jsx';
import Signup from './doctor/loginSignup/Signup';
import OtpVerification from './doctor/loginSignup/OtpVerification';
import ForgotEmail from './doctor/loginSignup/ForgotEmail';
import OtpForgotVerification from './doctor/loginSignup/OtpForgotVerification.jsx';
import ForgotPassword from './doctor/loginSignup/ForgotPassword.jsx';
import Dashboard from './doctor/Dashboard.jsx';
import Navigation from './doctor/Navigation.jsx';
import DoctorProfile from './doctor/DoctorProfile.jsx';
import withCollapseState from './doctor/withCollapseState.jsx';
import Prescription from './doctor/Prescription.jsx';
import Rota from './doctor/Rota.jsx';
import { useSelector } from 'react-redux';
import ProtectedRoute from './doctor/ProtectedRoute.jsx';
import UpcomingApp from './doctor/UpcomingApp.jsx';
import CompletedApp from './doctor/CompletedApp.jsx';
import MedicalHistory from './doctor/MedicalHistory.jsx';



function App() {
  const WrappedNavigation = withCollapseState(Navigation);
  const { isAuthenticated } = useSelector((state) => state.auth);
  console.log("IN app.js--: ", isAuthenticated);

  return (
    <>
      <BrowserRouter>
        <Routes>

          {isAuthenticated ? (
            <Route path="/" element={<WrappedNavigation />}>
              <Route index element={<Dashboard />} />
              <Route path="/rota/:id" element={<Rota />} />
              <Route path="/prescription" element={<Prescription />} />
              <Route path="/doctorprofile/:id" element={<DoctorProfile />} />
              <Route path="/upcomingapp" element={<UpcomingApp />} />
              <Route path="/completedapp" element={<CompletedApp />} />
              <Route path="/medicalhistory" element={<MedicalHistory />} />
            </Route>
          ) : (
            <>
              <Route path="/" element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/otpverification' element={<OtpVerification />} />
              <Route path='/otpforgotverification' element={<OtpForgotVerification />} />
              <Route path='/forgotemail' element={<ForgotEmail />} />
              <Route path='/forgotpassword' element={<ForgotPassword />} />
            </>
          )}






        </Routes>
      </BrowserRouter >
    </>
  );
}

export default App;


