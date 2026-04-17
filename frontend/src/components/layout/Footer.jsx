export default function Footer() {
    return (
        <footer className="footer py-5 border-top">
            <div className="container-fluid px-4">
                <div className="row gy-4">
                    {/* COL 1 */}
                    <div className="col-12 col-md-3">
                        <h5 className="fw-bold text-primary-customer mb-3">
                            University Medical Center
                        </h5>
                        <p className="text-muted small">
                            Hệ thống y tế chăm sóc sức khỏe toàn diện với tiêu chuẩn quốc tế và tinh thần nhân văn.
                        </p>
                        <div className="d-flex gap-3 mt-3">
                            <div className="icon-circle">
                                <span className="material-symbols-outlined">public</span>
                            </div>
                            <div className="icon-circle">
                                <span className="material-symbols-outlined">mail</span>
                            </div>
                            <div className="icon-circle">
                                <span className="material-symbols-outlined">call</span>
                            </div>
                        </div>
                    </div>

                    {/* COL 2 */}
                    <div className="col-6 col-md-3">
                        <h6 className="fw-bold mb-3 text-footer">Dịch vụ</h6>
                        <ul className="list-unstyled footer-link">
                            <li>Khám sức khỏe tổng quát</li>
                            <li>Xét nghiệm tại nhà</li>
                            <li>Tư vấn sức khỏe từ xa</li>
                            <li>Tiêm chủng vaccine</li>
                        </ul>
                    </div>

                    {/* COL 3 */}
                    <div className="col-6 col-md-3">
                        <h6 className="fw-bold mb-3 text-footer">Liên kết</h6>
                        <ul className="list-unstyled footer-link">
                            <li>Về chúng tôi</li>
                            <li>Liên hệ</li>
                            <li>Chính sách bảo mật</li>
                            <li>Điều khoản sử dụng</li>
                        </ul>
                    </div>

                    {/* COL 4 */}
                    <div className="col-12 col-md-3">
                        <h6 className="fw-bold mb-3 text-footer">Đăng ký bản tin</h6>
                        <p className="text-muted small">
                            Nhận kiến thức y khoa và ưu đãi mới nhất
                        </p>
                    </div>

                </div>
                {/* COPYRIGHT */}
                <div className="text-center text-muted small mt-5 pt-3 border-top">
                    © 2026 Superior Health Clinic.
                </div>
            </div>
        </footer>

    );
}