import express from "express";
const router = express.Router();
import createPaymentUrl from "./controller.js";
import PaymentService from "../service.js"

// Route tạo link thanh toán VNPAY
router.post('/create_url', createPaymentUrl);
router.post("/update", async (req, res) => {
  try {
    const status = await PaymentService.handleVNPayReturn(req.body);
    res.json({ status });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "VNPAY error" });
  }
});

export default router;