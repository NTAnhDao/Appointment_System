import api from "./axiosClient";

export const getInvoiceDetailAPI = async (invoiceId) => {
  const res = await api.get(`/invoices/${invoiceId}`);
    return res.data;
};
