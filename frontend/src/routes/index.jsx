import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import BookingPage from "../pages/Booking/BookingPage";
import AppointmentPage from "../pages/AppointmentPage.jsx";
import ProfilesPage from "../pages/ProfilesPage.jsx";
import Doctor from "../pages/Doctor.jsx";``
import Login from "../pages/Login";
import Register from "../pages/Register";
import PaymentSuccessPage from "../pages/PaymentSuccessPage.jsx";



export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/booking" element={<BookingPage />} />
      <Route path="/appointments" element={<AppointmentPage />} />
      <Route path="/profiles" element={<ProfilesPage />} />
      <Route path="/doctors" element={< Doctor />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/success" element={<PaymentSuccessPage />} />

    </Routes>
  );
}