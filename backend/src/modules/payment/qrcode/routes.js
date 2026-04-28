import express from "express";
const router = express.Router();
import PaymentService from "../service.js"
import createQRPayment from "./controller.js";

router.post('/create', createQRPayment);

// [API 2] Cập nhật trạng thái khi điện thoại quét xong (Giống MOMO/VNPAY)
router.post('/update', async (req, res) => {
  try {
    const status = await PaymentService.handleQRUpdate(req.body);
    res.json({ success: true, status });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "QR Update error" });
  }
});

// [API 3] Polling check trạng thái (Đặc thù riêng của QR nên vẫn để ở đây)
router.get('/check-status/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const status = await PaymentService.checkQRStatus(orderId);
    res.json({ orderId: orderId, status: status });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "ERROR" });
  }
});

export default router;