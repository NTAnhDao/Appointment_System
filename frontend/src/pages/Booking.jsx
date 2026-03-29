import axios from "../services/axiosClient";

export default function Booking() {
  const handleBooking = async () => {
    await axios.post("/appointments");
    alert("Booked!");
  };

  return <button onClick={handleBooking}>Đặt lịch</button>;
}