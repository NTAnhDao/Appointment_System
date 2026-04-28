import { useEffect, useState } from "react";
import AppointmentCard from "./AppointmentCard";
import { getMyAppointmentsAPI } from "../../services/BookingService";
import "./appointment.css";

export default function AppointmentList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("vi-VN");
  };

  const formatTime = (start, end) => {
    if (!start || !end) return "";
    const s = new Date(start).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
    const e = new Date(end).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
    return `${s} - ${e}`;
  };

  const mapStatus = (status) => {
    switch (status) {
      case "PENDING":
        return "pending";
      case "CONFIRMED":
        return "paid";
      case "DONE":
        return "done";
      default:
        return "pending";
    }
  };

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

  return (
    <div className="container py-4">
      <h4 className="title-list">Danh sách Đặt lịch</h4>
      <p className="text-muted">
        Quản lý các cuộc hẹn khám bệnh của bạn
      </p>

      {loading ? (
        <p>Đang tải...</p>
      ) : data.length > 0 ? (
        data.map((item, index) => (
  <AppointmentCard key={`${item.id}-${index}`} data={item} />
))
      ) : (
        <p className="text-muted">Không có lịch hẹn</p>
      )}
    </div>
  );
}