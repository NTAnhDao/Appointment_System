// services/payment.service.js

import PaymentRepository from "./repository.js";

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

}



export default new PaymentService();