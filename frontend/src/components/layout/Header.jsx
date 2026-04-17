import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
    const nav = useNavigate();
    const location = useLocation();
    const isActive = (path) => location.pathname.includes(path);

    return (
        <nav className="navbar navbar-expand-lg bg-white border-bottom py-3 custom-navbar fixed-top">
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
                        <li className="nav-item"><a className="nav-link"
                        onClick={() => nav("/appointments") }
                        >Lịch đặt </a></li>
                        <li className="nav-item"><a className="nav-link"
                        onClick={() => nav("/profiles") }
                        >Hồ sơ  </a></li>
                    </ul>

                    <div className="d-flex gap-2 mt-3 mt-lg-0">
                        <button className="btn btn-accent-custom">Đăng nhập</button>
                        <button className="btn btn-primary-custom"
                        onClick={() => nav("/booking") }
                        >Đặt lịch ngay</button>
                    </div>
                </div>
            </div>
        </nav>

    );
}