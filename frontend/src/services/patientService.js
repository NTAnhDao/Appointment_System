import api from "./axiosClient";

export const getPatientsAPI = async () => {
  const res = await api.get("/patients");
  return res.data.data; 
};

// GET by id
export const getPatientByIdAPI = async (id) => {
  const res = await api.get(`/patients/${id}`);
  return res.data.data;
};

// CREATE
export const createPatientAPI = (data) => api.post("/patients", data);

// UPDATE
export const updatePatientAPI = (id, data) =>
  api.put(`/patients/${id}`, data);

// DELETE
export const deletePatientAPI = (id) =>
  api.delete(`/patients/${id}`);