import { Router } from "express";
import { erpLogin,checkErpSession,erpLogout,createAdmin,getAllRequestsForERP } from "../controller/erp.controller.js";
import { verifyERP } from "../middlewares/erp.middleware.js";



const router = Router();

router.route("/login").post(erpLogin)
router.route("/check-session").get(verifyERP,checkErpSession)
router.route("/logout").post(verifyERP,erpLogout)
router.route("/create-admin").post(verifyERP,createAdmin)
router.route("/requests").get(verifyERP,getAllRequestsForERP)

export default router