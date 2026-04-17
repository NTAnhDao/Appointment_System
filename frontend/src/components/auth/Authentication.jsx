import { Link } from "react-router-dom";

export default function Authentication({ children, type }) {
  const isRegister = type === "register";

  return (

    <div className="auth-container min-vh-100">

      {/* LEFT SECTION */}
      <div className={`auth-left d-none d-lg-flex flex-column justify-content-between ${isRegister ? 'register-bg' : 'login-bg'}`}>
        <div>
          {/* Tiêu đề + Icon medical_services */}
          <h5 className="fw-bold text-white mb-5 d-flex align-items-center gap-2">
            <span className="material-symbols-outlined">medical_services</span>
            Superior Health Clinic
          </h5>

          <h1 className="auth-title text-white mb-4">
            Sanctuary of<br />Care.
          </h1>

          {/* Nội dung miêu tả thay đổi động */}
          <p className="auth-desc text-white">
            {isRegister
              ? <> Nơi sự tận tâm gặp gỡ công nghệ y khoa hiện đại. Chúng tôi cam kết<br />
                    mang lại trải nghiệm chăm sóc sức khỏe an lành và chuyên nghiệp<br />
                    nhất cho bạn.
                </>
              : <>
                Chào mừng bạn đến với hệ thống đặt lịch khám bệnh trực tuyến. Chúng<br />
                tôi kết nối bạn với những chuyên gia y tế hàng đầu trong một không<br />
                gian an tâm và tin cậy.
              </>
            }
          </p>
        </div>

        {/* Footer trái thay đổi động */}
        <div className="auth-footer text-white mt-auto">
          {isRegister ? (
            // Footer form Đăng ký: 2 icons
            <div className="d-flex gap-4 opacity-75">
              <span className="d-flex align-items-center gap-2">
                <span className="material-symbols-outlined fs-5">verified</span> Tiêu chuẩn quốc tế
              </span>
              <span className="d-flex align-items-center gap-2">
                <span className="material-symbols-outlined fs-5">shield</span> Bảo mật tuyệt đối
              </span>
            </div>
          ) : (
            // Footer form Đăng nhập: Avatar group + text
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex">
                <img src="https://i.pravatar.cc/100?img=1" alt="Doctor" className="rounded-circle border border-2 border-primary" style={{ width: '35px', height: '35px', zIndex: 3 }} />
                <img src="https://i.pravatar.cc/100?img=5" alt="Doctor" className="rounded-circle border border-2 border-primary ms-n2" style={{ width: '35px', height: '35px', zIndex: 2, marginLeft: '-10px' }} />
                <div className="rounded-circle border border-2 border-primary ms-n2 d-flex align-items-center justify-content-center text-white fw-bold" style={{ width: '35px', height: '35px', zIndex: 1, marginLeft: '-10px', fontSize: '11px', backgroundColor: '#43b9b8' }}>
                  +200
                </div>
              </div>
              <span className="fw-medium">Hơn 200 bác sĩ đầu ngành sẵn sàng tư vấn</span>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="auth-right flex-grow-1 d-flex align-items-center">
        <div className="auth-box w-100">

          {/* Tabs */}
          <div className="auth-tabs mb-5">
            <Link
              to="/login"
              className={!isRegister ? "active" : ""}
            >
              Đăng nhập
            </Link>

            <Link
              to="/register"
              className={isRegister ? "active" : ""}
            >
              Đăng ký tài khoản
            </Link>
          </div>

          {/* Render form con (Login / Register) */}
          {children}
          <div className="mt-4">
            {/* Đường kẻ ngang và chữ "HOẶC..." */}
            <div className="d-flex align-items-center mb-4">
              <hr className="flex-grow-1 text-muted opacity-25" />
              <span className="mx-3 text-muted" style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase' }}>
                {isRegister ? "Hoặc" : "Hoặc đăng nhập bằng"}
              </span>
              <hr className="flex-grow-1 text-muted opacity-25" />
            </div>

            {/* Nút Đăng nhập Google */}
            <button
              type="button"
              className="btn bg-white w-100 d-flex align-items-center justify-content-center gap-2 py-2 border shadow-none"
              style={{ fontWeight: '600', color: '#333', borderColor: '#e0e0e0', borderRadius: '8px' }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                alt="Google logo"
                style={{ width: '18px', height: '18px' }}
              />
              Tiếp tục với Google
            </button>
          </div>

          {/* PHẦN CHUNG PHÍA DƯỚI */}
          <div className="text-center text-muted mt-5" style={{ fontSize: '12px', lineHeight: '1.6' }}>
            {isRegister ? (
              <>
                © 2026 Superior Health Clinic. Mọi quyền được bảo lưu.<br />
                Bằng việc đăng ký, bạn đồng ý với <Link to="#" className="text-dark fw-medium text-decoration-none">Điều khoản dịch vụ</Link> và <Link to="#" className="text-dark fw-medium text-decoration-none">Chính sách bảo mật</Link> của chúng tôi.
              </>
            ) : (
              <>
                © 2026 Superior Health Clinic. Bảo mật thông tin của bạn là ưu tiên<br />
                hàng đầu của chúng tôi.
              </>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}