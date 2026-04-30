import express from "express";
import * as controller from "./controller.js";
import { authMiddleware } from "../../shared/middleware/AuthMiddleware.js";


const router = express.Router();


router.get("/:id", authMiddleware, controller.getDetail);
export default router;