import DoctorProfile from "../components/doctor/DoctorProfile";
import DoctorInfo from "../components/doctor/DoctorInfo";
import MainLayout from "../components/layout/MainLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDoctorDetailAPI } from "../services/DoctorService";
import { useBooking } from "../context/BookingContext";
import "../styles/doctor.css";

export default function DoctorDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { setStep,setBookingData } = useBooking();

    const [doctor, setDoctor] = useState(null);
    const handleSelectDoctor = (doctor) => {
        setBookingData(prev => ({ ...prev, doctor }));
        setStep(2);
        navigate("/booking");
    };

    useEffect(() => {
        async function fetchDoctor() {
            try {
                const data = await getDoctorDetailAPI(id);
                setDoctor(data);
            } catch (err) {
                console.error(err);
            }
        }

        fetchDoctor();
    }, [id]);

    if (!doctor) return <div>Loading...</div>;

    return (
        <MainLayout>
            <div className="container py-5 px-4">

                <button className="btn btn-back" onClick={() => navigate(-1)}>
                    <span className="material-symbols-outlined"
                        style={{ fontSize: '20px', marginRight: '8px' }}>
                        arrow_back
                    </span>
                    Quay lại
                </button>

                <DoctorProfile doctor={doctor} onSelectDoctor={handleSelectDoctor} />

                <DoctorInfo doctor={doctor} />

            </div>
        </MainLayout>
    );
}