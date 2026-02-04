import { Router } from "express";
import { erpLogin,checkErpSession,getJobByJobId,erpLogout,createAdmin,getAllRequestsForERP,viewAdmins,deleteAdmin } from "../controller/erp.controller.js";
import { verifyERP } from "../middlewares/erp.middleware.js";



const router = Router();

router.route("/login").post(erpLogin)
router.route("/check-session").get(verifyERP,checkErpSession)
router.route("/logout").post(verifyERP,erpLogout)
router.route("/create-admin").post(verifyERP,createAdmin)
router.route("/requests").get(verifyERP,getAllRequestsForERP)
router.route("/admins").get(verifyERP,viewAdmins)
router.route("/admins/:adminId").delete(verifyERP,deleteAdmin)
router.route("/job/:jobId").get(verifyERP,getJobByJobId)
export default router 