import express from "express";
import * as controller from "./controller.js";
import { validatePatient } from "./validator.js";

const router = express.Router();

router.post("/patients", validatePatient, controller.create);
router.get("/patients", controller.getAll);
router.get("/patients/:id", controller.getById);
router.put("/patients/:id", validatePatient, controller.update);
router.delete("/patients/:id", controller.remove);

export default router;