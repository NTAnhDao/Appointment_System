import { useState, useEffect } from "react";
import "./patientsForm.css";
import Select from "react-select"
import ethnicities from "./ethnicities.json"
import {createPatientAPI, updatePatientAPI } from "../../services/patientService.js"  
import { toast } from "react-toastify"


export default function PatientForm({ selectedPatient, onSuccess }) {
  const isEdit = !!selectedPatient
  const [form, setForm] = useState({
      relation: "self",
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
    })
  useEffect(() => {
    if (selectedPatient) {
      setForm({
        relation: selectedPatient.RELATION || "self",
        full_name: selectedPatient.FULL_NAME || "",
        gender: selectedPatient.GENDER || "male",
        dob: selectedPatient.DOB?.split("T")[0] || "",
        identity_number: selectedPatient.IDENTITY_NUMBER || "",
        phone: selectedPatient.PHONE || "",
        email: selectedPatient.EMAIL || "",
        job: selectedPatient.JOB || "",
        ethnicity: selectedPatient.ETHNICITY || "",
        province: selectedPatient.PROVINCE || "",
        ward: selectedPatient.WARD || "",
        address_detail: selectedPatient.ADDRESS_DETAIL || "",
        guardian: {
          full_name: "",
          identity_number: "",
          phone: "",
          email: "",
        }
      })

      // nếu là người thân thì bật dropdown
      if (selectedPatient.RELATION !== "self") {
        setShowRelative(true)
      }else{
        setShowRelative(false)
      }

    } else {
      // CREATE MODE (reset form)
      setForm({
        relation: "self",
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
        }
      })

      setShowRelative(false)
    }
  }, [selectedPatient])

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

  const [provinces, setProvinces] = useState([])
  const [communes, setCommunes] = useState([])
  const [provinceId, setProvinceId] = useState("")
  const [showRelative, setShowRelative] = useState(false)

  useEffect(() => {
      fetch("http://localhost:5000/api/locations/provinces")
      .then(res => res.json())
      .then(data => {
        setProvinces(data)
      })
  }, [])

  useEffect(() => {
    if (form.province) {
      fetch(`http://localhost:5000/api/locations/communes/${form.province}`)
        .then(res => res.json())
        .then(setCommunes)
    }
  }, [form.province])

  const handleProvinceChange = (id) => {
    setProvinceId(id)
    setForm({
      ...form,
      province: id,   
      ward: ""        // reset xã
    })

    fetch(`http://localhost:5000/api/locations/communes/${id}`)  
      .then(res => res.json())
      .then(data => {
        setCommunes(data)
      })
  }
  const communeOptions = communes.map(c => ({
    value: c.idCommune,
    label: c.name
  }))
  const relationOptions = [
    { value: "grandfather", label: "Ông" },
    { value: "grandmother", label: "Bà" },
    { value: "father", label: "Cha" },
    { value: "mother", label: "Mẹ" },
    { value: "husband", label: "Chồng" },
    { value: "wife", label: "Vợ" },
    { value: "brother", label: "Anh/Em trai" },
    { value: "sister", label: "Chị/Em gái" },
    { value: "child", label: "Con" },
    { value: "grandchild", label: "Cháu" },
    { value: "other", label: "Khác" }
  ]

  const selectedOption = relationOptions.find(
    o => o.value === form.relation
  )
  const ethnicOptions = ethnicities.map(e => ({
    value: e,
    label: e
  }))

  
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (isEdit) {
        await updatePatientAPI(selectedPatient.ID, form)
        toast.success("Cập nhật thành công!")
      } else {
        await createPatientAPI(form)
        toast.success("Tạo hồ sơ thành công!")
      }

      onSuccess?.()

    } catch (err) {
      toast.error(err.response?.data?.error || "Có lỗi xảy ra")
      console.log(err)
    }
  }

  const isMinor =
    new Date().getFullYear() - new Date(form.dob).getFullYear() < 18;

  return (
    <form onSubmit={handleSubmit} className="pf-container">
      <h3 className="pf-title">
        {isEdit ? "Chỉnh sửa hồ sơ" : "Tạo hồ sơ"}
      </h3>

      {/* Quan hệ */}
      <div className="pf-card">
        <h5 className="card-title">
            <span className="material-symbols-outlined">family_restroom</span>
             Quan hệ hồ sơ</h5>
        <div className="pf-grid-2">

          <div className="relation-group">
            <button
              type="button"
              className={!showRelative ? "active" : ""}
              onClick={() => {
                setForm({ ...form, relation: "self" })
                setShowRelative(false)
              }}
            >
              Bản thân
            </button>

            <button
              type="button"
              className={showRelative ? "active" : ""}
              onClick={() => setShowRelative(true)}
            >
              Người thân
            </button>
          </div>

          {/* DROPDOWN */}
          {showRelative && (
            <Select
              classNamePrefix="custom-select"
              options={relationOptions}
              value={relationOptions.find(o => o.value === form.relation)}
              onChange={(selected) =>
                setForm({
                  ...form,
                  relation: selected.value  
                })
              }
              placeholder="Chọn quan hệ..."
            />
          )}
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
            <label className="required">Email</label>
            <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className="pf-input"
            />
            </div>

            {/* Nghề nghiệp */}
            <div className="field">
            <label className="required">Nghề nghiệp </label>
            <input
                name="job"
                value={form.job}
                onChange={handleChange}
                className="pf-input"
            />
            </div>

            {/* Dân tộc */}
            <div className="field">
            <label className="required">Dân tộc</label>
            <Select 
              classNamePrefix="custom-select"
              options={ethnicOptions}
              value={ethnicOptions.find(o => o.value === form.ethnicity)}
              onChange={(selected) =>
                setForm({ ...form, ethnicity: selected?.value || "" })
              }
              placeholder="Chọn dân tộc..."
              isSearchable
            />
            </div>

        </div>
        </div>

      <div className="pf-card">
        <h5 className="card-title">
            <span className="material-symbols-outlined">location_on</span>
             Địa chỉ thường trú</h5>

       <div className="pf-grid-2">
        {/* PROVINCE */}
        <div className="field">
          <label className="required">Tỉnh/TP</label>
          <Select
            classNamePrefix="custom-select"
            options={provinces.map(p => ({
              value: p.idProvince,
              label: p.name
            }))}
            value={provinces
              .map(p => ({ value: p.idProvince, label: p.name }))
              .find(p => p.value === form.province)}
            onChange={(selected) => handleProvinceChange(selected.value)}
            placeholder="Chọn tỉnh/TP..."
          />
        </div>

        {/* COMMUNE */}
        <div className="field">
          <label className="required">Xã/Phường</label>
          <Select
            classNamePrefix="custom-select"
            options={communeOptions}
            value={communeOptions.find(c => c.value === form.ward) || null}
            onChange={(selected) =>
              setForm({ ...form, ward: selected.value })
            }
            placeholder="Chọn xã/phường..."
            isDisabled={!form.province}
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
              <label className="required">Họ tên </label>
              <input
                name="guardian.full_name"
                value={form.guardian.full_name}
                onChange={handleChange}
                className="pf-input"
              />
            </div>

            <div className="field">
              <label className="required">CCCD </label>
              <input
                name="guardian.identity_number"
                value={form.guardian.identity_number}
                onChange={handleChange}
                className="pf-input"
              />
            </div>

            <div className="field">
              <label className="required">SĐT </label>
              <input
                name="guardian.phone"
                value={form.guardian.phone}
                onChange={handleChange}
                className="pf-input"
              />
            </div>

            <div className="field">
              <label className="required">Email</label>
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

        <button type="submit" className="btn btn-primary">
          {isEdit ? "Cập nhật hồ sơ" : "Tạo hồ sơ"}
        </button>
      </div>
    </form>
  );
}