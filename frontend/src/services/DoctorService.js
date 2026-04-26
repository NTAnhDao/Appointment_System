import api from "./axiosClient";

// 🔥 lấy tất cả bác sĩ (có thể filter theo khoa)
export const getDoctorsAPI = async () => {
    const res = await api.get("/doctors");
    return res.data;
}

// 🔥 lấy chi tiết bác sĩ
export const getDoctorDetailAPI = async (id) => {
    try {
        const res = await api.get(`/doctors/${id}`);
        return res.data;
    } catch (err) {
        console.error("❌ getDoctorDetailAPI error:", err);
        throw err;
    }
};

// 🔥 lấy danh sách chuyên khoa
export const getDepartmentsAPI = async () => {
    try {
        const res = await api.get("/departments");
        return res.data;
    } catch (err) {
        console.error("❌ getDepartmentsAPI error:", err);
        throw err;
    }
};