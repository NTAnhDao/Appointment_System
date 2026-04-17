// services/bookingService.js
import axios from "axios";

export const createBooking = (data) =>
  axios.post("/api/bookings", data);