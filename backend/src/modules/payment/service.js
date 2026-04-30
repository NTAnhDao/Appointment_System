// services/payment.service.js

import PaymentRepository from "./repository.js";
import { withTransaction } from "../../config/db.oracle.js";
import * as invoiceService from "../invoice/service.js";
import * as invoiceRepo from "../invoice/repository.js";
import * as appointmentService from "../appointments/service.js";

class PaymentService {

  // 🔹 Tạo payment
  async createPayment({ invoice_id, amount, payment_method }) {

    const order_id = `ORDER_${invoice_id}_${Date.now()}`;

    await PaymentRepository.createPayment({
      invoice_id,
      amount,
      payment_method,
      status: "PENDING",
      order_id
    });

    return {
      order_id,
      amount
    };
  }

  // 🔹 xử lý VNPAY return
  async handleVNPayReturn(query) {

    const order_id = query.vnp_TxnRef;
    const responseCode = query.vnp_ResponseCode;

    let status = "FAILED";

    if (responseCode === "00") {
      status = "SUCCESS";
    }

    await PaymentRepository.updateStatus(order_id, status);

    return status;
  }

  // 🔹 xử lý MOMO return
  async handleMomoReturn(body) {

    const order_id = body.orderId;
    const resultCode = body.resultCode;

    let status = "FAILED";

    if (resultCode === 0) {
      status = "SUCCESS";
    }

    await PaymentRepository.updateStatus(order_id, status);

    return status;
  }

  async handleQRUpdate(body) {
    const order_id = body.orderId;

    // Mặc định gọi API này là quét thành công
    const status = "SUCCESS";

    await PaymentRepository.updateStatus(order_id, status);
    console.log(`[Service] Đơn QR ${order_id} đã cập nhật ${status} vào DB!`);

    return status;
  }

  // 🔹 Kiểm tra trạng thái QR Code (Dành cho Polling của Laptop)
  async checkQRStatus(orderId) {
    const result = await PaymentRepository.findByOrderId(orderId);
    if (result && result.rows && result.rows.length > 0) {
      return result.rows[0].STATUS || result.rows[0].status;
    }

    return "NOT_FOUND";
  }

  async handlePaymentCallback(orderId, success) {
    return await withTransaction(async (conn) => {

      const payment = await PaymentRepository.findByOrderId(orderId);
      if (!payment) throw new Error("Payment not found");

      // 🔥 tránh xử lý 2 lần (double callback)
      if (payment.STATUS === "SUCCESS") return "SUCCESS";

      if (success) {
        // 1. PAYMENT
        await PaymentRepository.updateStatus(conn, payment.PAYMENT_ID, "SUCCESS");

        // 2. INVOICE
        await invoiceService.markPaid(conn, payment.INVOICE_ID);

        // 3. APPOINTMENT
        const invoice = await invoiceRepo.findById(payment.INVOICE_ID);

        await appointmentService.confirmAppointment(invoice.APPOINTMENT_ID);

        // 🔥 nếu là ONLINE → cấp queue luôn
        if (payment.PAYMENT_METHOD !== "CASH") {
          await appointmentService.assignQueueNumber(invoice.APPOINTMENT_ID);
        }

        return "SUCCESS";

      } else {
        await PaymentRepository.updateStatus(conn, payment.PAYMENT_ID, "FAILED");
        return "FAILED";
      }
    });
  }

}


export default new PaymentService();