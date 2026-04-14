
export default function Home() {
  return (
    <div className="home min-vh-100 d-flex flex-column">

      {/* HEADER */}
      <nav className="navbar navbar-expand-lg bg-white border-bottom py-3 custom-navbar">
        <div className="container-fluid px-4">
          <a className="navbar-brand fw-bold logo">
            Superior Health Clinic
          </a>

          <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="nav">
            <ul className="navbar-nav mx-auto text-center">
              <li className="nav-item"><a className="nav-link active">Trang chủ</a></li>
              <li className="nav-item"><a className="nav-link">Chuyên khoa</a></li>
              <li className="nav-item"><a className="nav-link">Bác sĩ</a></li>
              <li className="nav-item"><a className="nav-link">Đặt lịch</a></li>
            </ul>

            <div className="d-flex gap-2 mt-3 mt-lg-0">
              <button className="btn btn-accent-custom">Đăng nhập</button>
              <button className="btn btn-primary-custom">Đặt lịch ngay</button>
            </div>
          </div>
        </div>
      </nav>
      <main className="flex-grow-1">
        {/* HERO */}
        <section className="hero py-5">
          <div className="container-fluid px-4">
            <div className="row align-items-center">

              <div className="col-lg-6">
                <span className="badge-custom">
                  HỆ THỐNG Y TẾ HÀNG ĐẦU
                </span>

                <h1 className="fw-bold hero-title mt-3">
                  Đăng ký khám bệnh <br />
                  <span>trực tuyến</span>
                </h1>

                <p className="text-muted mt-3">
                  Nhanh chóng, tiết kiệm thời gian. Tiếp cận đội ngũ chuyên gia hàng đầu và dịch vụ y tế chuẩn quốc tế chỉ với vài thao tác.
                </p>
              </div>

              <div className="col-lg-6 mt-4 mt-lg-0">
                <img
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d"
                  className="img-fluid rounded-4 shadow"
                />
              </div>

            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="stats text-center py-4 mt-5">
          <div className="container-fluid px-4">
            <div className="row">
              <div className="col-6 col-md-3 text-primary-customer"><strong><h3>2M+</h3></strong><h6>Bệnh nhân tin tưởng</h6></div>
              <div className="col-6 col-md-3 text-primary-customer"><strong><h3>50+</h3></strong><h6>Chuyên khoa mũi nhọn</h6></div>
              <div className="col-6 col-md-3 text-primary-customer"><strong><h3>200+</h3></strong><h6>Bác sĩ chuyên gia</h6></div>
              <div className="col-6 col-md-3 text-primary-customer"><strong><h3>30+</h3></strong><h6>Năm kinh nghiệm</h6></div>
            </div>
          </div>
        </section>

        {/* SPECIALTIES */}
        <section className="specialties py-5 mt-5">
          <div className="container-fluid px-4">

            {/* TITLE */}
            <div className="specialties-header text-primary-customer mb-5">
              <h2>Chuyên khoa mũi nhọn</h2>
            </div>

            {/* GRID */}
            <div className="row g-4">

              {[
                {
                  title: "Nội khoa",
                  desc: "Điều trị tổng quát, tim mạch, tiêu hóa và hô hấp.",
                  icon: "medical_services"
                },
                {
                  title: "Ngoại khoa",
                  desc: "Phẫu thuật kỹ thuật cao, nội soi và ít xâm lấn.",
                  icon: "content_cut"
                },
                {
                  title: "Nhi khoa",
                  desc: "Chăm sóc sức khỏe toàn diện cho trẻ em và trẻ sơ sinh.",
                  icon: "child_care"
                },
                {
                  title: "Tim mạch",
                  desc: "Chẩn đoán và can thiệp các bệnh lý tim mạch phức tạp.",
                  icon: "favorite"
                }
              ].map((item, i) => (
                <div className="col-12 col-sm-6 col-lg-3" key={i}>
                  <div className="specialty-card h-100">
                    <div className="icon-box">
                      <span className="material-symbols-outlined">
                        {item.icon}
                      </span>
                    </div>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DOCTORS */}
        <section className="doctor-section py-5">
          <div className="container-fluid px-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 className="fw-bold text-primary-customer">Đội ngũ bác sĩ chuyên gia</h2>
                <p className="text-muted">
                  Các chuyên gia hàng đầu từ các bệnh viện đại học danh tiếng, tận tâm và giàu kinh nghiệm
                </p>
              </div>
              <a href="#" className="view-all">
                Tất cả bác sĩ →
              </a>
            </div>

            <div className="row g-4">
              {[
                {
                  name: "Nguyễn Văn A",
                  title: "PGS. TS. BS",
                  specialty: "Trưởng khoa Nội Tim mạch",
                  status: "Có lịch hôm nay",
                  badge: "badge-success"
                },
                {
                  name: "Trần Thị B",
                  title: "TS. BS",
                  specialty: "Chuyên gia Sản Phụ khoa",
                  status: "Sẵn sàng",
                  badge: "badge-ready"
                },
                {
                  name: "Lê Văn C",
                  title: "ThS. BS",
                  specialty: "Khoa Ngoại Thần kinh",
                  status: "Đã hết lịch",
                  badge: "badge-full"
                }
              ].map((doctor, i) => (
                <div className="col-12 col-md-6 col-lg-4" key={i}>
                  <div className="card doctor-card">
                    <div className="doctor-img">
                      <img
                        src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2"
                        alt="doctor"
                      />
                      <span className={`doctor-badge ${doctor.badge}`}>
                        {doctor.status}
                      </span>
                    </div>
                    <div className="doctor-info">
                      <p className="doctor-title">{doctor.title}</p>
                      <h5 className="doctor-name">
                        {doctor.name}
                      </h5>
                      <p className="doctor-specialty">
                        {doctor.specialty}
                      </p>
                      <button className="btn doctor-btn w-100">
                        Đặt lịch khám
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-5">
          <div className="container-fluid px-4">
            <div className="cta-box text-center">
              <h2>Sẵn sàng trải nghiệm dịch vụ y tế 5 sao?</h2>
              <p>Đặt lịch ngay không cần chờ</p>

              <div className="mt-4">
                <button className="btn btn-light me-2">Đặt lịch</button>
                <button className="btn btn-outline-light">Tư vấn</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer py-5">
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

    </div>
  );
}