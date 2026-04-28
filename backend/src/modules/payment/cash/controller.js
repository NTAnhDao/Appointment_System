import PaymentService from "../service.js"; 

const createCashPayment = async (req, res) => {
  try {
    const { amount, appointment_id } = req.body;
    
    const paymentInfo = await PaymentService.createPayment({
      appointment_id: appointment_id,
      amount: amount,
      payment_method: "CASH" 
    });

    res.json({ 
      success: true, 
      message: "Đăng ký thanh toán tại viện thành công",
      order_id: paymentInfo.order_id 
    });
  } catch (error) {
   
    console.error("Lỗi tạo thanh toán tại viện:", error);
    res.status(500).json({ success: false, message: "Lỗi Server" });
  }
};

export default createCashPayment;