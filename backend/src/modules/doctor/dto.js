export function mapDoctorList(sqlDoctor) {
    return {
        id: sqlDoctor.DOCTOR_ID,
        name: sqlDoctor.NAME,
        image: sqlDoctor.IMAGE_URL,
        title: sqlDoctor.TITLE,
        specialty: sqlDoctor.DEPARTMENT_NAME,
        departmentId: sqlDoctor.DEPARTMENT_ID,
        description: sqlDoctor.SHORT_BIO,
        exp: sqlDoctor.EXPERIENCE_YEARS,
        price: sqlDoctor.CONSULTATION_FEE
    };
}

export function mapDoctorDetail(sqlDoctor, mongoProfile) {
    return {
        id: sqlDoctor.DOCTOR_ID,
        name: sqlDoctor.NAME,
        image: sqlDoctor.IMAGE_URL,
        title: sqlDoctor.TITLE,
        specialty: sqlDoctor.DEPARTMENT_NAME,
        departmentId: sqlDoctor.DEPARTMENT_ID,

        description: sqlDoctor.SHORT_BIO,
        exp: sqlDoctor.EXPERIENCE_YEARS,
        price: sqlDoctor.CONSULTATION_FEE,

        // từ Mongo
        bio: mongoProfile?.bio || "",
        languages: mongoProfile?.languages || [],
        education: mongoProfile?.education || [],
        experience: mongoProfile?.experience || [],
        achievements: mongoProfile?.achievements || []
    };
}