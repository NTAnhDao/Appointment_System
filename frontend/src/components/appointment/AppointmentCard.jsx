import StatusBadge from "./StatusBadge";

export default function AppointmentCard({ data }) {
  return (
    <div className="appointment-card-pro d-flex justify-content-between align-items-center">

      {/* LEFT */}
      <div className="d-flex align-items-center gap-3">

        {/* Date circle */}
        <div className="date-circle-pro">
          {data.date.split("/")[0]}
        </div>

        {/* Info */}
        <div>
          <div className="d-flex align-items-center gap-2">
            <span className="doctor-name">{data.doctor}</span>

            {data.status === "paid" && (
              <span className="badge badge-upcoming">Sắp tới</span>
            )}
          </div>

          <div className="text-muted small">{data.specialty}</div>

          {/* Meta */}
          <div className="meta-row mt-1">

            <span className="material-symbols-outlined">calendar_month</span>
            {data.date}

            <span className="material-symbols-outlined">schedule</span>
            {data.time}

            <span className="material-symbols-outlined">confirmation_number</span>
            STT: {data.stt}

          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="text-end right-box">

        <StatusBadge status={data.status} />

        <div className="mt-2">

          {data.status === "paid" && (
            <div className="action-link">
              Xem hóa đơn →
            </div>
          )}

          {data.status === "pending" && (
            <>
              <div className="text-warning small mb-1">
                ⏳ Hết hạn sau: 14:59
              </div>

              <button className="btn btn-primary btn-sm">
                Thanh toán ngay
              </button>
            </>
          )}

          {data.status === "done" && (
            <div className="action-link text-secondary">
              Xem hồ sơ bệnh án →
            </div>
          )}
        </div>
      </div>
    </div>
  );
}