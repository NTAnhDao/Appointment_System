import oracledb from "oracledb";
import { execute } from "../../config/db.oracle.js";

export const findFullDetailByInvoiceId = async (invoice_id) => {
  const sql = `
    SELECT 
        i.invoice_id,
        i.status AS invoice_status,
        i.total_amount,
        i.paid_at,

        a.appointment_id,
        a.status AS appointment_status,

        p.full_name AS patient_name,
        p.gender,
        p.dob AS birthday,
        p.identity_number,
        p.bhyt,
        p.province,
        p.ward,
        p.address_detail,
        p.phone,

        dpt.name AS department_name,
        dr.title,
        dr.name AS doctor_name,

        s.work_date,
        s.start_time,
        s.end_time

    FROM app.invoices i
    JOIN app.appointments a 
        ON i.appointment_id = a.appointment_id

    JOIN app.patient p 
        ON a.patient_id = p.id

    JOIN app.schedule s 
        ON a.schedule_id = s.schedule_id

    JOIN app.doctor dr 
        ON s.doctor_id = dr.doctor_id

    JOIN app.department dpt 
        ON dr.department_id = dpt.department_id

    WHERE i.invoice_id = :invoice_id
  `;

  const result = await execute(sql, { invoice_id });
  return result.rows[0];
};