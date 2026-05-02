import api from "./axiosClient";

// Tạo thanh toán VNPay
export const createVNPayPayment = async (amount, invoiceId) => {
  const res = await api.post("/payments/vnpay/create_url", { amount, invoice_id: invoiceId });
  return res.data;
};

// Tạo thanh toán MoMo
export const createMoMoPayment = async (amount, invoiceId) => {
  const res = await api.post("/payments/momo/create", { amount, invoice_id: invoiceId });
  return res.data;
};

// Tạo thanh toán QR Code
export const createQRPayment = async (amount, invoiceId) => {
  const res = await api.post("/payments/qrcode/create", { amount, invoice_id: invoiceId });
  return res.data;
};

// Kiểm tra trạng thái thanh toán QR
export const checkQRPaymentStatus = async (orderId) => {
  const res = await api.get(`/payments/qrcode/check-status/${orderId}`);
  return res.data;
};