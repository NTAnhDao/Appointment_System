import { useState } from "react";
import { useBooking } from "../../../context/BookingContext";

export default function Step2_SelectDate() {
  const { nextStep, prevStep, setBookingData } = useBooking();

  const [selectedDate, setSelectedDate] = useState(14);
  const [selectedTime, setSelectedTime] = useState("09:15");

  const dates = [12, 13, 14, 15, 16, 17, 18];
  const morning = ["08:30", "09:15", "10:00"];
  const afternoon = ["14:30", "15:15", "16:00"];

  const handleContinue = () => {
    setBookingData((prev) => ({
      ...prev,
      date: selectedDate,
      time: selectedTime,
    }));

    nextStep();
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
                src="https://i.pravatar.cc/80"
                alt="doctor"
                className="doctor-avatar"
              />

              <div>
                <div className="doctor-specialty-text">TIM MẠCH</div>
                <div className="doctor-name">BS. Nguyễn Văn A</div>
                <div className="doctor-title">Bác sĩ chuyên khoa</div>
              </div>
            </div>

            {/* Date */}
            <div className="info-row">
              <div className="info-icon">
                <span className="material-symbols-outlined">room</span>
              </div>

              <div className="info-content">
                <span>Phòng khám</span>
                <strong>Phòng 402, Khu A</strong>
              </div>
            </div>

            {/* Time */}
            <div className="info-row">
              <div className="info-icon">
                <span className="material-symbols-outlined">schedule</span>
              </div>

              <div className="info-content">
                <span>Giờ khám</span>
                <strong>45 - 60 phút khám</strong>
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
                <h6 className="fw-bold mb-3">Tháng 8 2024</h6>

                {/* Dates + Day */}
                <div className="d-flex mb-4 days-picker">
                    {dates.map((d, index) => {
                    const days = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

                    return (
                        <div
                        key={d}
                        className={`date-item-wrapper ${
                            selectedDate === d ? "active" : ""
                        }`}
                        onClick={() => setSelectedDate(d)}
                        >
                        <div className="date-day">{days[index % 7]}</div>
                        <div className="date-item">{d}</div>
                        </div>
                    );
                    })}
                </div>

                {/* Morning */}
                <h6 className="text-datetime">
                    <span className="material-symbols-outlined me-1">wb_sunny</span>
                    BUỔI SÁNG
                </h6>

                <div className="d-flex gap-2 mb-3">
                    {morning.map((t) => (
                    <button
                        key={t}
                        className={`time-btn ${
                        selectedTime === t ? "active" : ""
                        }`}
                        onClick={() => setSelectedTime(t)}
                    >
                        {t}
                    </button>
                    ))}
                </div>

                {/* Afternoon */}
                <h6 className="text-datetime">
                    <span className="material-symbols-outlined me-1">brightness_2</span>
                    BUỔI CHIỀU
                </h6>

                <div className="d-flex gap-2">
                    {afternoon.map((t) => (
                    <button
                        key={t}
                        className={`time-btn ${
                        selectedTime === t ? "active" : ""
                        }`}
                        onClick={() => setSelectedTime(t)}
                    >
                        {t}
                    </button>
                    ))}
                </div>
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