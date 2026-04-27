import express from "express";
import * as doctorController from "./controller.js";

const router = express.Router();

router.get("/", doctorController.getDoctors);
router.get("/:id", doctorController.getDoctorDetail);
router.get("/schedules/:doctorId", doctorController.getSchedules);

export default router;