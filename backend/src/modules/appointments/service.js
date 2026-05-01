import * as repo from "./repository.js";
import { withTransaction } from "../../config/db.oracle.js";
import * as invoiceService from "../invoice/service.js";
import * as invoiceRepo from "../invoice/repository.js";

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
    const appointmentId = await repo.insertAppointment(conn, {
        ...data,
        user_id: userId   
        });

   
    const appointment = await repo.findById(conn, appointmentId);

    // 🔥 tạo invoice
    const invoiceId = await invoiceService.createInvoiceForAppointment(
      conn,
      appointment
    );
    return {
      appointmentId,
      invoiceId
    };
  });
};


// 🔥 CONFIRM PAYMENT
export const confirmAppointment = async (appointmentId) => {
  return await withTransaction(async (conn) => {
    const app = await repo.findById(appointmentId);

    if (!app) throw new Error("Appointment not found");

    // Đưa status về chữ thường để so sánh không bị trật (pending / PENDING)
    const currentStatus = app.STATUS ? app.STATUS.toLowerCase() : "";

    // 1. FIX LỖI GỌI 2 LẦN: Nếu đã là 'confirmed' rồi thì thoát luôn, báo thành công!
    if (currentStatus === "confirmed") {
      return; 
    }

    if (currentStatus !== "pending") {
      throw new Error("Invalid state");
    }

     if (new Date() > new Date(app.EXPIRED_AT)) {
      throw new Error("Appointment expired");
    }
    // Vì trong DB bạn đang lưu chữ thường "confirmed", nên update cũng truyền chữ thường
    await repo.updateStatus(conn, appointmentId, "confirmed");
  });
};

// 🔥 EXPIRE (JOB sẽ gọi)
export const expireAppointments = async () => {
  return await withTransaction(async (conn) => {
    const result = await conn.execute(
      `SELECT appointment_id, schedule_id
       FROM app.appointments
       WHERE status = 'pending'
         AND expired_at < SYSDATE`
    );

    for (const row of result.rows) {
      await repo.updateStatus(conn, row.APPOINTMENT_ID, "expired");
      const invoice = await invoiceRepo.findByAppointmentId(
        row.APPOINTMENT_ID
      );

      if (invoice) {
        await invoiceRepo.updateStatus(conn, invoice.INVOICE_ID, "CANCELLED");
      }
      await repo.decreaseSlot(conn, row.SCHEDULE_ID);
    }
  });
};

// 🔥 CANCEL
export const cancelAppointment = async (id) => {
  return await withTransaction(async (conn) => {
    const app = await repo.findById(id);

    if (!app) throw new Error("Not found");

    if (app.STATUS === "cancelled") return;

    await repo.updateStatus(conn, id, "cancelled");

    await repo.decreaseSlot(conn, app.SCHEDULE_ID);
  });
};


export const getMyAppointments = async (userId) => {
  const data = await repo.getAppointmentsByUser(userId);

  return data.map((item) => ({
    id: item.APPOINTMENT_ID,

    //patient info
    patientName: item.PATIENT_NAME,
    gender: item.GENDER === "male" ? "Nam" : "Nữ",
    birthday: formatDate(item.BIRTHDAY),
    address: `${item.ADDRESS_DETAIL}, ${item.WARD}, ${item.PROVINCE}`,
    identityNumber: item.IDENTITY_NUMBER,
    bhyt: item.BHYT,
    phone: item.PHONE,

    // doctor
    doctor: item.TITLE + " " + item.DOCTOR_NAME,
    specialty: item.DEPARTMENT_NAME, 

    // time
    date: formatDate(item.WORK_DATE),
    time: formatTime(item.START_TIME, item.END_TIME),

    // meta
    status: item.STATUS,

    // extra
    expired_at: item.EXPIRED_AT
      ? formatDateTime(item.EXPIRED_AT)
      : null,

    note: item.NOTE || null,
    fee: item.FEE || null,
    queue_number: item.QUEUE_NUMBER || null,
    doctor_image: item.IMAGE_URL || null,
    invoice_status: item.INVOICE_STATUS || null

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

export const assignQueueNumber = async (appointmentId) => {
  return await withTransaction(async (conn) => {
    const app = await repo.findById(appointmentId);

    if (!app) throw new Error("Appointment not found");

    if (app.STATUS.toLowerCase() !== "confirmed") {
      throw new Error("Must be confirmed first");
    }

    if (app.QUEUE_NUMBER) {
      return app.QUEUE_NUMBER; // tránh cấp 2 lần
    }

    const queueNumber = await repo.getNextQueueNumber(app.SCHEDULE_ID);

    await repo.updateQueueNumber(conn, appointmentId, queueNumber);

    return queueNumber;
  });
};