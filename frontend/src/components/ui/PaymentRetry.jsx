import React from "react";
import "./PaymentRetry.css";

const PaymentRetry = ({ onRetry, onHome }) => {
  return (
    <div className="payment-retry-container">
      <button className="btn-retry" onClick={onRetry}>
        Thanh toán lại
      </button>

      <span className="link-home" onClick={onHome}>
        Quay về trang chủ
      </span>
    </div>
  );
};

export default PaymentRetry;