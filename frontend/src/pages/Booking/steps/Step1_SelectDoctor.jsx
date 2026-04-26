// steps/Step1_SelectDoctor.jsx
import { useBooking } from "../../../context/BookingContext";
import DoctorList from "../../../components/doctor/DoctorList";
import { getDoctorsAPI } from "../../../services/DoctorService";
import { useState, useEffect } from "react";

export default function Step1() {
  const { setBookingData, nextStep } = useBooking();

  const handleSelectDoctor = (doctor) => {
    setBookingData(prev => ({ ...prev, doctor }));
    nextStep();
  };

  const [doctors, setDoctors] = useState([]);
  
  useEffect(() => {
      async function load() {
          const data = await getDoctorsAPI();
          setDoctors(data);
      }
      load();
  }, []);

  return (
    <div>
      <h2>Các bác sĩ</h2>
          {/* Actions */}
        <div className="d-flex justify-content-between align-items-center mt-5 action-bar">
             <DoctorList doctors={doctors} onSelectDoctor={handleSelectDoctor}/>
        </div>
    </div>
  );
}