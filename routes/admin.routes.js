import { Router } from "express";


import { adminLogin,adminLogout, checkAdminSession, getAllServiceRequests, verifyServiceRequestOTP } from "../controller/admin.controller.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";
const router = Router()


router.route("/login").post(adminLogin)
router.route("/service-requests").get(verifyAdmin,getAllServiceRequests)
router.route("/check-session").get(verifyAdmin,checkAdminSession)
router.post("/logout", adminLogout);
router.route("/verify-request-otp").post(verifyAdmin,verifyServiceRequestOTP)

export default router