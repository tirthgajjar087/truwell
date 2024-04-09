function PrivateRoute({ element, isAuthenticated }) {
  return isAuthenticated ? element : <Navigate to="/login" />;
}

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  console.log("IN app.js", isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otpverification" element={<OtpVerification />} />
        <Route
          path="/otpforgotverification"
          element={<OtpForgotVerification />}
        />
        <Route path="/forgotemail" element={<ForgotEmail />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />

        <PrivateRoute path="/" element={<Navigation />} isAuthenticated={isAuthenticated}>
          <Route index element={<Dashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/doctorprofile" element={<DoctorProfile />} />
          <Route path="/rota" element={<Rota />} />
          <Route path="/prescription" element={<Prescription />} />
        </PrivateRoute>
      </Routes>
    </BrowserRouter>
  );
}

// PrivateRoute component to handle authentication logic
const PrivateRoute = ({ element, isAuthenticated, ...rest }) => {
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  const WrappedNavigation = withCollapseState(Navigation);
  const { isAuthenticated } = useSelector((state) => state.auth);
  console.log("IN app.js", isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otpverification" element={<OtpVerification />} />
        <Route
          path="/otpforgotverification"
          element={<OtpForgotVerification />}
        />
        <Route path="/forgotemail" element={<ForgotEmail />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />

        {/* Public routes accessible to all */}
        <Route path="/" element={<WrappedNavigation />}>
          {/* Private routes accessible only when authenticated */}
          <PrivateRoute
            isAuthenticated={isAuthenticated}
            element={<Dashboard />}
          />
          <PrivateRoute
            isAuthenticated={isAuthenticated}
            path="/home"
            element={<Home />}
          />
          <PrivateRoute
            isAuthenticated={isAuthenticated}
            path="/doctorprofile"
            element={<DoctorProfile />}
          />
          <PrivateRoute
            isAuthenticated={isAuthenticated}
            path="/rota"
            element={<Rota />}
          />
          <PrivateRoute
            isAuthenticated={isAuthenticated}
            path="/prescription"
            element={<Prescription />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const PrivateRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? element : <Navigate to="/login" />;
};

const PublicRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/" /> : element;
};

function App() {
  const WrappedNavigation = withCollapseState(Navigation);

  return (
    <BrowserRouter>
      <Routes>
        <PublicRoute path="/login" element={<Login />} />
        <PublicRoute path="/signup" element={<Signup />} />
        <PublicRoute path="/otpverification" element={<OtpVerification />} />
        <PublicRoute
          path="/otpforgotverification"
          element={<OtpForgotVerification />}
        />
        <PublicRoute path="/forgotemail" element={<ForgotEmail />} />
        <PublicRoute path="/forgotpassword" element={<ForgotPassword />} />

        <Route path="/" element={<WrappedNavigation />}>
          <PrivateRoute element={<Dashboard />} />
          <PrivateRoute path="/home" element={<Home />} />
          <PrivateRoute path="/doctorprofile" element={<DoctorProfile />} />
          <PrivateRoute path="/rota" element={<Rota />} />
          <PrivateRoute path="/prescription" element={<Prescription />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}




<Routes>
  {/* Public Routes */}
  {!isAuthenticated && <Route path="/login" element={<Login />} />}
  {!isAuthenticated && <Route path="/signup" element={<Signup />} />}
  {!isAuthenticated && <Route path="/otpverification" element={<OtpVerification />} />}
  {!isAuthenticated && <Route path="/otpforgotverification" element={<OtpForgotVerification />} />}
  {!isAuthenticated && <Route path="/forgotemail" element={<ForgotEmail />} />}
  {!isAuthenticated && <Route path="/forgotpassword" element={<ForgotPassword />} />}

  {/* Private Routes */}
  {isAuthenticated && (
    <>
      <Route path="/" element={<WrappedNavigation />}>
        <Route index element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/doctorprofile" element={<DoctorProfile />} />
        <Route path="/rota" element={<Rota />} />
        <Route path="/prescription" element={<Prescription />} />
      </Route>
    </>
  )}
</Routes>





{/* <Routes> */ }


{/* {isAuthenticated ? (
): (

  )} */}
{/* <Route path="/login" element={<Login />} />
<Route path="/" element={<WrappedNavigation />}>
  <Route index element={<Dashboard />} />
  <Route path="/doctorprofile" element={<DoctorProfile />} />
  <Route path="/rota" element={<Rota />} />
  <Route path="/prescription" element={<Prescription />} />
</Route>

<Route path='/signup' element={<Signup />} />
<Route path='/otpverification' element={<OtpVerification />} />
<Route path='/otpforgotverification' element={<OtpForgotVerification />} />
<Route path='/forgotemail' element={<ForgotEmail />} />
<Route path='/forgotpassword' element={<ForgotPassword />} />



</Routes> */}