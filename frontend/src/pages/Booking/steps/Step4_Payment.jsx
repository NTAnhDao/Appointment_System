import { useState } from "react";
import { useBooking } from "../../../context/BookingContext";
import { createAppointmentAPI } from "../../../services/BookingService";

export default function Step4_Payment() {
  const { bookingData, nextStep, prevStep } = useBooking();
  const [method, setMethod] = useState("vnpay");
  const doctor = bookingData.doctor || {};

  const methods = [
    { id: "vnpay", title: "Ví VNPay", desc: "Thanh toán qua VNPay" },
    { id: "momo", title: "Ví MoMo", desc: "Thanh toán qua MoMo" },
    { id: "qr", title: "QR Code", desc: "Quét mã ngân hàng" },
    { id: "cash", title: "Thanh toán tại viện", desc: "Trả tiền khi đến khám" },
  ];

  const handlePayment = async () => {
    try {
      // 1. Gọi API tạo appointment
      const res = await createAppointmentAPI({
        doctor_id: bookingData.doctor.doctor_id,
        schedule_id: bookingData.scheduleId,
        patient_id: bookingData.patient.patient_id,
        payment_method: method,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Tạo lịch thất bại");
      }

      console.log("Appointment created:", data);

      // 2. Tùy theo method mà xử lý tiếp (ví dụ redirect sang cổng thanh toán)

    } catch (err) {
      console.error(err);
      alert("Lỗi khi tạo lịch khám!");
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);

    return d.toLocaleDateString("vi-VN"); 
  };

  return (
    <div className="container py-4">
      <div className="row">

        {/* LEFT */}
        <div className="col-md-8">
          <div className="paymentmethod-container p-4 mb-4">
            <h4 className="payment-title mb-1">Phương thức thanh toán</h4>
            <p className="text-muted mb-4">
              Chọn cách thanh toán phù hợp cho lịch khám
            </p>

            <div className="row">
              {methods.map((m) => (
                <div key={m.id} className="col-md-6 mb-3">
                  <div
                    className={`payment-item-pro ${
                      method === m.id ? "active" : ""
                    }`}
                    onClick={() => setMethod(m.id)}
                  >
                    {/* LEFT ICON */}
                    <div className="payment-icon">
                      <span className="material-symbols-outlined">
                        {m.id === "vnpay" && "account_balance_wallet"}
                        {m.id === "momo" && "account_balance"}
                        {m.id === "qr" && "qr_code"}
                        {m.id === "cash" && "payments"}
                      </span>
                    </div>

                    {/* TEXT */}
                    <div className="flex-grow-1">
                      <div className="payment-text">{m.title}</div>
                      <div className="text-muted small">{m.desc}</div>
                    </div>

                    {/* RADIO CUSTOM */}
                    <div className={`radio-custom ${method === m.id ? "checked" : ""}`} />
                  </div>
                </div>
              ))}
            </div>

            {/* Security */}
            <div className="secure-box-pro mt-3">
              <span className="material-symbols-outlined">verified_user</span>
              Thông tin thanh toán được mã hóa và bảo mật
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-md-4">
          <div className="summary-pro p-4 text-white">

            <h5 className="fw-bold mb-3">Tóm tắt đơn</h5>

            {/* Doctor */}
            <div className="d-flex align-items-center gap-2 mb-3">
              <img src={doctor.image || "https://i.pravatar.cc/50"} className="summary-avatar" />
              <div>
                <div className="small text-uppercase opacity-75">Bác sĩ</div>
                <div className="fw-semibold">{doctor.name || ""}</div>
                <small>{doctor.specialty || ""}</small>
              </div>
            </div>

            <hr className="opacity-25" />

            {/* Info */}
            <div className="summary-row-pro">
              <div className="summary-left">
                <div className="summary-icon">
                  <span className="material-symbols-outlined">date_range</span>
                </div>
                <span>Ngày</span>
              </div>
              <strong>{formatDate(bookingData.date) || ""}</strong>
            </div>

            <div className="summary-row-pro">
              <div className="summary-left">
                <div className="summary-icon">
                  <span className="material-symbols-outlined">access_time</span>
                </div>
                <span>Giờ</span>
              </div>
              <strong>{bookingData.time || "10:30"}</strong>
            </div>

            <div className="summary-row-pro">
              <div className="summary-left">
                <div className="summary-icon">
                  <span className="material-symbols-outlined">person</span>
                </div>
                <span>Bệnh nhân</span>
              </div>
              <strong>{bookingData.patient.name || "Nguyễn Văn A"}</strong>
            </div>

            <hr className="opacity-25" />

            {/* Price */}
            <div className="summary-total">
              <span>Phí khám</span>
              <span>{doctor.price ? doctor.price.toLocaleString() : "0" }đ</span>
            </div>
          </div>
        </div>
      </div>

      {/* ACTION */}
      <div className="d-flex justify-content-between align-items-center mt-3 action-bar">
        <button className="btn btn-back" onClick={prevStep}>
            <span className="material-symbols-outlined me-1">arrow_back</span>
                Quay lại
        </button>

        <button className="btn btn-pay" onClick={handlePayment}>
          Thanh toán ngay 
           <span className="material-symbols-outlined ms-1">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}