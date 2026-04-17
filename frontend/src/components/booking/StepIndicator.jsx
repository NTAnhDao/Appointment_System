import './StepIndicator.css'
import { useBooking } from "../../context/BookingContext";
const steps = [
  "Chọn bác sĩ",
  "Chọn lịch khám",
  "Hồ sơ bệnh nhân",
  "Xem lại",
  "Thanh toán"
];  
export default function StepIndicator() {
  const { step, setStep } = useBooking();

  return (
    <div className="stepper-pro">
      {steps.map((label, index) => {
        const current = index + 1;
        const isDone = current < step;
        const isActive = current === step;

        return (
          <div
            key={index}
            className="step-item"
            onClick={() => current < step && setStep(current)} // click back
          >
            {/* Circle */}
            <div
              className={`step-circle 
                ${isDone ? "done" : ""} 
                ${isActive ? "active" : ""}`}
            >
              {isDone ? "✓" : current}
            </div>

            {/* Label */}
            <div className={`step-label ${isActive ? "active" : ""}`}>
              {label}
            </div>

            {/* Line */}
            {index < steps.length - 1 && (
              <div className="step-line-wrapper">
                <div
                  className={`step-line-bg`}
                ></div>
                <div
                  className="step-line-fill"
                  style={{
                    width: isDone ? "100%" : "0%",
                  }}
                ></div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}