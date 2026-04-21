export default function DoctorInfo() {
    return (
        <div className="row g-4">
            {/* Experience */}
            <div className="col-md-6">
                <div className="card p-4 h-100 shadow-sm">
                    <div className="d-flex gap-2 align-items-center">
                        <span className="icon-box material-symbols-outlined">history_edu</span>
                        <h5 className="fw-bold mb-3 text-primary-customer">Kinh nghiệm</h5>
                    </div>


                    <ul className="list-history-edu">
                        <li className="mb-3">
                            <strong>2015 - nay</strong>
                            <p className="mb-0">Trưởng khoa Tim mạch</p>
                            <small className="">
                                BV Đại học Y Dược
                            </small>
                        </li>

                        <li>
                            <strong>2010 - 2015</strong>
                            <p className="mb-0">Bác sĩ nội trú cao cấp</p>
                            <small className="">
                                Pháp
                            </small>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Education */}
            <div className="col-md-6">
                <div className="card p-4 h-100 shadow-sm">
                    <div className="d-flex gap-2 align-items-center">
                        <span className="icon-box material-symbols-outlined">school</span>
                        <h5 className="fw-bold mb-3 text-primary-customer">Học vấn</h5>
                    </div>

                    <ul className="list">
                        <li className="mb-3">
                            <strong>Tiến sĩ Y khoa</strong>
                            <p className="text-muted mb-0">
                                Đại học Y Dược TP.HCM
                            </p>
                        </li>

                        <li>
                            <strong>Chứng chỉ Can thiệp mạch</strong>
                            <p className="text-muted mb-0">
                                Mayo Clinic - Hoa Kỳ
                            </p>
                        </li>
                    </ul>

                </div>
            </div>

            {/* Bio */}
            <div className="col-12">
                <div className="card p-4 shadow-sm">
                    <h5 className="fw-bold mb-3 text-primary-customer">Về Bác sĩ</h5>

                    <p className="">
                        Với hơn 20 năm kinh nghiệm, bác sĩ đã điều trị thành công hàng ngàn
                        ca bệnh tim mạch phức tạp.
                    </p>

                    <p className="">
                        Ông thường xuyên tham gia hội nghị quốc tế và có nhiều bài báo khoa học.
                    </p>
                </div>
            </div>
        </div>
    );
}