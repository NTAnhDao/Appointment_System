export default function DoctorProfile() {
    return (
        <div className="card p-4 mb-4">
            <div className="row g-4">
                {/* Avatar */}
                <div className="col-3 text-center">
                    <img
                        src="https://i.pravatar.cc/300"
                        alt="doctor"
                        className="img-fluid rounded-4"
                    />
                </div>

                {/* Info */}
                <div className="col-9">
                    <span className="badge bg-blue-200 mb-2 text-primary-customer rounded-4 px-2">TS. BS.</span>

                    <h3 className="fw-bold mb-1 text-primary-customer">Nguyễn Văn An</h3>
                    <p className="text-sub fw-semibold mb-2">
                        Tim mạch & Can thiệp mạch máu
                    </p>

                    <div className="d-flex flex-wrap gap-3 mb-3">
                        <div className="d-flex gap-2 align-items-center bg-soft p-2 rounded-3">
                            <span className="material-symbols-outlined">workspace_premium</span>
                            <p className="mb-0">20+ năm kinh nghiệm</p>
                        </div>
                        <div className="d-flex gap-2 align-items-center bg-soft p-2 rounded-3">
                            <span className="material-symbols-outlined">language</span>
                            <p className="mb-0">Tiếng Việt - Anh - Pháp</p>
                        </div>
                    </div>

                    <p>
                        Bác sĩ Nguyễn Văn An là chuyên gia hàng đầu trong lĩnh vực tim mạch,
                        từng tu nghiệp tại Pháp và Hoa Kỳ.
                    </p>
                    <button className="btn btn-book">
                        Đặt lịch ngay
                    </button>
                </div>
            </div>
        </div>
    );
}