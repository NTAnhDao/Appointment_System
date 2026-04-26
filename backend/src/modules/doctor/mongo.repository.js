import DoctorProfile from "../../models/DoctorProfile.js";

export async function findProfileByDoctorId(doctorId) {
    return await DoctorProfile.findOne({ doctorId }).lean();
}

export async function findProfilesByDoctorIds(ids) {
    const profiles = await DoctorProfile.find({
        doctorId: { $in: ids }
    }).lean();

    // convert thành map để join nhanh O(1)
    const map = {};
    profiles.forEach(p => {
        map[p.doctorId] = p;
    });

    return map;
}