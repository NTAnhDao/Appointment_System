import { useState, useEffect } from "react";
import "./patientsForm.css";

export default function PatientForm({ mode = "create", initialData = {}, onSubmit }) {
  const [form, setForm] = useState({
    relation: "",
    full_name: "",
    gender: "male",
    dob: "",
    identity_number: "",
    phone: "",
    email: "",
    job: "",
    ethnicity: "",
    province: "",
    ward: "",
    address_detail: "",
    guardian: {
      full_name: "",
      identity_number: "",
      phone: "",
      email: "",
    },
  });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setForm(initialData);
    }
  }, [initialData, mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("guardian.")) {
      const key = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        guardian: { ...prev.guardian, [key]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const isMinor =
    new Date().getFullYear() - new Date(form.dob).getFullYear() < 18;

  return (
    <form onSubmit={handleSubmit} className="pf-container">
      <h3 className="pf-title">
        {mode === "create" ? "Tạo hồ sơ" : "Chỉnh sửa hồ sơ"}
      </h3>

      {/* Quan hệ */}
      <div className="pf-card">
        <h5 className="card-title">
            <span className="material-symbols-outlined">family_restroom</span>
             Quan hệ hồ sơ</h5>
        <div className="pf-grid-2">
          <select
            name="relation"
            value={form.relation}
            onChange={handleChange}
            className="pf-input"
          >
            <option value="">Chọn</option>
            <option value="self">Bản thân</option>
            <option value="child">Con</option>
          </select>

          <select className="pf-input">
            <option>Con</option>
          </select>
        </div>
      </div>

      {/* Thông tin cá nhân */}
    <div className="pf-card">
        <h5 className="section-title">
            <span className="material-symbols-outlined icon">person</span>
            Thông tin cá nhân
        </h5>

        <div className="pf-grid-2">

            {/* Họ tên */}
            <div className="field">
            <label className="required">Họ và tên </label>
            <input
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                className="pf-input"
            />
            </div>

            {/* Giới tính */}
            <div className="field">
            <label className="required" >Giới tính </label>
            <div className="gender-toggle">
                <button
                type="button"
                className={form.gender === "male" ? "active" : ""}
                onClick={() => setForm({ ...form, gender: "male" })}
                >
                Nam
                </button>
                <button
                type="button"
                className={form.gender === "female" ? "active" : ""}
                onClick={() => setForm({ ...form, gender: "female" })}
                >
                Nữ
                </button>
            </div>
            </div>

            {/* Ngày sinh */}
            <div className="field">
            <label className="required">Ngày sinh </label>
            <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                className="pf-input"
            />
            </div>

            {/* CCCD */}
            <div className="field">
            <label className="required">Số định danh (CCCD) </label>
            <input
                name="identity_number"
                value={form.identity_number}
                onChange={handleChange}
                className="pf-input"
            />
            </div>

            {/* SĐT */}
            <div className="field">
            <label className="required">Số điện thoại </label>
            <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="pf-input"
            />
            </div>

            {/* Email */}
            <div className="field">
            <label>Email</label>
            <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className="pf-input"
            />
            </div>

        </div>
        </div>

      <div className="pf-card">
        <h5 className="card-title">
            <span className="material-symbols-outlined">location_on</span>
             Địa chỉ thường trú</h5>

        <div className="pf-grid-2">
            <div className="field">
                <label className="required">Tỉnh/TP </label>
                <input
                name="province"
                value={form.province}
                onChange={handleChange}
                placeholder="Tỉnh/TP"
                className="pf-input"
                />
            </div>
           <div className="field">
                <label className="required">Tỉnh/TP </label>

            <input
                name="ward"
                value={form.ward}
                onChange={handleChange}
                placeholder="Xã/Phường"
                className="pf-input "
            />
            </div>
        </div>

        <div className="field full-width">
            <label className="required mt-3">Địa chỉ chi tiết </label>
        
            <input
            name="address_detail"
            value={form.address_detail}
            onChange={handleChange}
            placeholder="Địa chỉ chi tiết"
            className="pf-input"
            />
        </div>
      </div>

      {/* Guardian */}
      {isMinor && (
        <div className="guardian-card">
          <div className="guardian-header">
            <div>
                <h5 className="card-title">
                    <span className="material-symbols-outlined">family_restroom</span>
                    Thông tin người giám hộ</h5>

              <div className="guardian-sub">
                Tự động kích hoạt cho bệnh nhân dưới 18 tuổi
              </div>
            </div>
          </div>

          <div className="guardian-grid">
            <div className="field">
              <label>Họ tên *</label>
              <input
                name="guardian.full_name"
                value={form.guardian.full_name}
                onChange={handleChange}
                className="pf-input"
              />
            </div>

            <div className="field">
              <label>CCCD *</label>
              <input
                name="guardian.identity_number"
                value={form.guardian.identity_number}
                onChange={handleChange}
                className="pf-input"
              />
            </div>

            <div className="field">
              <label>SĐT *</label>
              <input
                name="guardian.phone"
                value={form.guardian.phone}
                onChange={handleChange}
                className="pf-input"
              />
            </div>

            <div className="field">
              <label>Email</label>
              <input
                name="guardian.email"
                value={form.guardian.email}
                onChange={handleChange}
                className="pf-input"
              />
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="pf-actions">
        <button type="button" className="btn cancel">
          Hủy
        </button>

        <button type="submit" className="btn primary">
          {mode === "create" ? "Tạo hồ sơ" : "Lưu thay đổi"}
        </button>
      </div>
    </form>
  );
}