import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Booking from "../pages/Booking";
import Doctor from "../pages/Doctor";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={< Home />} />
      <Route path="/booking" element={< Booking />} />
      <Route path="/doctors" element={< Doctor />} />
    </Routes>
  );
}