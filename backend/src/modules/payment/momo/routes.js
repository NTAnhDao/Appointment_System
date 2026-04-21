import express from "express";
const router = express.Router();
import createMomoPayment from "./controller.js"
import PaymentService from "../service.js"

// Tạo thanh toán MoMo
router.post('/create', createMomoPayment);
router.post("/update", async (req, res) => {
  try {
    const status = await PaymentService.handleMomoReturn(req.body);
    res.json({ status });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "MOMO error" });
  }
});

export default router;