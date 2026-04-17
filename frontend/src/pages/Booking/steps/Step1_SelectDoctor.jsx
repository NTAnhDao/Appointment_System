// steps/Step1_SelectDoctor.jsx
import { useBooking } from "../../../context/BookingContext";

export default function Step1() {
  const { setBookingData, nextStep } = useBooking();

  const handleSelectDoctor = (doctor) => {
    setBookingData(prev => ({ ...prev, doctor }));
    nextStep();
  };

  return (
    <div>
      <h2>Các bác sĩ</h2>

    
          {/* Actions */}
        <div className="d-flex justify-content-between align-items-center mt-5 action-bar">
             <button className="btn btn-next" onClick={() => handleSelectDoctor({ id: 1, name: "Dr A" })}>
                Select Dr A
            </button>
        </div>
    </div>
  );
}