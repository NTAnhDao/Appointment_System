// services/payment.service.js

import PaymentRepository from "./repository.js";

class PaymentService {

  // 🔹 Tạo payment
  async createPayment({ appointment_id, amount, payment_method }) {

    const order_id = "ORDER_" + Date.now();

    await PaymentRepository.createPayment({
      appointment_id,
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

}

export default new PaymentService();