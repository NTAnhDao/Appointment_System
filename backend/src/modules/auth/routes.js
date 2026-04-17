import express from "express";
import authController from "./controller.js";
import authValidator from "./validator.js";

const router = express.Router();

router.post('/register', authValidator.validateRegister, authController.register);
router.post('/login', authValidator.validateLogin, authController.login);

export default router;