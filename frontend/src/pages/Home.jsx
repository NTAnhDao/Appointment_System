import MainLayout from "../components/layout/MainLayout";
import { useNavigate} from "react-router-dom";
export default function Home() {
    const nav = useNavigate();
  return (
    <MainLayout>
      {/* HERO */}
      <section className="hero">
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

               <button
                  className="btn btn-primary-custom px-4 py-2 d-inline-flex align-items-center gap-2 mt-3"
                  onClick={() => nav("/login")}>
                  Đặt lịch ngay
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
                </button>
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




    </MainLayout>
  );
}