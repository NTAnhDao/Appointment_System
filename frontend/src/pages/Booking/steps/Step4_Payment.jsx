import { useState, useEffect } from "react";
import { useBooking } from "../../../context/BookingContext";
import { createAppointmentAPI } from "../../../services/BookingService";
import { QRCodeSVG } from "qrcode.react";
import { useNavigate } from "react-router-dom";

export default function Step4_Payment() {
  const nav = useNavigate()
  const { bookingData, nextStep, prevStep } = useBooking();
  const [method, setMethod] = useState("vnpay");

  const doctor = bookingData.doctor || {};
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [qrValue, setQrValue] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const myIP = "192.168.1.131";
  const frontendPort = "5173";
  const backendPort = "5000";
  const amount = bookingData.totalPrice || 520000;
  const appointmentId = bookingData.appointmentId || 1;
  
  // 2. Logic chạy bộ đếm
  useEffect(() => {
    let timer;
    if (showQR && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Khi hết giờ: Tắt màn hình QR và reset lại thời gian
      alert("Mã QR đã hết hạn!");
      setShowQR(false);
      setTimeLeft(300);
    }

    // Nếu người dùng đóng QR thủ công, reset lại thời gian
    if (!showQR) setTimeLeft(300);

    return () => clearInterval(timer);
  }, [showQR, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };


  const methods = [
    { id: "vnpay", title: "Ví VNPay", desc: "Thanh toán qua VNPay" },
    { id: "momo", title: "Ví MoMo", desc: "Thanh toán qua MoMo" },
    { id: "qr", title: "QR Code", desc: "Quét mã ngân hàng" },
    { id: "cash", title: "Thanh toán tại viện", desc: "Trả tiền khi đến khám" },
  ];

  // ===== LOGIC POLLING (KIỂM TRA TRẠNG THÁI QR) =====
  useEffect(() => {
    let timer;
    // Chỉ polling nếu đang mở mã QR và đã có currentOrderId
    if (showQR && currentOrderId) {
      timer = setInterval(async () => {
        try {
          const res = await fetch(`http://${myIP}:${backendPort}/api/payments/qrcode/check-status/${currentOrderId}`);
          const data = await res.json();
          console.log("LAPTOP POLLING:", data);
          if (data.status === "SUCCESS") {
            clearInterval(timer);
            // Chuyển trang sau 1.5 giây
            setTimeout(() => {
              nav(`/success?method=qr&orderId=${currentOrderId}&amount=${amount}&status=success&isLaptop=true`);
            }, 15000);
          }
        } catch (error) {
          console.error("Lỗi polling:", error);
        }
      }, 2000); // Trả lại 2 giây cho đỡ nghẽn mạng
    }

    return () => clearInterval(timer);
  }, [showQR, currentOrderId, myIP, backendPort, nav]);

  const handlePayment = async () => {
    console.log("PAY:", bookingData, method);

      try {
      // 1. Gọi API tạo appointment
      const res = await createAppointmentAPI({
        schedule_id: bookingData.schedule_id,
        patient_id: bookingData.patientId
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Tạo lịch thất bại");
      }

      console.log("Appointment created:", data);

    } catch (err) {
      console.error(err);
      alert("Lỗi khi tạo lịch khám!");
    }

    if (method === "vnpay") {       // VNPAY
      try {
        const response = await fetch('http://localhost:5000/api/payments/vnpay/create_url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: amount,
            appointment_id: appointmentId,
            payment_method: "VNPAY"
          })
        });

        const data = await response.json();

        if (data.code === '00') {
          window.location.href = data.paymentUrl;   // Chuyển sang VNPAY
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Lỗi:", error);
        alert("Có lỗi khi tạo link thanh toán");
      }

    } else if (method === "momo") {     // MOMO
      try {
        const res = await fetch("http://localhost:5000/api/payments/momo/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: amount,
            appointment_id: appointmentId,
            payment_method: "MOMO"
          }),
        });

        console.log("STATUS:", res.status);

        const data = await res.json();

        console.log("MOMO RESPONSE:", data);

        if (data && data.payUrl) {
          window.location.href = data.payUrl; // Chuyển sang MOMO
        } else {
          alert("Backend không trả payUrl");
        }
      } catch (error) {
        console.error("Lỗi:", error);
        alert("Có lỗi khi tạo link thanh toán");
      }

    } else if (method === "qr") {     // QR_CODE
      try {

        const res = await fetch(`http://localhost:${backendPort}/api/payments/qrcode/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: amount,
            appointment_id: appointmentId,
            payment_method: "QR_CODE" 
          })
        });

        const data = await res.json();

        if (data.success) {
          const newOrderId = data.order_id; 
          setCurrentOrderId(newOrderId);   
          const newQrValue = `http://${myIP}:${frontendPort}/confirm?orderId=${newOrderId}&amount=${amount}`;
          setQrValue(newQrValue); 
          setShowQR(true);
        } else {
          alert("Không thể tạo đơn hàng QR");
        }

      } catch (err) {
        console.error(err);
        alert("Có lỗi kết nối");
      }
    } else if (method === "cash") {
      // ===== LOGIC THANH TOÁN TẠI VIỆN (CASH) =====
      try {
        // Gọi API tạo đơn hàng CASH
        const res = await fetch(`http://localhost:${backendPort}/api/payments/cash/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: amount,
            appointment_id: appointmentId,
            payment_method: "CASH" 
          }),
        });

        console.log("STATUS:", res.status);
        const data = await res.json();
        console.log("CASH RESPONSE:", data);
        if (data.success) {
          nav(`/success?method=cash&orderId=${data.order_id}&amount=${amount}&status=success`);
        } else {
          alert("Không thể tạo đơn hàng thanh toán tại viện: " + (data.message || "Lỗi không xác định"));
        }
      } catch (error) {
        console.error("Lỗi kết nối:", error);
        alert("Có lỗi khi kết nối đến Server");
      }
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
          <div className="paymentmethod-container p-4 mb-4" style={{ minHeight: "400px" }}>

            {showQR ? (
              // ===== GIAO DIỆN KHI BẬT MÃ QR =====
              <div className="text-center py-4 fade-in">
                <h4 className="payment-title mb-2" style={{ color: "var(--primary)" }}>Quét mã để thanh toán</h4>
                <p className="text-muted mb-4">Sử dụng ứng dụng ngân hàng để quét mã QR bên dưới</p>

                <div className="d-inline-block bg-white p-3 rounded-4 shadow-sm mb-4 border">
                  <QRCodeSVG value={qrValue} size={220} />
                </div>

                <div className="mt-3 d-flex align-items-center justify-content-center gap-2 text-danger fw-bold">
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>timer</span>
                  <span>Hiệu lực trong: {formatTime(timeLeft)}</span>
                </div>

                <div className="d-flex justify-content-center align-items-center gap-2 mb-4">
                  <div className="spinner-border spinner-border-sm payment-text" role="status"></div>
                  <span className="payment-text fw-medium">Đang chờ bạn quét mã...</span>
                </div>

                <button
                  className="btn btn-choose-method px-4 py-2"
                  onClick={() => setShowQR(false)}
                >
                  Chọn phương thức khác
                </button>
              </div>
            ) : (
              // ===== GIAO DIỆN CHỌN PHƯƠNG THỨC THANH TOÁN (GIỮ NGUYÊN) =====
              <>
                <h4 className="payment-title mb-1">Phương thức thanh toán</h4>
                <p className="text-muted mb-4">
                  Chọn cách thanh toán phù hợp cho lịch khám
                </p>

                <div className="row">
                  {methods.map((m) => (
                    <div key={m.id} className="col-md-6 mb-3">
                      <div
                        className={`payment-item-pro ${method === m.id ? "active" : ""
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
              </>
            )}

          </div>
        </div>

        {/* RIGHT (GIỮ NGUYÊN) */}
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

        {!showQR && (
          <button className="btn btn-pay" onClick={handlePayment}>
            Thanh toán ngay
            <span className="material-symbols-outlined ms-1">arrow_forward</span>
          </button>
        )}
      </div>
    </div>
  );
}