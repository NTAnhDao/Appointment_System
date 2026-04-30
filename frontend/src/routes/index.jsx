import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import BookingPage from "../pages/Booking/BookingPage";
import AppointmentPage from "../pages/AppointmentPage.jsx";
import PatientsPage from "../pages/PatientsPage.jsx";
import Doctor from "../pages/Doctor.jsx";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PaymentSuccessPage from "../pages/PaymentSuccessPage.jsx";
import ConfirmPage from "../pages/ConfirmPage.jsx";
import AppointmentDetail from "../components/appointment/AppointmentDetail.jsx";
import DoctorDetail from "../pages/DoctorDetail.jsx";
import Invoice from "../pages/Invoice.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/booking" element={<BookingPage />} />
      <Route path="/appointments" element={<AppointmentPage />} />
      <Route path="/profiles" element={<PatientsPage />} />
      <Route path="/doctors" element={< Doctor />} />
      <Route path="/doctors/:id" element={<DoctorDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/success" element={<PaymentSuccessPage />} />
      <Route path="/confirm" element={<ConfirmPage />} />
      <Route path="/appointments/:id" element={<AppointmentDetail />} />
      <Route path="/invoice" element={<Invoice />} />

    </Routes>
  );
}