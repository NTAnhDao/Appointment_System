import api from "./axiosClient";

export const sendNotificationsAPI = async (data) => {
    const res = await api.post("/notifications/send", data );
    return res.data.data; // 👈 chỉ trả array
};