import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import SignUp from "./pages/signup";
import SignIn from "./pages/login";
import VerifyOTP from "./pages/verify-otp";
import ResetPassword from "./pages/reset-password";
import ForgotPassword from "./pages/forgot-password";
import "./App.css";
import RegisterBarangayUserPage from "@/pages/register-barangay-user.jsx";
import LandingPage from "@/pages/index.jsx";
import Dashboard from "@/components/dashboard/dashboard.jsx";
import PrivateRoute from "@/components/private-route.jsx";
import { PageNotFound } from "@/components/common/404.view.jsx";

const DashboardWrapper = () => {
  const location = useLocation();
  const tab = new URLSearchParams(location.search).get("tab");

  const validTabs = [
    "overview",
    "barangay",
    "users",
    "reports",
    "settings",
    "requests",
    "request-admin",
    "incident-report",
    "incident-report-admin",
    "residents",
  ];

  return validTabs.includes(tab) ? <Dashboard tab={tab} /> : <PageNotFound />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin/register" element={<RegisterBarangayUserPage />} />
        <Route path="/verify-otp/:randomString" element={<VerifyOTP />} />
        <Route
          path="/reset-password/:randomToken"
          element={<ResetPassword />}
        />
        <Route path="/" element={<LandingPage />} />

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardWrapper />} />
          <Route path="/dashboard/:tab" element={<DashboardWrapper />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
