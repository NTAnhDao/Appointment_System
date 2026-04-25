import { execute } from "../../config/db.oracle.js";
import oracledb from "oracledb";

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
  const { guardian, ...cleanData } = data; // remove object

  const result = await conn.execute(
    `INSERT INTO patient (
      full_name,
      gender,
      dob,
      identity_number,
      bhyt,
      phone,
      email,
      province,
      ward,
      address_detail,
      job,
      ethnicity,
      relation,
      guardian_id,
      user_id
    )
    VALUES (
      :full_name,
      :gender,
      :dob,
      :identity_number,
      :bhyt,
      :phone,
      :email,
      :province,
      :ward,
      :address_detail,
      :job,
      :ethnicity,
      :relation,
      :guardian_id,
      :user_id
    )
    RETURNING id INTO :id`,
    {
      ...cleanData,
      guardian_id: data.guardian_id || null,
      user_id: data.user_id || null,
      id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
    }
  );

  return result.outBinds.id[0];
};

export const updatePatient = async (id, data) => {
  const { guardian, ...cleanData } = data;
  await execute(
    `UPDATE patient SET
      full_name = :full_name,
      gender = :gender,
      dob = :dob,
      identity_number = :identity_number,
      bhyt = :bhyt,
      phone = :phone,
      email = :email,
      province = :province,
      ward = :ward,
      address_detail = :address_detail,
      job = :job,
      ethnicity = :ethnicity,
      relation = :relation,
      guardian_id = :guardian_id
    WHERE id = :id`,
    {
      ...cleanData, 
      guardian_id: data.guardian_id || null,
      id
    },
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