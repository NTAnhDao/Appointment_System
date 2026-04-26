import { useNavigate, useLocation } from "react-router-dom";

export default function DoctorCard({ doctor, onSelectDoctor }) {
    const nav = useNavigate();
    
    return (
        <div className="doctor-card p-4">
            <div className="row g-4">

                <div className="col-md-3">
                    <img src={doctor.image} className="img-fluid rounded-3" />
                </div>

                <div className="col-md-9 d-flex flex-column justify-content-between">

                    <div>
                        <h5 className="fw-bold text-primary-customer">
                            {doctor.title}. {doctor.name}
                        </h5>

                        <p className="text-sub">{doctor.specialty}</p>

                        <p className="">
                            {doctor.description}
                        </p>

                        <div className="row mt-3">
                            <div className="col-6 d-flex gap-2">
                                <div className="icon-box">
                                    <span className="material-symbols-outlined">schedule</span>
                                </div>
                            
                                <div>
                                    <p className="mb-0 small">KINH NGHIỆM</p>
                                    <div className="fw-bold text-primary-customer">{doctor.exp} năm</div>
                                </div>
                                
                            </div>
                            <div className="col-6 d-flex gap-2">
                                <div className="icon-box">
                                    <span className="material-symbols-outlined">payments</span>
                                </div>
                            
                                <div>
                                    <p className="mb-0 small">PHÍ KHÁM</p>
                                    <div className="fw-bold text-primary-customer">{doctor.price}</div>
                                </div>
                                
                            </div>

                        </div>
                    </div>

                    <div className="d-flex gap-2 mt-3">
                        <button className="btn btn-book" onClick={() => onSelectDoctor(doctor)}>
                            Đặt lịch ngay
                        </button>

                        <button className="btn btn-seen" onClick={() => nav(`/doctors/${doctor.id}`)}>
                            Xem hồ sơ
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}