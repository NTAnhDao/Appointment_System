// pages/Booking/BookingPage.jsx
import { BookingProvider } from "../../context/BookingContext";
import BookingLayout from "./BookingLayout";

export default function BookingPage() {
  return (
    <BookingProvider>
      <BookingLayout />
    </BookingProvider>
  );
}