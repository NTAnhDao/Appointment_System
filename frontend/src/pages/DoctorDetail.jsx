import DoctorProfile from "../components/doctor/DoctorProfile";
import DoctorInfo from "../components/doctor/DoctorInfo";
import MainLayout from "../components/layout/MainLayout";
import { useNavigate, useLocation } from "react-router-dom";

export default function DoctorDetail() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <MainLayout>

            <div className="container py-5 px-4">

                <button className="btn btn-back" onClick={() => navigate(-1)}>
                    <span className="material-symbols-outlined" style={{ fontSize: '20px', marginRight: '8px' }}>arrow_back</span>
                    Trở về
                </button>

                <DoctorProfile />

                <DoctorInfo />
            </div>
        </MainLayout>
    );
}