import express from "express";
import { createAppointment } from "./controller.js";

const router = express.Router();

router.post("/", createAppointment);

export default router;