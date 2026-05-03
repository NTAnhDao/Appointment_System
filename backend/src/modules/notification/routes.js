import express from "express";
import * as controller from "./controller.js";
const router = express.Router();

router.post("/send", controller.sendMail);
export default router;