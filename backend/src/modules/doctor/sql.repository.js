import { execute } from '../../config/db.oracle.js';

export async function findDoctorById(id) {
    const result = await execute(
        `
        SELECT 
            d.doctor_id,
            d.name,
            d.title,
            d.short_bio,
            d.experience_years,
            d.image_url,
            dp.name AS department_name,
            dp.department_id,
            dp.consultation_fee
        FROM app.doctor d
        JOIN app.department dp 
            ON d.department_id = dp.department_id
        WHERE d.doctor_id = :id
        `,
        { id } // ✅ bind param chuẩn Oracle
    );

    if (result.rows.length === 0) return null;

    const row = result.rows[0];

    return {
        DOCTOR_ID: row.DOCTOR_ID,
        NAME: row.NAME,
        TITLE: row.TITLE,
        SHORT_BIO: row.SHORT_BIO,
        EXPERIENCE_YEARS: row.EXPERIENCE_YEARS,
        IMAGE_URL: row.IMAGE_URL,
        DEPARTMENT_NAME: row.DEPARTMENT_NAME,
        DEPARTMENT_ID: row.DEPARTMENT_ID,
        CONSULTATION_FEE: row.CONSULTATION_FEE
    };
}

export async function findDoctors() {
    let sql = `
        SELECT 
            d.doctor_id,
            d.name,
            d.title,
            d.short_bio,
            d.experience_years,
            d.image_url,
            dp.name AS department_name,
            dp.consultation_fee,
            d.department_id
        FROM app.doctor d
        JOIN app.department dp 
            ON d.department_id = dp.department_id
        WHERE d.status = 'ACTIVE'
        ORDER BY d.doctor_id DESC`;

    try {
        const result = await execute(sql, {});

        return result.rows.map(row => ({
            DOCTOR_ID: row.DOCTOR_ID,
            NAME: row.NAME,
            TITLE: row.TITLE,
            SHORT_BIO: row.SHORT_BIO,
            EXPERIENCE_YEARS: row.EXPERIENCE_YEARS,
            IMAGE_URL: row.IMAGE_URL,
            DEPARTMENT_NAME: row.DEPARTMENT_NAME,
            DEPARTMENT_ID: row.DEPARTMENT_ID,
            CONSULTATION_FEE: row.CONSULTATION_FEE,
            DEPARTMENT_ID: row.DEPARTMENT_ID
        }));
    } catch (err) {
        console.error("❌ Error fetching doctors:", err);
        throw err;
    }
}

export async function findSchedule(doctorId, fromDate, toDate) {
    const sql = `
            SELECT 
                schedule_id,
                work_date,
                TO_CHAR(work_date, 'DD') AS day,
                TO_CHAR(work_date, 'DY', 'NLS_DATE_LANGUAGE=VIETNAMESE') AS weekday,
                TO_CHAR(start_time, 'HH24:MI') AS start_time,
                TO_CHAR(end_time, 'HH24:MI') AS end_time,
                max_patients,
                booked_count,
                status
            FROM app.schedule
            WHERE doctor_id = :doctorId
            AND work_date BETWEEN TO_DATE(:fromDate, 'YYYY-MM-DD') 
                                AND TO_DATE(:toDate, 'YYYY-MM-DD')
            ORDER BY work_date, start_time
        `;

    const result = await execute(sql, {
        doctorId,
        fromDate,
        toDate,
    });

    return result.rows;
}
