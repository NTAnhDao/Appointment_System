import { useState, useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import DoctorList from "../components/doctor/DoctorList";
import { getDoctorsAPI } from "../services/DoctorService";
import "../styles/doctor.css";

export default function Doctor() {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        async function load() {
            const data = await getDoctorsAPI();
            setDoctors(data);
        }
        load();
    }, []);

    return (
        <MainLayout>
            <div className="container py-5 px-4">
                <div className="max-w-2xl mb-5">
                    <h2 className="fw-bold text-primary-customer mb-4">Đội ngũ Chuyên gia</h2>
                    <p className="text-lg">Kết nối với những bác sĩ hàng đầu tại Việt Nam, mang đến sự an tâm và tận tâm trong từng lượt khám.</p>
                </div>
                <div className="row g-4">
                    <DoctorList doctors={doctors}/>
                </div>
            </div>
        </MainLayout>
    );
}