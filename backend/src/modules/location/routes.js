import express from "express"
import * as controller from "./controller.js"

const router = express.Router()

router.get("/provinces", controller.getProvinces)
router.get("/communes/:provinceId", controller.getCommunes)

export default router