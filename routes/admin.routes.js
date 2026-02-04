import { Router } from "express";
import { adminLogin,adminLogout, verifyOTP,assignJob, checkAdminSession,getJobByJobId ,getAllServiceRequests, verifyServiceRequestOTP, getJobByServiceRequest } from "../controller/admin.controller.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";

const router = Router()


router.route("/login").post(adminLogin)
router.route("/service-requests").get(verifyAdmin,getAllServiceRequests)
router.route("/check-session").get(checkAdminSession)
router.post("/logout", adminLogout);
router.route("/verify-request-otp").post(verifyAdmin,verifyServiceRequestOTP)
router.route("/assignJob").post(verifyAdmin,assignJob)
router.route("/getJob/:jobId").get(verifyAdmin,getJobByJobId)
router.route("/job/by-request/:serviceRequestId").get(verifyAdmin,getJobByServiceRequest)
router.route("/vrify-job-otp").post(verifyAdmin,verifyOTP)
export default router         
