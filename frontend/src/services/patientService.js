import api from "./axiosClient";

// 🔥 GET list
export const getPatientsAPI = () => api.get("/patients");

// 🔥 GET by id
export const getPatientByIdAPI = (id) => api.get(`/patients/${id}`);

// 🔥 CREATE
export const createPatientAPI = (data) => api.post("/patients", data);

// 🔥 UPDATE
export const updatePatientAPI = (id, data) =>
  api.put(`/patients/${id}`, data);

// 🔥 DELETE
export const deletePatientAPI = (id) =>
  api.delete(`/patients/${id}`);