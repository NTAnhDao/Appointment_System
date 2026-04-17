import AppointmentCard from "./AppointmentCard";
import "./appointment.css";    

export default function AppointmentList() {
  const data = [
    {
      id: 1,
      doctor: "BS. Nguyễn Văn An",
      specialty: "Khoa Tim mạch",
      date: "24/10/2023",
      time: "08:30 - 09:00",
      stt: "12",
      status: "paid",
    },
    {
      id: 2,
      doctor: "ThS.BS. Lê Thị Mai",
      specialty: "Khoa Nội tổng quát",
      date: "26/10/2023",
      time: "14:15 - 14:45",
      stt: "05",
      status: "pending",
    },
    {
      id: 3,
      doctor: "BS. Trần Hoàng Nam",
      specialty: "Khoa Tai Mũi Họng",
      date: "15/10/2023",
      time: "09:00 - 09:30",
      stt: "22",
      status: "done",
    },
  ];

  return (
    <div className="container py-4">
      <h4 className="fw-bold">Danh sách Đặt lịch</h4>
      <p className="text-muted">
        Quản lý các cuộc hẹn khám bệnh của bạn
      </p>

      {data.map((item) => (
        <AppointmentCard key={item.id} data={item} />
      ))}
    </div>
  );
}