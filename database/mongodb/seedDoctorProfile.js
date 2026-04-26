// seedDoctorProfile.js

import DoctorProfile from "../../backend/src/models/DoctorProfile.js";
import { initialize, execute } from "../../backend/src/config/db.oracle.js";

// ================= HELPERS =================
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const schools = [
    "ĐH Y Dược TP.HCM",
    "ĐH Y Hà Nội",
    "ĐH Y Dược Huế"
];

const hospitals = [
    "Bệnh viện Chợ Rẫy",
    "Bệnh viện Đại học Y Dược",
    "Bệnh viện Nhân dân 115",
    "Bệnh viện Từ Dũ"
];

// bio
function generateBio(name, exp) {
    const templates = [
        `${name} là bác sĩ với hơn ${exp} năm kinh nghiệm trong lĩnh vực khám và điều trị. Trong quá trình công tác, bác sĩ đã tiếp nhận và xử lý nhiều ca bệnh từ đơn giản đến phức tạp.`,
        `Với ${exp} năm kinh nghiệm, ${name} có nền tảng chuyên môn vững chắc và luôn tận tâm trong việc chăm sóc bệnh nhân.`,
        `${name} đã có ${exp} năm làm việc trong ngành y, không ngừng cập nhật kiến thức và áp dụng phương pháp điều trị hiện đại.`,
    ];
    return getRandom(templates);
}

// experience
function generateExperience(expYears) {
    const now = new Date().getFullYear();
    const start = now - expYears;

    const mid = start + Math.floor(expYears / 2);

    return [
        {
            from: start,
            to: mid,
            position: "Bác sĩ",
            hospital: getRandom(hospitals)
        },
        {
            from: mid,
            to: "nay",
            position: "Bác sĩ chính",
            hospital: getRandom(hospitals)
        }
    ];
}

// education
function generateEducation(title) {
    let degree = "Bác sĩ đa khoa";

    if (title.includes("TS")) degree = "Tiến sĩ Y khoa";
    else if (title.includes("ThS")) degree = "Thạc sĩ Y khoa";
    else if (title.includes("CKII")) degree = "Chuyên khoa II";
    else if (title.includes("CKI")) degree = "Chuyên khoa I";

    const education = [
        { degree: "Bác sĩ đa khoa", school: getRandom(schools) }
    ];

    // chỉ push nếu khác
    if (degree !== "Bác sĩ đa khoa") {
        education.push({
            degree,
            school: getRandom(schools)
        });
    }

    return education;
}

// achievements
function generateAchievements(expYears) {
    const year = new Date().getFullYear();

    const list = [
        { title: "Bác sĩ tiêu biểu", year: year - 2 }
    ];

    if (expYears > 10) {
        list.push({
            title: "Chiến sĩ thi đua cấp Bộ",
            year: year - 1
        });
    }

    return list;
}

// languages FIX
function generateLanguages() {
    const base = ["Tiếng Việt", "Tiếng Anh"];

    // pool ngôn ngữ phụ
    const extras = [ "Tiếng Pháp", "Tiếng Đức", "Tiếng Nhật", "Tiếng Hàn", "Tiếng Ý"];

    const randomExtra = getRandom(extras);

    // đảm bảo không trùng (an toàn)
    const final = [...base];

    if (!final.includes(randomExtra)) {
        final.push(randomExtra);
    }

    return final;
}

// ================= MAIN =================
const seedDoctorProfile = async () => {
    try {
        await initialize(); // Oracle
        console.log("✅ Oracle connected");

        const result = await execute(`
      SELECT DOCTOR_ID, NAME, TITLE, EXPERIENCE_YEARS
      FROM app.doctor
    `);

        const doctors = result.rows;

        console.log(`📊 Found ${doctors.length} doctors`);

        await DoctorProfile.deleteMany();

        const profiles = doctors.map((doc) => ({
            doctorId: doc.DOCTOR_ID,
            bio: generateBio(doc.NAME, doc.EXPERIENCE_YEARS),

            languages: generateLanguages(), // ✅ FIX

            experience: generateExperience(doc.EXPERIENCE_YEARS),
            education: generateEducation(doc.TITLE),
            achievements: generateAchievements(doc.EXPERIENCE_YEARS)
        }));

        await DoctorProfile.insertMany(profiles);

        console.log("🎉 Seed doctor profiles thành công");
    } catch (err) {
        console.error("❌ ERROR:", err);
        throw err;
    }
};

export default seedDoctorProfile;