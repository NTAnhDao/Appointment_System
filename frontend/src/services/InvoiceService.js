import api from "./axiosClient";


// Đánh dấu hóa đơn đã thanh toán (Gọi ở trang Payment Success)
export const updateStatusInvoiceAPI = async (invoiceId, status) => {
  const res = await api.post(`/invoices/${invoiceId}/status`, { status });
  return res.data;
};

export const getInvoiceDetailAPI = async (invoiceId) => {
  const res = await api.get(`/invoices/${invoiceId}`);
    return res.data;
};
