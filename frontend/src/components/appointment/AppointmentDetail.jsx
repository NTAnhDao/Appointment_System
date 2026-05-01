import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./appointmentDetail.css";

export default function AppointmentDetail() {
  const { state } = useLocation();
  const { id } = useParams();
  const [method, setMethod] = useState("vnpay");
  const [isPayment, setIsPayment] = useState();

  const navigate = useNavigate();

  const [data, setData] = useState(() => {
    if (state) return state;

    const cached = sessionStorage.getItem(`appointment_${id}`);
    return cached ? JSON.parse(cached) : null;
  });
    const methods = [
    { id: "vnpay", title: "Ví VNPay", desc: "Thanh toán qua VNPay" },
    { id: "momo", title: "Ví MoMo", desc: "Thanh toán qua MoMo" },
    { id: "qr", title: "QR Code", desc: "Quét mã ngân hàng" },
    { id: "cash", title: "Thanh toán tại viện", desc: "Trả tiền khi đến khám" },
  ];
  useEffect(() => {
    if (state) {
        setData(state);

        // cache lại luôn
        sessionStorage.setItem(
        `appointment_${state.appointment_id}`,
        JSON.stringify(state)
        );

        setLoading(false);
        return;
    }

    // fallback cache
    const cached = sessionStorage.getItem(`appointment_${id}`);
    if (cached) {
        setData(JSON.parse(cached));
    }

    setLoading(false);
    }, [state, id]);

  const [loading, setLoading] = useState(!state);

  if (loading) return <p className="p-4">Đang tải...</p>;
  if (!data) return <p className="p-4">Không có dữ liệu</p>;

  const formatDateVN = (dateStr) => {
    if (!dateStr) return "";

    const [day, month, year] = dateStr.split("/");
    const date = new Date(year, month - 1, day);

    const days = [
        "Chủ nhật",
        "Thứ 2",
        "Thứ 3",
        "Thứ 4",
        "Thứ 5",
        "Thứ 6",
        "Thứ 7",
    ];

    const weekday = days[date.getDay()];

    return `${weekday}, ${day} tháng ${month}, ${year}`;
    };
  // payment text
  const paymentText =
    data.payment_method === "cash"
      ? "Chờ thanh toán tại quầy"
      : data.payment_status === "success"
      ? "Đã thanh toán"
      : "Chưa thanh toán";

  return (
    <div className="container py-4 appointment-detail">
      
      {/* HEADER */}
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <div>
            <div className="back-link" onClick={() => navigate(-1)}>
            ← Quay lại danh sách
            </div>

            <h3 className="title-detail">
              {isPayment ? "Xác nhận & Thanh toán lịch hẹn" : "Chi tiết lịch hẹn"}
            </h3>

            <div className="text-muted">
            Mã đặt chỗ: <span className="code">UMC-{data.id}</span>
            </div>
        </div>

        {/* badge bên phải */}
        <div className="badge-hospital">
            ● {paymentText}
        </div>
      </div>

      <div className="row g-3"> 
        {/* LEFT */}
        <div className="col-md-8">
          {/* PATIENT INFO */}
          <div className="card info-card mb-3 patient-card">
            <div className="section-title">
              <span className="material-symbols-outlined">person</span>
              Thông tin bệnh nhân
            </div>

            <div className="patient-grid">
              <div className="field-detail">
                <span className="label">Họ và tên</span>
                <span className="value"> {data.patientName}</span>
              </div>

              <div className="field-detail">
                <span className="label">Giới tính</span>
                <span className="value"> {data.gender}</span>
              </div>

              <div className="field-detail">
                <span className="label">Ngày sinh</span>
                <span className="value"> {data.birthday}</span>
              </div>

              <div className="field-detail">
                <span className="label">Mã định danh/CCCD</span>
                <span className="value"> {data.identityNumber}</span>
              </div>
            </div>
          </div>
          {/* DOCTOR & LOCATION */}
          <div className="card info-card">
            <div className="row">
              
              {/* DOCTOR */}
              <div className="col-md-6 d-flex gap-3">
                <img
                  src={data.doctor_image || "https://i.pravatar.cc/60"}
                  className="doctor-avatar"
                  alt=""
                />

                <div>
                  <div className="label">BÁC SĨ PHỤ TRÁCH</div>
                  <div className="fw-bold">{data.doctor}</div>
                  <div className="text-muted small">
                    {data.specialty}
                  </div>
                </div>
              </div>

              {/* LOCATION */}
              <div className="col-md-6">
                <div className="label">ĐỊA ĐIỂM & CHUYÊN KHOA</div>
                <div className="fw-bold">
                    {data.specialty}
                </div>
                <div className="text-muted small">
                19 Nguyễn Hữu Thọ, Tân Phong, Q7, TP. HCM
             </div>
              </div>
            </div>

            <div className="row">
              {/* TIME */}
              <div className="mt-3 col-md-6">
                <div className="label">THỜI GIAN KHÁM</div>
                <div className="date-time-box">
                  <span className="material-symbols-outlined icon-detail">
                      calendar_month
                  </span>
                  <span>{formatDateVN(data.date)}</span>
                  </div>

                  <div className="date-time-box">
                  <span className="material-symbols-outlined icon-detail">
                      access_time
                  </span>
                  <span>{data.time}</span>
                  </div>
              </div>

              {!isPayment && (
              <div className="mt-3 fee-box ">
                  <div className="label">SỐ TIỀN CẦN THANH TOÁN</div>
                  <div className="fee-amount">
                      {Number(data.fee || 0).toLocaleString("vi-VN")} vnđ
                  </div>
              </div>
              )}
          </div>
        </div>

          {/* PAYMENT METHODS */}
        {isPayment && (
          <div className="card info-card mt-3 payment-card">
            <h4 className="payment-title mb-1">Phương thức thanh toán</h4>
            <p className="text-muted mb-2">
              Chọn cách thanh toán phù hợp cho lịch khám
            </p>

            <div className="row">
              {methods.map((m) => (
                <div key={m.id} className="col-md-6 mb-2">
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
            <div className="secure-box-pro mt-2">
              <span className="material-symbols-outlined">verified_user</span>
              Thông tin thanh toán được mã hóa và bảo mật
            </div>
          </div>
        )}
        {/* PAYMENT GUIDE */}
        {!isPayment && (
          <div className="card p-3 mt-3 payment-guide">
            <div className="d-flex gap-3">
              <span className="material-symbols-outlined payment-icon">payment</span>
              <div>
                <div className="title-guide">Hướng dẫn thanh toán</div>
                <div className="text-muted small pt-1">
                  Vui lòng đến quầy thu ngân để hoàn tất thanh toán và nhận số
                  thứ tự khám.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>


      {/* RIGHT */}
      <div className="col-md-4">
        {!isPayment && (
          <>
            <div className="qr-card">
    
              <div className="qr-title">
                  Mã Check-in tại quầy
              </div>

              {/* QR */}
              <div className="qr-wrapper">
                  <div className="qr-inner">
                  <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${data.appointment_id}`}
                      alt="qr"
                  />
                  </div>
              </div>

              <div className="qr-note">
                  Vui lòng xuất trình mã này tại quầy tiếp đón để làm thủ tục nhanh chóng
              </div>
            </div>
              {/* BUTTONS */}
              <button className="btn-primary-custom">
              <span className="material-symbols-outlined btn-icon">
                  download
              </span>
              Tải phiếu xác nhận
              </button>

              <button className="btn-secondary-custom">
              <span className="material-symbols-outlined btn-icon">
                  share
              </span>
              Chia sẻ lịch hẹn
              </button>
          </>
        )}

        {isPayment && (
          <>
            <div className="payment-summary-card">
            <div className="summary-title">Tóm tắt chi phí</div>

            <div className="summary-row">
              <span>Giá khám</span>
              <span>{Number(data.fee || 0).toLocaleString("vi-VN")}đ</span>
            </div>

            <div className="summary-row">
              <span>Phí dịch vụ</span>
              <span>0.000đ</span>
            </div>

            <div className="divider"></div>

            <div className="summary-total">
              <span>Tổng cộng</span>
              <span className="total-amount">
                {(Number(data.fee || 0)).toLocaleString("vi-VN")}đ
              </span>
            </div>

            <div className="vat-note">* Đã bao gồm thuế GTGT</div>
          </div>

          <button className="btn-pay">
            <span className="material-symbols-outlined">shield</span>
            Thanh toán ngay
          </button>

          <div className="payment-warning">
            <span className="material-symbols-outlined">error</span>
            Lưu ý: Lịch hẹn chỉ được xác nhận chính thức sau khi thanh toán thành công.
          </div>
          </>

        )}
      </div>
      </div>
    </div>
  );
}