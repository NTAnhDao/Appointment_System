import express from "express";
import appointmentRoutes from "../modules/appointments/routes.js";
import authRoutes from "../modules/auth/routes.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "API OK" });
});

router.use("/appointments", appointmentRoutes);
router.use("/auth", authRoutes )

export default router;