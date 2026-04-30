import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
    const nav = useNavigate();
    const location = useLocation();
    
    // Tạo state để lưu trạng thái đăng nhập
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Kiểm tra trạng thái đăng nhập mỗi khi Component render hoặc chuyển trang
    useEffect(() => {
        // Giả sử khi login thành công, bạn lưu token với tên là 'token' hoặc 'user'
        const token = localStorage.getItem("token"); 
        
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [location.pathname]); // Chạy lại hàm này nếu URL thay đổi

    // Hàm xử lý khi bấm nút "Đăng xuất" (Nên có nếu đã ẩn nút Đăng nhập)
    const handleLogout = () => {
        localStorage.removeItem("token"); // Xóa token
        setIsLoggedIn(false);
        nav("/"); // Về trang chủ
    };

    // Hàm xử lý riêng cho nút "Đặt lịch ngay"
    const handleBookingClick = () => {
        if (isLoggedIn) {
            nav("/booking"); // Nếu đã đăng nhập -> Tới trang đặt lịch
        } else {
            nav("/login"); // Nếu chưa đăng nhập -> Ép sang trang đăng nhập
        }
    };

    return (
        <nav className="navbar navbar-expand-lg bg-white border-bottom py-2 custom-navbar fixed-top">
            <div className="container-fluid px-4">
                <a className="navbar-brand fw-bold logo d-flex align-items-center gap-2" 
                   onClick={() => nav("/")} 
                   style={{ cursor: "pointer" }}
                >
                    <span className="material-symbols-outlined">medical_services</span>
                    Superior Health Clinic
                </a>

                <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="nav">
                    <ul className="navbar-nav mx-auto text-center">
                        <li className="nav-item"><a className="nav-link" onClick={() => nav("/")} style={{ cursor: "pointer" }}>Trang chủ</a></li>
                        <li className="nav-item"><a className="nav-link" onClick={() => nav("/doctors")} style={{ cursor: "pointer" }}>Bác sĩ</a></li>
                        <li className="nav-item"><a className="nav-link" onClick={() => nav("/appointments")} style={{ cursor: "pointer" }}>Lịch đặt</a></li>
                        <li className="nav-item"><a className="nav-link" onClick={() => nav("/profiles")} style={{ cursor: "pointer" }}>Hồ sơ</a></li>
                    </ul>

                    <div className="d-flex gap-2 mt-3 mt-lg-0">

                        {/* KIỂM TRA ĐIỀU KIỆN ẨN/HIỆN NÚT ĐĂNG NHẬP */}
                        {!isLoggedIn ? (
                            <button className="btn-loginnn" onClick={() => nav("/login")}>
                                Đăng nhập
                            </button>
                        ) : (
                            <button className="btn-logout" onClick={handleLogout}>
                                Đăng xuất
                            </button>
                        )}

                        {/* NÚT ĐẶT LỊCH GỌI HÀM XỬ LÝ ĐIỀU KIỆN */}
                        <button className="btn-booking" onClick={handleBookingClick}>
                            Đặt lịch ngay
                        </button>

                    </div>
                </div>
            </div>
        </nav>
    );
}