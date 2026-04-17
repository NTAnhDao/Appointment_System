import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Authentication from "../components/auth/Authentication.jsx";
import Dialog from "../components/ui/dialog.jsx";
import validateForm from "../utils/validate.js";
import '../styles/auth.css'

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const nav = useNavigate();
    const [dialog, setDialog] = useState({
        open: false,
        title: "",
        message: "",
        type: "info"
    });

    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        email: "",
        password: ""
    });

    const handleRegister = async (e) => {
        e.preventDefault();

        const errorMsg = validateForm(formData, true);

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
            const res = await fetch('http://localhost:5000/api/v1/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!data.success) throw new Error(data.message);

            setDialog({
                open: true,
                title: "Thành công",
                message: "Đăng ký thành công",
                type: "success"
            });

            setTimeout(() => {
                nav("/login");
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
                <Authentication type="register">
                    <div>
                        <h2 className="mb-2 fw-bold">Tạo tài khoản mới</h2>
                        <p className="text-muted mb-4" style={{ fontSize: '14px' }}>
                            Tạo tài khoản để quản lý lịch hẹn và hồ sơ sức khỏe của bạn.
                        </p>

                        <form onSubmit={handleRegister} noValidate>

                            {/* FULL NAME */}
                            <div className="mb-3">
                                <label className="form-label-custom">Họ và tên</label>
                                <div className="custom-input-group no-prefix">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nguyễn Văn A"
                                        value={formData.fullName}
                                        onChange={(e) =>
                                            setFormData({ ...formData, fullName: e.target.value })
                                        }
                                    />
                                </div>
                            </div>

                            {/* PHONE + EMAIL */}
                            <div className="row mb-3">
                                <div className="col-6 pr-2">
                                    <label className="form-label-custom">Số điện thoại</label>
                                    <div className="custom-input-group no-prefix">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="0901 234 567"
                                            value={formData.phone}
                                            onChange={(e) =>
                                                setFormData({ ...formData, phone: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="col-6 pl-2">
                                    <label className="form-label-custom">Email</label>
                                    <div className="custom-input-group no-prefix">
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="email@example.com"
                                            value={formData.email}
                                            onChange={(e) =>
                                                setFormData({ ...formData, email: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* PASSWORD */}
                            <div className="mb-4">
                                <label className="form-label-custom">Mật khẩu</label>
                                <div className="custom-input-group no-prefix">
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

                                <small className="text-muted d-block mt-2" style={{ fontSize: '11px' }}>
                                    Mật khẩu tối thiểu 8 ký tự bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.
                                </small>
                            </div>

                            <button className="btn btn-login w-100 mt-2">
                                Đăng ký ngay →
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