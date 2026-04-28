import { useState, useEffect } from "react";
import { useBooking } from "../../../context/BookingContext";
import { getPatientsAPI, createPatientAPI } from "../../../services/patientService";
import PatientForm from "../../../components/patients/PatientForm";

export default function Step3_PatientInfo() {
  const { bookingData, setBookingData, nextStep, prevStep } = useBooking();
  const [selected, setSelected] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getPatientsAPI();
          console.log("DATA:", data); 
        setProfiles(data || []);
        if (data && data.length > 0) {
          setSelected(data[0].ID || data[0].id);
        }
      } catch (err) {
        console.error("❌ Error fetching patients:", err);
        setProfiles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleContinue = () => {
    const patient = profiles.find((p) => (p.ID || p.id) === selected);

    setBookingData((prev) => ({
      ...prev,
      patient,
      patientId: selected,
    }));

    nextStep();
  };

  const getGenderVi = (gender) => {
    if (!gender) return "Không xác định";
    const genderMap = {
      M: "Nam",
      F: "Nữ",
      O: "Khác",
      "male": "Nam",
      "female": "Nữ",
      "other": "Khác",
    };
    return genderMap[gender] || gender;
  };

  const getRelationVi = (relation) => {
    if (!relation) return "";
    const relationMap = {
      "self": "Bản thân",
      "husband": "Chồng",
      "wife": "Vợ",
      "parent": "Bố/Mẹ",
      "child": "Con",
      "sister": "Chị/Em gái",
      "brother": "Anh/Em trai",
      "grandparent": "Ông/Bà",
      "grandchild": "Cháu",
      "other": "Khác",
    };
    return relationMap[relation] || relation;
  };

  const handleAddPatientSuccess = async () => {
    // Reload danh sách bệnh nhân
    try {
      const data = await getPatientsAPI();
      setProfiles(data || []);
      
      // Set selected = patient mới nhất (ID lớn nhất hoặc phần tử cuối)
      if (data && data.length > 0) {
        const newPatientId = data[data.length - 1].ID || data[data.length - 1].id;
        setSelected(newPatientId);
      }
    } catch (err) {
      console.error("❌ Error reloading patients:", err);
    }
    
    setShowForm(false);
  };

  return (
    <div className="container py-4">
      {/* Title */}
      <h3 className="fw-bold">Thông tin khám cho ai?</h3>
      <p className="text-muted">
        Chọn hồ sơ người bệnh hoặc thêm hồ sơ mới để tiếp tục đặt lịch
      </p>

      {/* Profiles */}
      <div className="row mt-4">
        {loading ? (
          <div className="col-12 text-center">
            <p className="text-muted">Đang tải thông tin...</p>
          </div>
        ) : profiles.length > 0 ? (
          profiles.map((item) => {
            const patientId = item.ID || item.id;
            const name = item.FULL_NAME || item.full_name || "Bệnh nhân";
            const dob = item.DOB || item.dob;
            const age = dob
              ? new Date().getFullYear() - new Date(dob).getFullYear()
              : 0;
            const gender = getGenderVi(item.GENDER || item.gender);
            const relation = getRelationVi(item.RELATION || item.relation);

            return (
              <div key={patientId} className="col-md-4 col-sm-6 mb-3">
                <div
                  className={`card p-4 ${
                    selected === patientId ? "border-primary" : ""
                  }`}
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelected(patientId)}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    {/* Left */}
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="bg-dark text-white d-flex align-items-center justify-content-center"
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 10,
                          fontSize: 20,
                        }}
                      >
                        👤
                      </div>

                      <div>
                        <div className="fw-medium">{name}</div>
                        <div className="text-muted small">
                          {age} tuổi • {gender}
                          {relation && ` • ${relation}`}
                        </div>
                      </div>
                    </div>

                    {/* Radio */}
                    <input
                      type="radio"
                      checked={selected === patientId}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-12 text-center">
            <p className="text-muted">Không có hồ sơ bệnh nhân nào</p>
          </div>
        )}

        {/* Add new */}

        <div className="col-md-4 mb-3">
          <div
            className="card add-card"
            onClick={() => setShowForm(true)}
          >
            <div className="add-content">
              <div className="add-icon">＋</div>

              <div>
                <div className="fw-medium">Thêm hồ sơ</div>
                <div className="text-muted small">
                  Cho người thân khác
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="d-flex justify-content-between align-items-center mt-3 action-bar">
        <button className="btn btn-back" onClick={prevStep}>
          <span className="material-symbols-outlined me-1">arrow_back</span>
          Quay lại
        </button>

        <button 
          className="btn btn-next" 
          onClick={handleContinue}
          disabled={loading || !selected}
        >
          Tiếp tục
          <span className="material-symbols-outlined ms-1">arrow_forward</span>
        </button>
      </div>

      {/* Patient Form Modal */}
      {showForm && (
        <>
          <div
            className="modal-backdrop fade show"
            onClick={() => setShowForm(false)}
          ></div>
          <div
            className="modal d-block fade show"
            style={{ paddingRight: "17px" }}
          >
            <div 
              className="modal-dialog modal-dialog-centered"
              style={{ maxWidth: "800px", width: "100%" }}
            >               
              <div className="modal-content border-0 shadow-lg">
                <div className="modal-header border-bottom-0 pb-0">
                  <h5 className="modal-title fw-bold">
                    <span className="material-symbols-outlined me-2" style={{ fontSize: "24px", verticalAlign: "middle" }}>
                      person_add
                    </span>
                    Thêm hồ sơ bệnh nhân
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowForm(false)}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <PatientForm
                    selectedPatient={null}
                    onSuccess={handleAddPatientSuccess}
                    onCancel={() => setShowForm(false)}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}