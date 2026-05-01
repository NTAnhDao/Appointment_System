import oracledb from "oracledb";
import { execute } from "../../config/db.oracle.js";

export const createInvoice = async (conn, data) => {
  const result = await conn.execute(
    `INSERT INTO app.invoices (appointment_id, total_amount, status)
     VALUES (:appointment_id, :total_amount, 'UNPAID')
     RETURNING invoice_id INTO :id`,
    {
      appointment_id: data.appointment_id,
      total_amount: data.total_amount,
      id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
    }
  );

  return result.outBinds.id[0];
};

export const findByAppointmentId = async (appointmentId) => {
  const result = await execute(
    `SELECT * FROM app.invoices WHERE appointment_id = :id`,
    { id: appointmentId }
  );

  return result.rows[0];
};

export const updateStatus = async (conn, invoiceId, status) => {
  await conn.execute(
    `UPDATE app.invoices
     SET status = :status,
         paid_at = CASE WHEN :status = 'PAID' THEN SYSDATE ELSE paid_at END
     WHERE invoice_id = :id`,
    { status, id: invoiceId }
  );
};

export const findFullDetailByInvoiceId = async (invoiceId) => {
  const result = await execute(
    `SELECT 
        i.invoice_id AS INVOICE_ID,
        i.appointment_id AS APPOINTMENT_ID,
        i.total_amount AS TOTAL_AMOUNT,
        i.status AS INVOICE_STATUS,
        a.status AS APPOINTMENT_STATUS,
        
        s.start_time AS START_TIME,
        s.end_time AS END_TIME,
        s.work_date AS WORK_DATE,
        
        p.full_name AS PATIENT_NAME,
        p.gender AS GENDER,
        p.dob AS BIRTHDAY, 
        p.identity_number AS IDENTITY_NUMBER,
        p.bhyt AS BHYT,
        p.phone AS PHONE,
        p.address_detail AS ADDRESS_DETAIL,
        p.ward AS WARD,
        p.province AS PROVINCE,
        
        d.name AS DOCTOR_NAME, 
        d.title AS TITLE,
        dep.name AS DEPARTMENT_NAME
        
     FROM app.invoices i
     LEFT JOIN app.appointments a ON i.appointment_id = a.appointment_id 
     LEFT JOIN app.schedule s ON a.schedule_id = s.schedule_id
     LEFT JOIN app.patient p ON a.patient_id = p.id 
     LEFT JOIN app.doctor d ON s.doctor_id = d.doctor_id 
     LEFT JOIN app.department dep ON d.department_id = dep.department_id
     
     WHERE i.invoice_id = :id`,
    { id: invoiceId }
  );

  return result.rows[0];
};