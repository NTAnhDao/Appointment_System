import StatusBadge from "./StatusBadge";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AppointmentCard({ data }) {
  const [remaining, setRemaining] = useState("");
  const [isExpired, setIsExpired] = useState(false);
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

  const displayStatus =
    data.status === "pending" && isExpired
      ? "cancelled"
      : data.status;

    //  map payment hiển thị
    const setPayment = (() => {
      if (data.payment_status === "SUCCESS") {
        displayStatus = "success";
      }

      if (data.payment_method === "cash") {
        displayStatus = "cash"; 
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
          : displayStatus === "confirmed"
          ? "card-confirmed"
          : ""
      }`}
    >
      {/* LEFT */}
      <div className="d-flex align-items-center gap-3">

        <div className="date-circle-pro">
          {data.date.split("/")[0]}
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
            <div className="action-link">
              Xem hóa đơn →
            </div>
          )}

          {/* PENDING */}
          {displayStatus === "pending" && (
            <>
              <div className="expire-box">
                <span className="material-symbols-outlined">timer</span>
                <span>Hết hạn sau</span>
                <span className="time">{remaining}</span>
              </div>

              <button className="btn-pay">
                Thanh toán ngay
              </button>
            </>
          )}

          {/* DONE */}
          {displayStatus === "confirmed" && (
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