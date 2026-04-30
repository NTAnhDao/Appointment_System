import api from "./axiosClient";

export const createInvoiceAPI = async (appointmentData) => {
  const res = await api.post(`/invoices`, appointmentData);
  return res.data;
};

// Đánh dấu hóa đơn đã thanh toán (Gọi ở trang Payment Success)
export const updateStatusInvoiceAPI = async (invoiceId, status) => {
  const res = await api.post(`/invoices/${invoiceId}/status`, { status });
  return res.data;
};

// Hủy hóa đơn (Gọi khi người dùng bấm Hủy lịch/Hóa đơn)
export const cancelInvoiceAPI = async (invoiceId) => {
  const res = await api.post(`/invoices/${invoiceId}/status`, { status: "CANCELLED" });
  return res.data;
};

export const getInvoiceDetailAPI = async (invoiceId) => {
  const res = await api.get(`/invoices/${invoiceId}`);
    return res.data;
};
