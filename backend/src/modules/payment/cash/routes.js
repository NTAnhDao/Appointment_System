import express from "express";
const router = express.Router();
import PaymentService from "../service.js"
import createCashPayment from "./controller.js"; 

router.post('/create', createCashPayment);


export default router;