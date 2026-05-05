import oracledb from "oracledb";
import { execute } from "../../config/db.oracle.js";

export const createInvoice = async (conn, data) => {
  const result = await conn.execute(
    `INSERT INTO invoices (appointment_id, total_amount, status)
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
    `SELECT * FROM invoices WHERE appointment_id = :id`,
    { id: appointmentId }
  );

  return result.rows[0];
};

export const updateStatus = async (conn, invoiceId, status) => {
  const result = await conn.execute(
    `UPDATE invoices
     SET status = :status,
         paid_at = CASE WHEN :status = 'PAID' THEN SYSTIMESTAMP ELSE paid_at END
     WHERE invoice_id = :id
     RETURNING appointment_id INTO :appointment_id`,
    {
      status,
      id: invoiceId,
      appointment_id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
    }
  );

  
  return result.outBinds.appointment_id[0];
};

export const findFullDetailByInvoiceId = async (invoiceId) => {
  const result = await execute(
    `SELECT 
        i.invoice_id AS INVOICE_ID,
        i.appointment_id AS APPOINTMENT_ID,
        i.total_amount AS TOTAL_AMOUNT,
        i.status AS INVOICE_STATUS,
        a.status AS APPOINTMENT_STATUS,
        a.queue_number AS QUEUE_NUMBER,
        a.user_id AS USER_ID,
        
        s.start_time AS START_TIME,
        s.end_time AS END_TIME,
        s.work_date AS WORK_DATE,
        
        p.id AS PATIENT_ID,
        p.full_name AS PATIENT_NAME,
        p.gender AS GENDER,
        p.dob AS BIRTHDAY, 
        p.identity_number AS IDENTITY_NUMBER,
        p.bhyt AS BHYT,
        p.phone AS PHONE,
        p.email AS EMAIL,
        p.address_detail AS ADDRESS_DETAIL,
        p.ward AS WARD,
        p.province AS PROVINCE,
        
        d.name AS DOCTOR_NAME, 
        d.title AS TITLE,
        dep.name AS DEPARTMENT_NAME
        
     FROM invoices i
     LEFT JOIN appointments a ON i.appointment_id = a.appointment_id 
     LEFT JOIN schedule s ON a.schedule_id = s.schedule_id
     LEFT JOIN patient p ON a.patient_id = p.id 
     LEFT JOIN doctor d ON s.doctor_id = d.doctor_id 
     LEFT JOIN department dep ON d.department_id = dep.department_id
     
     WHERE i.invoice_id = :id`,
    { id: invoiceId }
  );

  return result.rows[0];
};