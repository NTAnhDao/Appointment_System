import express from "express";
import appointmentRoutes from "../modules/appointments/routes.js";
import authRoutes from "../modules/auth/routes.js";
import paymentVnpayRoutes from "../modules/payment/vnpay/routes.js";
import paymentMomoRoutes from "../modules/payment/momo/routes.js";
import paymentQRCodeRoutes from "../modules/payment/qrcode/routes.js";
import paymentCashRoutes from "../modules/payment/cash/routes.js";
import patientRoutes from "../modules/patients/routes.js";
import locationRoutes from "../modules/location/routes.js";
import departmentRoutes from "../modules/departments/routes.js";
import doctorRoutes from "../modules/doctor/routes.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "API OK" });
});

router.use("/appointments", appointmentRoutes);
router.use("/auth", authRoutes )
router.use("/payments/vnpay", paymentVnpayRoutes)
router.use("/payments/momo", paymentMomoRoutes )
router.use("/payments/qrcode", paymentQRCodeRoutes)
router.use("/payments/cash", paymentCashRoutes)
router.use("/patients", patientRoutes);
router.use("/locations", locationRoutes);
router.use("/departments", departmentRoutes);
router.use("/doctors", doctorRoutes);

export default router;