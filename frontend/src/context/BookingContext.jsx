// context/BookingContext.jsx
import { createContext, useContext, useState } from "react";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [step, setStep] = useState(1);

  const [bookingData, setBookingData] = useState({
    doctor: null,
    date: null,
    time: null,
    schedule_id: null,
    patientId: null,
    patient: {},
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  return (
    <BookingContext.Provider
      value={{ step, setStep, bookingData, setBookingData, nextStep, prevStep }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);