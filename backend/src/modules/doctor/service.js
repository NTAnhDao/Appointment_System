import * as sqlRepo from "./sql.repository.js";
import * as mongoRepo from "./mongo.repository.js";
import { mapDoctorList, mapDoctorDetail } from "./dto.js";

export async function getDoctors() {
    const doctors = await sqlRepo.findDoctors();

    const ids = doctors.map(d => d.DOCTOR_ID);
    const profileMap = await mongoRepo.findProfilesByDoctorIds(ids);

    return doctors.map(d => {
        const doctor = mapDoctorList(d);

        return {
            ...doctor,
            bio: profileMap[d.DOCTOR_ID]?.bio || ""
        };
    });
}

export async function getDoctorDetail(id) {
    const doctor = await sqlRepo.findDoctorById(id);
    if (!doctor) throw new Error("Doctor not found");

    const profile = await mongoRepo.findProfileByDoctorId(id);

    return mapDoctorDetail(doctor, profile);
}

