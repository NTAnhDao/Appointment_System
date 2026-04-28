import { useEffect, useState } from "react";
import AppointmentCard from "./AppointmentCard";
import { getMyAppointmentsAPI } from "../../services/BookingService";
import "./appointment.css";

export default function AppointmentList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMyAppointmentsAPI();
        console.log("RAW:", res);

        setData(res);
      } catch (err) {
        console.error("❌ Fetch appointments error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const getFilteredData = () => {
    if (filter === "all") return data;

    return data.filter((item) => {
      if (filter === "cancelled") {
        return item.status === "cancelled";
      }

      return item.status === filter;
    });
  };
  const filteredData = getFilteredData();

  return (
    <div className="container py-4">
      <h4 className="title-list">Danh sách Đặt lịch</h4>
      <p className="text-muted">
        Quản lý các cuộc hẹn khám bệnh của bạn
      </p>
      <div className="filter-tabs mb-3">
        {[
          { key: "all", label: "Tất cả" },
          { key: "pending", label: "Chờ thanh toán" },
          { key: "confirmed", label: "Đã xác nhận" },
          { key: "cancelled", label: "Đã huỷ" },
        ].map((f) => (
          <button
            key={f.key}
            className={`filter-btn ${filter === f.key ? "active" : ""}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Đang tải...</p>
      ) : filteredData.length > 0 ? (
        filteredData.map((item) => (
          <AppointmentCard
            key={item.id}
            data={item}
          />
        ))
      ) : (
        <p className="text-muted">Không có lịch hẹn</p>
      )}
    </div>
  );
}