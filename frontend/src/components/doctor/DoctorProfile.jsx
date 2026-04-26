export default function DoctorProfile({ doctor }) {
    return (
        <div className="card p-4 mb-4">
            <div className="row g-4">
                {/* Avatar */}
                <div className="col-3 text-center">
                    <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="img-fluid rounded-4"
                    />
                </div>

                {/* Info */}
                <div className="col-9">
                    <span className="badge bg-blue-200 mb-2 text-primary-customer rounded-4 px-2">{doctor.title}</span>

                    <h3 className="fw-bold mb-1 text-primary-customer">{doctor.name}</h3>
                    <p className="text-sub fw-semibold mb-2">
                        {doctor.specialty}
                    </p>

                    <div className="d-flex flex-wrap gap-3 mb-3">
                        <div className="d-flex gap-2 align-items-center bg-soft p-2 rounded-3">
                            <span className="material-symbols-outlined">workspace_premium</span>
                            <p className="mb-0">{doctor.exp}+ năm kinh nghiệm</p>
                        </div>
                        <div className="d-flex gap-2 align-items-center bg-soft p-2 rounded-3">
                            <span className="material-symbols-outlined">language</span>
                            <p className="mb-0">{doctor.languages?.join(" - ")}</p>
                        </div>
                    </div>

                    <p>
                        {doctor.description}
                    </p>
                    <button className="btn btn-book">
                        Đặt lịch ngay
                    </button>
                </div>
            </div>
        </div>
    );
}