import MainLayout from "../../components/layout/MainLayout";
import { BookingProvider } from "../../context/BookingContext";
import BookingLayout from "./BookingLayout";

export default function BookingPage() {
  return (
    <MainLayout>
        <BookingLayout />
    </MainLayout>
  );
}