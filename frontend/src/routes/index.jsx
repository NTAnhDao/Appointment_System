import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import BookingPage from "../pages/Booking/BookingPage";
import AppointmentPage from "../pages/AppointmentPage.jsx";
import ProfilesPage from "../pages/ProfilesPage.jsx";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/appointments" element={<AppointmentPage />} />
      <Route path="/profiles" element={<ProfilesPage />} />
    </Routes>
  );
}