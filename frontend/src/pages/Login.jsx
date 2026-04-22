import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Authentication from "../components/auth/Authentication.jsx";
import Dialog from "../components/ui/dialog.jsx";
import validateForm from "../utils/validate.js";
import '../styles/auth.css'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const nav = useNavigate();
  const [dialog, setDialog] = useState({
    open: false,
    title: "",
    message: "",
    type: "info"
  });

  const [formData, setFormData] = useState({
    phone: "",
    password: ""
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    const errorMsg = validateForm(formData);

    if (errorMsg) {
      setDialog({
        open: true,
        title: "Lỗi nhập liệu",
        message: errorMsg,
        type: "error"
      });
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      localStorage.setItem('token', data.data.token);

      setDialog({
        open: true,
        title: "Thành công",
        message: "Đăng nhập thành công",
        type: "success"
      });

      setTimeout(() => {
        nav("/");
      }, 1000);

    } catch (err) {
      setDialog({
        open: true,
        title: "Lỗi",
        message: err.message,
        type: "error"
      });
    }
  };

  return (
    <>
      <div>
        <Authentication type="login">
          <div>
            <h2 className="fw-bold mb-2">Mừng bạn quay lại</h2>
            <p className="text-muted mb-4" style={{ fontSize: '14px' }}>
              Vui lòng nhập thông tin để truy cập hồ sơ sức khỏe của bạn.
            </p>

            <form onSubmit={handleLogin} noValidate>

              {/* EMAIL */}
              <div className="mb-4">
                <label className="form-label-custom">Số điện thoại</label>
                <div className="custom-input-group">
                  {/* Đổi icon thành call hoặc phone */}
                  <span className="material-symbols-outlined prefix-icon">call</span>
                  <input
                    type="tel" // Đổi type thành tel cho đúng chuẩn
                    className="form-control"
                    placeholder="0912345678" // Đổi placeholder mẫu
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label className="form-label-custom mb-0">Mật khẩu</label>
                  <Link to="#" className="text-decoration-none" style={{ fontSize: '12px', fontWeight: '600', color: '#0a4073' }}>
                    Quên mật khẩu?
                  </Link>
                </div>

                <div className="custom-input-group">
                  <span className="material-symbols-outlined prefix-icon">lock</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <span
                    className="material-symbols-outlined eye-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </div>
              </div>

              <button className="btn btn-login w-100 mt-2">
                Đăng nhập ngay →
              </button>
            </form>
          </div>
        </Authentication>
        <Dialog
          open={dialog.open}
          title={dialog.title}
          message={dialog.message}
          type={dialog.type}
          onClose={() => setDialog({ ...dialog, open: false })}
        />
      </div>
    </>
  );
}