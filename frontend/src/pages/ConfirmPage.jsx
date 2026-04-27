import { useSearchParams, useNavigate } from "react-router-dom";

export default function ConfirmPage() {
  const [params] = useSearchParams();
  const nav = useNavigate();

  const orderId = params.get("orderId");
  const amount = params.get("amount");

  const backendIP = window.location.hostname;

  const handleConfirm = async () => {
    try {
      const res = await fetch(`http://${backendIP}:5000/api/payments/qrcode/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ orderId })
      });

      const data = await res.json();
      console.log("CONFIRM:", data);

      if (data.success) {
        // 👉 chuyển sang success trên ĐIỆN THOẠI
        nav(`/success?method=qr&orderId=${orderId}&amount=${amount}&status=success`);
      }
    } catch (err) {
      console.error(err);
      alert("Thanh toán thất bại");
    }
  };

  return (
  <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
    
    <div style={{ width: "100%", maxWidth: "400px" }}>
      
      <div className="card p-4 shadow-sm">
        <h4 className="text-center mb-3">Thông tin thanh toán</h4>

        <div className="payment-row d-flex justify-content-between mb-2">
          <span className="payment-label">Mã đơn:</span>
          <span className="payment-value fw-semibold">{orderId}</span>
        </div>

        <div className="payment-row d-flex justify-content-between mb-3">
          <span className="payment-label">Số tiền:</span>
          <span className="payment-value fw-bold text-primary">
            {Number(amount).toLocaleString()} VNĐ
          </span>
        </div>

        <div className="text-center mt-3">
          <button className="btn btn-pay px-4 py-2 w-100"
          onClick={handleConfirm}>
            Xác nhận thanh toán
          </button>
        </div>
      </div>

    </div>

  </div>
);
}