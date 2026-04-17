// pages/Booking/BookingLayout.jsx
import "../../styles/booking.css";
import { useBooking } from "../../context/BookingContext";
import StepIndicator from "../../components/booking/StepIndicator";

import Step1 from "./steps/Step1_SelectDoctor";
import Step2 from "./steps/Step2_SelectDate";
import Step3 from "./steps/Step3_PatientInfo";
import Step4 from "./steps/Step4_Payment";
import Step5 from "./steps/Step5_Success";

export default function BookingLayout() {
  const { step } = useBooking();

  const renderStep = () => {
    switch (step) {
      case 1: return <Step1 />;
      case 2: return <Step2 />;
      case 3: return <Step3 />;
      case 4: return <Step4 />;
      case 5: return <Step5 />;
      default: return <Step1 />;
    }
  };

  return (
    <div className="booking-container">
      <StepIndicator currentStep={step} />
      {renderStep()}
    </div>
  );
}