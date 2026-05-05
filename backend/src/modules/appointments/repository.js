import oracledb from "oracledb";
import { execute } from "../../config/db.oracle.js";

// lấy schedule
export const getScheduleById = async (id) => {
  const result = await execute(
    `SELECT * FROM schedule WHERE schedule_id = :id`,
    { id }
  );
  return result.rows[0];
};

// check duplicate
export const checkDuplicate = async (conn, patientId, scheduleId) => {
  const result = await conn.execute(
    `SELECT 1 FROM appointments
     WHERE patient_id = :p
       AND schedule_id = :s
       AND status IN ('pending','confirmed')`,
    { p: patientId, s: scheduleId }
  );
  return result.rows.length > 0;
};

export const insertAppointment = async (conn, data) => {
  const result = await conn.execute(
    `INSERT INTO appointments (
      schedule_id,
      patient_id,
      user_id,
      fee,
      expired_at
    )
    VALUES (
      :schedule_id,
      :patient_id,
      :user_id,
      :fee,
      SYSTIMESTAMP AT TIME ZONE 'UTC' + INTERVAL '3' MINUTE
    )
    RETURNING appointment_id INTO :id`,
    {
      ...data,
      id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
    }
  );

  return result.outBinds.id[0];
};

// tăng slot
export const increaseSlot = async (conn, scheduleId) => {
  await conn.execute(
    `UPDATE schedule
     SET booked_count = booked_count + 1
     WHERE schedule_id = :id`,
    { id: scheduleId }
  );
};

// giảm slot
export const decreaseSlot = async (conn, scheduleId) => {
  await conn.execute(
    `UPDATE schedule
     SET booked_count = booked_count - 1
     WHERE schedule_id = :id`,
    { id: scheduleId }
  );
};

// find appointment
export const findById = async (conn, id) => {
  // Dùng conn.execute thay vì execute chung chung
  const result = await conn.execute(
    `SELECT * FROM appointments WHERE appointment_id = :id`,
    { id } // Lúc này id đã là một con số đàng hoàng
  );
  return result.rows[0];
};

// update status
export const updateStatus = async (conn, id, status) => {
  await conn.execute(
    `UPDATE appointments
     SET status = :status
     WHERE appointment_id = :id`,
    { id, status }
  );
};

export const getAppointmentsByUser = async (userId) => {
  const result = await execute(
    `SELECT 
        a.appointment_id,
        a.status,
        a.fee,
        a.queue_number,
        a.created_at,
        a.expired_at,

        -- schedule
        s.schedule_id,
        s.work_date,
        s.start_time,
        s.end_time,

        -- doctor
        d.doctor_id,
        d.name AS doctor_name,
        d.title,
        d.image_url,

        -- department 
        dp.name AS department_name,
        dp.consultation_fee,

        -- patient
        p.full_name AS patient_name,
        p.gender,
        p.dob AS birthday,
        p.identity_number,
        p.bhyt,
        p.province,
        p.ward,
        p.address_detail,
        p.phone,

        --invoice
        inv.invoice_id,
        inv.status AS INVOICE_STATUS

     FROM appointments a

     JOIN schedule s 
       ON a.schedule_id = s.schedule_id

     JOIN doctor d 
       ON s.doctor_id = d.doctor_id

     JOIN department dp 
       ON d.department_id = dp.department_id

     JOIN patient p 
       ON a.patient_id = p.id
    
     LEFT JOIN INVOICES inv
       ON a.appointment_id = inv.appointment_id

     WHERE a.user_id = :userId

     ORDER BY a.created_at DESC`,
    { userId }
  );

  return result.rows;
};

export const getNextQueueNumber = async (conn) => {
  const result = await conn.execute(
    `SELECT queue_seq.NEXTVAL AS NEXT_Q FROM dual`
  );
  return result.rows[0].NEXT_Q;
};

export const updateQueueNumber = async (conn, id, queueNumber) => {
  await conn.execute(
    `UPDATE appointments
     SET queue_number = :q
     WHERE appointment_id = :id`,
    { q: queueNumber, id }
  );
};