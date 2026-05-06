// context/BookingContext.jsx
import { createContext, useContext, useState } from "react";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {

  const initialBookingData = {
    doctor: null,
    date: "",
    time: "",
    schedule_id: null,
    patientId: null,
    patient: {},
  };

  const [step, setStep] = useState(1);

  const [bookingData, setBookingData] = useState(initialBookingData);

  const resetBookingData = () => {
    setBookingData(initialBookingData);
    setStep(1);
  };

  const nextStep = () => setStep(prev => prev + 1);

  const prevStep = () => setStep(prev => prev - 1);

  return (
    <BookingContext.Provider
      value={{
        step,
        setStep,
        bookingData,
        setBookingData,
        nextStep,
        prevStep,
        resetBookingData
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);