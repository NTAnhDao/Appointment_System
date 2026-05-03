import * as repo from "./repository.js";
import { withTransaction } from "../../config/db.oracle.js";
import {confirmAppointment} from "../appointments/service.js";
import * as appointmentService from "../appointments/service.js";

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

export const getInvoiceDetail = async (invoice_id) => {
  const data = await repo.findFullDetailByInvoiceId(invoice_id);

  if (!data) {
    throw new Error("Invoice not found");
  }

  return {
    invoiceId: data.INVOICE_ID,
    appointmentId: data.APPOINTMENT_ID,
    userId: data.USER_ID,
    patientId: data.PATIENT_ID,

    patientName: data.PATIENT_NAME,
    gender: data.GENDER === "male" ? "Nam" : "Nữ",
    birthday: data.BIRTHDAY,

    specialty: data.DEPARTMENT_NAME,
    doctor: `${data.TITLE} ${data.DOCTOR_NAME}`,

    amount: data.TOTAL_AMOUNT, 

    invoiceStatus: data.INVOICE_STATUS.toLowerCase(),
    appointmentStatus: data.APPOINTMENT_STATUS.toLowerCase(),
    queueNumber: data.QUEUE_NUMBER,

    time: `${formatTime(data.START_TIME, data.END_TIME)}`,
    date: `${formatDate(data.WORK_DATE)}`,
    displayTime: `${formatTime(data.START_TIME, data.END_TIME)} - ${formatDate(data.WORK_DATE)}`,

    address: `${data.ADDRESS_DETAIL}, ${data.WARD}, ${data.PROVINCE}`,
    identityNumber: data.IDENTITY_NUMBER,
    bhyt: data.BHYT,
    phone: data.PHONE,
    email: data.EMAIL,
  };
};


export const createInvoiceForAppointment = async (conn, appointment) => {
  return await repo.createInvoice(conn, {
    appointment_id: appointment.APPOINTMENT_ID || appointment.appointment_id,
    total_amount: appointment.FEE || appointment.fee
  });
};

export const markPaid = async (conn, invoiceId) => {
  const appointmentId = await repo.updateStatus(conn, invoiceId, "PAID");

  if (appointmentId) {
    await confirmAppointment(appointmentId);
    await appointmentService.assignQueueNumber(appointmentId);
  }

  return appointmentId;
};

export const cancelInvoice = async (conn, invoiceId) => {
  await repo.updateStatus(conn, invoiceId, "CANCELLED");
};
