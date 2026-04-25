import express from "express";
import * as controller from "./controller.js";
import { validatePatient } from "./validator.js";
import { authMiddleware } from "../../shared/middleware/AuthMiddleware.js";
const router = express.Router();

router.post("/", authMiddleware, validatePatient, controller.create);
router.get("/", authMiddleware, controller.getAll);
router.get("/:id", authMiddleware, controller.getById);
router.put("/:id", authMiddleware, validatePatient, controller.update);
router.delete("/:id", authMiddleware, controller.remove);

export default router;