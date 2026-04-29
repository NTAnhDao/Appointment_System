import express from "express";
import * as controller from "./controller.js";
import { authMiddleware } from "../../shared/middleware/AuthMiddleware.js";

import { validateCreateAppointment } from "./validator.js";


const router = express.Router();

router.post(
  "/",
  authMiddleware,
  validateCreateAppointment,
  controller.create
);
router.post("/:id/confirm", authMiddleware, controller.confirm);
router.post("/:id/cancel", authMiddleware, controller.cancel);

router.get("/my", authMiddleware, controller.getMy);
export default router;