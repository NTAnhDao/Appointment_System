import express from "express";
import appointmentRoutes from "../modules/appointments/routes.js";
import authRoutes from "../modules/auth/routes.js";
import paymentVnpayRoutes from "../modules/payment/vnpay/routes.js";
import paymentMomoRoutes from "../modules/payment/momo/routes.js";
import patientRoutes from "../modules/patients/routes.js";
import locationRoutes from "../modules/location/routes.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "API OK" });
});

router.use("/appointments", appointmentRoutes);
router.use("/auth", authRoutes )
router.use("/payments/vnpay", paymentVnpayRoutes);
router.use("/payments/momo", paymentMomoRoutes )
router.use("/patients", patientRoutes);
router.use("/locations", locationRoutes);

export default router;