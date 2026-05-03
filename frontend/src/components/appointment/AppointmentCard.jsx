import StatusBadge from "./StatusBadge";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AppointmentCard({ data }) {
  const [remaining, setRemaining] = useState("");
  const [isExpired, setIsExpired] = useState(false);
  const [isPayment, setIsPayment] = useState();
  const navigate = useNavigate();

  const parseExpired = (str) => {
    if (!str) return null;

    const [time, date] = str.split(" ");
    const [hour, minute] = time.split(":");
    const [day, month] = date.split("-");

    const year = new Date().getFullYear();
    return new Date(year, month - 1, day, hour, minute);
  };

  useEffect(() => {
    if (!data.expired_at) return;

    const expiredTime = parseExpired(data.expired_at);

    const interval = setInterval(() => {
      const diff = expiredTime - new Date();

      if (diff <= 0) {
        setRemaining("00:00");
        setIsExpired(true);
        clearInterval(interval);
        return;
      }

      const m = Math.floor(diff / 60000);
      const s = Math.floor((diff % 60000) / 1000);

      setRemaining(
        `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [data.expired_at]);

  let displayStatus =
    data.status === "pending" && isExpired
      ? "cancelled"
      : data.status;

    //  map payment hiển thị
    const setPayment = (() => {
      if (data.invoice_status === "UNPAID" && data.status === "confirmed") {
        displayStatus = "cash";
      }else if (data.invoice_status === "PAID") {
        displayStatus = "paid";
      }
    })();

  return (
    <div
      className={`appointment-card-pro d-flex justify-content-between align-items-center 
      ${
        displayStatus === "cancelled"
          ? "card-disabled"
          : displayStatus === "pending"
          ? "card-pending"
          : displayStatus === "paid"
          ? "card-confirmed"
          : displayStatus === "cash"
          ? "card-cash"
          : ""
      }`}
    >
      {/* LEFT */}
      <div className="d-flex align-items-center gap-3">

        <div className="date-circle-pro">
          {data.queue_number  ? `#${data.queue_number}` : "?"}
        </div>

        <div>
          <div className="d-flex align-items-center gap-2">
            <span className="doctor-name">{data.doctor}</span>
          </div>

          <div className="text-muted small">Khoa {data.specialty}</div>

          <div className="meta-row mt-1">
            <span className="material-symbols-outlined">calendar_month</span>
            {data.date}

            <span className="material-symbols-outlined">schedule</span>
            {data.time}

          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="text-end right-box">

        <StatusBadge status={displayStatus} />

        <div className="mt-2">

          {/* PAID */}
          {displayStatus === "paid" && (
            <div className="action-link" onClick={() => navigate(`/invoice/${data.invoice_id}`)}>
              Xem hóa đơn →
            </div>
          )}

          {/* PENDING */}
          {displayStatus === "pending" && (
            <div>
              <div className="expire-box">
                <span className="material-symbols-outlined">timer</span>
                <span>Hết hạn sau</span>
                <span className="time">{remaining}</span>
              </div>

              <button
                className="btn-pay"
                onClick={() => {
                  const payload = {
                    ...data,
                    isPayment: true
                  };

                  sessionStorage.setItem(
                    `appointment_${data.id}`,
                    JSON.stringify(payload)
                  );

                  navigate(`/appointments/${data.id}`, {
                    state: payload
                  });
                }}
              >
                Thanh toán ngay
              </button>
            </div>
          )}

          {/* CASH */}
          {displayStatus === "cash" && (
            <div
              className="action-link text-secondary"
              onClick={() => {
                sessionStorage.setItem(
                  `appointment_${data.id}`,
                  JSON.stringify(data)
                );

                navigate(`/appointments/${data.id}`, {
                  state: data,
                });
              }}
            >
              Chi tiết lịch hẹn →
            </div>
          )}
        </div>
      </div>
    </div>
  );
}