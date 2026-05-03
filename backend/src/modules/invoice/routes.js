import express from "express";
import * as controller from "./controller.js";
import { authMiddleware } from "../../shared/middleware/AuthMiddleware.js";
import { downloadInvoice } from "../notification/controller.js";

const router = express.Router();

router.post("/:id/status", authMiddleware, controller.updateStatus);
router.get("/:id/pdf", authMiddleware, downloadInvoice);
router.get("/:id", authMiddleware, controller.getDetail);
export default router;