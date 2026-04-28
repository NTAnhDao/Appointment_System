import api from "./axiosClient";

// 🔥 CREATE appointment
export const createAppointmentAPI = async (data) => {
  const res = await api.post("/appointments", data);
  return res.data;
};

// 🔥 CONFIRM appointment
export const confirmAppointmentAPI = async (id) => {
  const res = await api.post(`/appointments/${id}/confirm`);
  return res.data;
};

// 🔥 CANCEL appointment
export const cancelAppointmentAPI = async (id) => {
  const res = await api.post(`/appointments/${id}/cancel`);
  return res.data;
};

// 🔥 GET my appointments
export const getMyAppointmentsAPI = async () => {
  const res = await api.get("/appointments/my");
  return res.data;
};