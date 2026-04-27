import PaymentService from "../service.js"; 

const createQRPayment = async (req, res) => {
  try {
    const { amount, appointment_id } = req.body;
    
    const paymentInfo = await PaymentService.createPayment({
      appointment_id: appointment_id,
      amount: amount,
      payment_method: "QR_CODE"
    });

    res.json({ success: true, order_id: paymentInfo.order_id });
  } catch (error) {
    console.error("Lỗi tạo mã QR:", error);
    res.status(500).json({ success: false, message: "Lỗi Server" });
  }
};

export default createQRPayment;