export default function DoctorInfo({ doctor }) {
    if (!doctor) return null;

    return (
        <div className="row g-4">

            {/* EXPERIENCE */}
            <div className="col-md-6">
                <div className="card p-4 h-100 shadow-sm">

                    <div className="d-flex gap-2 align-items-center">
                        <span className="icon-box material-symbols-outlined">
                            history_edu
                        </span>
                        <h5 className="fw-bold mb-3 text-primary-customer">
                            Kinh nghiệm
                        </h5>
                    </div>

                    <ul className="list-history-edu">
                        {doctor.experience?.length > 0 ? (
                            doctor.experience.map((exp, index) => (
                                <li className="mb-3" key={index}>
                                    <strong>
                                        {exp.from} - {exp.to || "nay"}
                                    </strong>
                                    <p className="mb-0">{exp.position}</p>
                                    <small>{exp.hospital}</small>
                                </li>
                            ))
                        ) : (
                            <li>
                                <p className="text-muted mb-0">
                                    {doctor.exp} năm kinh nghiệm
                                </p>
                            </li>
                        )}
                    </ul>

                </div>
            </div>

            {/* EDUCATION */}
            <div className="col-md-6">
                <div className="card p-4 h-100 shadow-sm">

                    <div className="d-flex gap-2 align-items-center">
                        <span className="icon-box material-symbols-outlined">
                            school
                        </span>
                        <h5 className="fw-bold mb-3 text-primary-customer">
                            Học vấn
                        </h5>
                    </div>

                    <ul className="list">
                        {doctor.education?.length > 0 ? (
                            doctor.education.map((edu, index) => (
                                <li className="mb-3" key={index}>
                                    <strong>{edu.degree}</strong>
                                    <p className="text-muted mb-0">
                                        {edu.school}
                                    </p>
                                </li>
                            ))
                        ) : (
                            <li>
                                <p className="text-muted mb-0">
                                    Chưa cập nhật học vấn
                                </p>
                            </li>
                        )}
                    </ul>

                </div>
            </div>

            {/* BIO */}
            <div className="col-12">
                <div className="card p-4 shadow-sm">

                    <h5 className="fw-bold mb-3 text-primary-customer">
                        Về bác sĩ
                    </h5>

                    {doctor.bio ? (
                        <>
                            <p>{doctor.bio}</p>
                        </>
                    ) : (
                        <p className="text-muted">
                            Chưa có thông tin giới thiệu
                        </p>
                    )}

                </div>
            </div>

        </div>
    );
}