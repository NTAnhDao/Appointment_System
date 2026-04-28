import * as repo from "./repository.js";
import { withTransaction } from "../../config/db.oracle.js";

// 🔥 CREATE APPOINTMENT
export const createAppointment = async (data, userId) => {
  return await withTransaction(async (conn) => {
    // check duplicate (UX tốt hơn)
    const isDup = await repo.checkDuplicate(
      data.patient_id,
      data.schedule_id
    );

    if (isDup) {
      throw new Error("Already booked");
    }

    // insert
    const id = await repo.insertAppointment(conn, {
        ...data,
        user_id: userId   
        });

    return id;
  });
};

// 🔥 CONFIRM PAYMENT
export const confirmAppointment = async (appointmentId) => {
  return await withTransaction(async (conn) => {
    const app = await repo.findById(appointmentId);

    if (!app) throw new Error("Appointment not found");

    if (app.STATUS !== "PENDING") {
      throw new Error("Invalid state");
    }

    // ❗ check expire
    if (new Date() > new Date(app.EXPIRED_AT)) {
      throw new Error("Appointment expired");
    }

    await repo.updateStatus(conn, appointmentId, "CONFIRMED");
  });
};

// 🔥 EXPIRE (JOB sẽ gọi)
export const expireAppointments = async () => {
  return await withTransaction(async (conn) => {
    const result = await conn.execute(
      `SELECT appointment_id, schedule_id
       FROM app.appointments
       WHERE status = 'PENDING'
         AND expired_at < SYSDATE`
    );

    for (const row of result.rows) {
      await repo.updateStatus(conn, row.APPOINTMENT_ID, "EXPIRED");
      await repo.decreaseSlot(conn, row.SCHEDULE_ID);
    }
  });
};

// 🔥 CANCEL
export const cancelAppointment = async (id) => {
  return await withTransaction(async (conn) => {
    const app = await repo.findById(id);

    if (!app) throw new Error("Not found");

    if (app.STATUS === "CANCELLED") return;

    await repo.updateStatus(conn, id, "CANCELLED");

    await repo.decreaseSlot(conn, app.SCHEDULE_ID);
  });
};


export const getMyAppointments = async (userId) => {
  const data = await repo.getAppointmentsByUser(userId);

  return data.map((item) => ({
    id: item.APPOINTMENT_ID,

    // doctor
    doctor: item.TITLE + " " + item.DOCTOR_NAME,
    specialty: item.DEPARTMENT_NAME, // ✅ FIX

    // time
    date: formatDate(item.WORK_DATE),
    time: formatTime(item.START_TIME, item.END_TIME),

    // meta
    status: mapStatus(item.STATUS),

    // extra
    expired_at: item.EXPIRED_AT
      ? formatDateTime(item.EXPIRED_AT)
      : null,

    note: item.NOTE || null,
    patient_name: item.PATIENT_NAME || null,
    fee: item.FEE || null,
    doctor_image: item.IMAGE_URL || null
  }));
};

// format helpers
const formatDateTime = (date) => {
  return new Date(date).toLocaleString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit"
  });
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("vi-VN");
};

const formatTime = (start, end) => {
  const s = new Date(start).toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit"
  });
  const e = new Date(end).toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit"
  });
  return `${s} - ${e}`;
};

const mapStatus = (status) => {
  switch (status) {
    case "CONFIRMED":
      return "paid";
    case "PENDING":
      return "pending";
    case "EXPIRED":
      return "done";
    default:
      return "pending";
  }
};