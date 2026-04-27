import { useState, useEffect } from "react";
import { useBooking } from "../../../context/BookingContext";
import { getDoctorSchedulesAPI } from "../../../services/DoctorService";

export default function Step2_SelectDate() {
  const { nextStep, prevStep, setBookingData, bookingData } = useBooking();

  const [selectedDate, setSelectedDate] = useState(bookingData.date || "");
  const [selectedTime, setSelectedTime] = useState(bookingData.time || "");
  const [schedule, setSchedule] = useState([]);
  const doctor = bookingData.doctor || {};

  const handleContinue = () => {
    const newData = {
      ...bookingData,
      date: selectedDate,
      time: selectedTime,
    };

    setBookingData(newData);

    setTimeout(() => {
      nextStep();
    }, 0);
  };

  const getCurrentMonthRange = () => {
    const now = new Date();

    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const format = (d) => d.toISOString().split("T")[0];

    return {
      from: format(firstDay),
      to: format(lastDay),
    };
  };

  const formatTimeRange = (start, end) => {
    return `${start}-${end}`;
  };

  useEffect(() => {
    const fetchSchedules = async () => {
      if (doctor.id) {
        try {
          const { from, to } = getCurrentMonthRange();

          const data = await getDoctorSchedulesAPI(
            doctor.id,
            from,
            to
          );
          setSchedule(data);
        } catch (err) {
          console.error("❌ Error fetching schedules:", err);
        }
      }
    };

    fetchSchedules();
  }, [doctor.id]);

  const selectedDay = schedule.find(
    (d) => d.day === selectedDate?.split("-")[2]
  );

  const slots = selectedDay?.slots || [];

  const formattedSlots = slots.map((s) => ({
    ...s,
    timeRange: formatTimeRange(s.time, s.end_time),
  }));

  const getHour = (time) => Number(time.split(":")[0]);

  const morningSlots = formattedSlots.filter(
    (s) => getHour(s.time) < 12
  );

  const afternoonSlots = formattedSlots.filter(
    (s) => getHour(s.time) >= 12
  );

  const getNext7Days = () => {
    const today = new Date();

    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(today.getDate() + i);

      return {
        fullDate: d.toISOString().split("T")[0], // YYYY-MM-DD
        day: String(d.getDate()).padStart(2, "0"),
        weekday: d.toLocaleDateString("vi-VN", { weekday: "short" }),
      };
    });
  };

  const weekDays = getNext7Days();
  const getCurrentMonthYear = () => {
    const now = new Date();
    const month = now.getMonth() + 1; // 0-11 → +1
    const year = now.getFullYear();

    return `Tháng ${month} ${year}`;
  };

  return (
    <div className="container py-4">
      <div className="row">
        {/* LEFT - Doctor Info */}
        <div className="col-md-5">
          <div className="doctor-summary-card ">
            {/* Top doctor */}
            <div className="d-flex align-items-center gap-3 mb-3">
              <img
                src={doctor.image || "https://i.pravatar.cc/80"}
                alt={doctor.name || "Doctor"}
                className="doctor-avatar"
              />

              <div>
                <div className="doctor-specialty-text">{doctor.specialty || "Chuyên khoa"}</div>
                <div className="doctor-name">{doctor.name || "BS. Nguyễn Văn A"}</div>
                <div className="doctor-title">{doctor.title || "Bác sĩ chuyên khoa"}</div>
              </div>
            </div>

            {/* Date */}
            <div className="info-row">
              <div className="info-icon">
                <span className="material-symbols-outlined">room</span>
              </div>

              <div className="info-content">
                <span>Phòng khám</span>
                <strong>19 Nguyễn Hữu Thọ, Tân Phong, Q7, TP. HCM</strong>
              </div>
            </div>

            {/* Time */}
            <div className="info-row">
              <div className="info-icon">
                <span className="material-symbols-outlined">schedule</span>
              </div>

              <div className="info-content">
                <span>Giờ khám</span>
                <strong>15 - 20 phút khám</strong>
              </div>
            </div>

            <div className="info-row">
              <div className="info-icon">
                <span className="material-symbols-outlined">payments</span>
              </div>

              <div className="info-content">
                <span>Giá khám</span>
                <strong>{Number(doctor.price).toLocaleString()} VNĐ</strong>
              </div>
            </div>

          </div>

          <div className="card p-3 info-box">
            <h6>Hướng dẫn</h6>
            <p className="small">
              Vui lòng chọn ngày trước, sau đó chọn giờ khám phù hợp.
              Buổi sáng phù hợp xét nghiệm.
            </p>
          </div>
        </div>
        {/* RIGHT - Calendar */}
        <div className="col-md-7">
          <div className="card schedule-card">
            <div className="schedule-header">
              <div className="schedule-header-pro">
                <div className="d-flex align-items-center gap-3">

                  {/* Icon */}
                  <div className="header-icon">
                    <span className="material-symbols-outlined">calendar_month</span>
                  </div>

                  {/* Text */}
                  <div>
                    <h5 className="mb-1 fw-bold">Lịch khám bệnh</h5>
                    <p className="mb-0 text-light-subtle">
                      Chọn ngày và khung giờ phù hợp với bạn
                    </p>
                  </div>

                </div>
              </div>
            </div>

            <div className="p-4">
              <h6 className="fw-bold mb-3">{getCurrentMonthYear()}</h6>

              {/* Dates + Day */}
              <div className="d-flex mb-4 days-picker">
                {weekDays.map((d) => {
                  const hasSchedule = schedule.find(s => s.day === d.day);

                  return (
                    <div
                      key={d.fullDate}
                      className={`date-item-wrapper 
                        ${selectedDate === d.fullDate ? "active" : ""} 
                        ${!hasSchedule ? "disabled" : ""}
                      `}
                      onClick={() => {
                        if (hasSchedule) setSelectedDate(d.fullDate);
                      }}
                    >
                      <div className="date-day">{d.weekday}</div>
                      <div className="date-item">{d.day}</div>
                    </div>
                  );
                })}
              </div>

              {/* Morning */}
              {morningSlots.length !== 0 && (
                <>
                  <h6 className="text-datetime">
                    <span className="material-symbols-outlined me-1">wb_sunny</span>
                    BUỔI SÁNG
                  </h6>

                  <div className="d-flex gap-2 mb-3">
                    {morningSlots.map((t) => (
                      <button
                        key={t.schedule_id}
                        disabled={!t.available}
                        className={`time-btn ${selectedTime === t.timeRange ? "active" : ""
                          } ${!t.available ? "disabled" : ""}`}
                        onClick={() => setSelectedTime(t.timeRange)}
                      >
                        {t.timeRange}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* Afternoon */}

              {afternoonSlots.length !== 0 && (
                <>
                  <h6 className="text-datetime">
                    <span className="material-symbols-outlined me-1">brightness_2</span>
                    BUỔI CHIỀU
                  </h6>
                  <div className="d-flex gap-2">
                    {afternoonSlots.map((t) => (
                      <button
                        key={t.schedule_id}
                        disabled={!t.available}
                        className={`time-btn ${selectedTime === t.timeRange ? "active" : ""
                          } ${!t.available ? "disabled" : ""}`}
                        onClick={() => setSelectedTime(t.timeRange)}
                      >
                        {t.timeRange}
                      </button>
                    ))}
                  </div>
                </>
              )}


            </div>
          </div>
        </div>


      </div>

      {/* Actions */}
      <div className="d-flex justify-content-between align-items-center mt-2 action-bar">
        <button className="btn btn-back" onClick={prevStep}>
          <span className="material-symbols-outlined me-1">arrow_back</span>
          Quay lại
        </button>

        <button className="btn btn-next" onClick={handleContinue}>
          Xác nhận và tiếp tục
          <span className="material-symbols-outlined ms-1">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}