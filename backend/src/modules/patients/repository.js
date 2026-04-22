import { execute } from "../../config/db.oracle.js";

export const getPatientsByUser = async (userId) => {
  const result = await execute(
    `SELECT * 
     FROM patient 
     WHERE is_deleted = 0 
       AND user_id = :userId
     ORDER BY created_at DESC`,
    { userId }
  );

  return result.rows;
};

export const findPatientById = async (id, userId) => {
  const result = await execute(
    `SELECT * 
     FROM patient 
     WHERE id = :id 
       AND user_id = :userId
       AND is_deleted = 0`,
    { id, userId }
  );

  return result.rows[0];
};

export const insertPatient = async (conn, data) => {
  await conn.execute(
    `INSERT INTO patient (
      full_name, gender, dob, identity_number, phone,
      province, ward, address_detail, guardian_id, created_at
    )
    VALUES (
      :full_name, :gender, :dob, :identity_number, :phone,
      :province, :ward, :address_detail, :guardian_id, SYSDATE
    )`,
    data
  );
};

export const updatePatient = async (id, data) => {
  await execute(
    `UPDATE patient SET full_name=:full_name WHERE id=:id`,
    { ...data, id },
    { autoCommit: true }
  );
};

export const softDeletePatient = async (id) => {
  await execute(
    `UPDATE patient SET is_deleted = 1 WHERE id = :id`,
    { id },
    { autoCommit: true }
  );
};

export const countAppointmentsByPatient = async (id) => {
  const result = await execute(
    `SELECT COUNT(*) as count FROM appointment WHERE patient_id = :id`,
    { id }
  );
  return result.rows[0].COUNT;
};

export const findGuardianByCCCD = async (cccd) => {
  const result = await execute(
    `SELECT * FROM guardian WHERE identity_number = :cccd`,
    { cccd }
  );
  return result.rows[0];
};

export const createGuardian = async (conn, data) => {
  const result = await conn.execute(
    `INSERT INTO guardian (
      full_name, identity_number, phone, email, created_at
    )
    VALUES (:full_name, :identity_number, :phone, :email, SYSDATE)
    RETURNING id INTO :id`,
    {
      ...data,
      id: { dir: 3003, type: 2002 }, // NUMBER
    }
  );

  return result.outBinds.id[0];
};