import api from "./axiosClient";


// Đánh dấu hóa đơn đã thanh toán (Gọi ở trang Payment Success)
export const updateStatusInvoiceAPI = async (invoiceId, status) => {
  const res = await api.post(`/invoices/${invoiceId}/status`, { status });
  return res.data;
};

export const downloadPDFAPI = async (id) => {
  const res = await api.get(`/invoices/${id}/pdf`, {
    responseType: "blob", // 🔥 bắt buộc
  });

  const blob = new Blob([res.data], { type: "application/pdf" });

  const url = window.URL.createObjectURL(res.data);

  const a = document.createElement("a");
  a.href = url;
  a.download = `invoice-${id}.pdf`;
  a.click();
  a.remove();

  window.URL.revokeObjectURL(url);
};

export const getInvoiceDetailAPI = async (invoiceId) => {
  const res = await api.get(`/invoices/${invoiceId}`);
  return res.data;
};
