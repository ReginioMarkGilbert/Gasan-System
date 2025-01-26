import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/signup";
import SignIn from "./pages/login";
import VerifyOTP from "./pages/verify-otp";
import ResetPassword from "./pages/reset-password";
import ForgotPassword from "./pages/forgot-password";
import "./App.css";
import RegisterBarangayUserPage from "@/pages/register-barangay-user.jsx";
import LandingPage from "@/pages/index.jsx";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
