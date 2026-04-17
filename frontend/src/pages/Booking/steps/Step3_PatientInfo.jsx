import { useState } from "react";
import { useBooking } from "../../../context/BookingContext";

export default function Step3_PatientInfo() {
  const { bookingData, setBookingData, nextStep, prevStep } = useBooking();
  const [selected, setSelected] = useState("me");

  const profiles = [
    {
      id: "me",
      name: "Tôi",
      age: 22,
      gender: "Nam",
    },
    {
      id: "mother",
      name: "Mẹ - Nguyễn Thị A",
      age: 50,
      gender: "Nữ",
    },
  ];

  const handleContinue = () => {
    const patient = profiles.find((p) => p.id === selected);

    setBookingData((prev) => ({
      ...prev,
      patient,
    }));

    nextStep();
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
        {profiles.map((item) => (
          <div key={item.id} className="col-md-4 mb-3">
            <div
              className={`card p-4 ${
                selected === item.id ? "border-primary" : ""
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => setSelected(item.id)}
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
                    <div className="fw-medium">{item.name}</div>
                    <div className="text-muted small">
                      {item.age} tuổi • {item.gender}
                    </div>
                  </div>
                </div>

                {/* Radio */}
                <input
                  type="radio"
                  checked={selected === item.id}
                  readOnly
                />
              </div>
            </div>
          </div>
        ))}

        {/* Add new */}
        <div className="col-md-4 mb-3">
          <div
            className="card p-4 text-center border"
            style={{
              borderStyle: "dashed",
              cursor: "pointer",
            }}
          >
            <div style={{ fontSize: 24 }}>＋</div>
            <div className="fw-medium mt-2">Thêm hồ sơ</div>
            <div className="text-muted small">
              Cho người thân khác
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
        <div className="d-flex justify-content-between align-items-center mt-5 action-bar">
            <button className="btn btn-back" onClick={prevStep}>
                <span className="material-symbols-outlined me-1">arrow_back</span>
                Quay lại
            </button>

            <button className="btn btn-next" onClick={handleContinue}>
                Tiếp tục
                <span className="material-symbols-outlined ms-1">arrow_forward</span>
            </button>
        </div>
    </div>
  );
}