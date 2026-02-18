import express from 'express'
import { createServiceRequest, getAllServices,getServiceByLocation, getServiceRequestTracking, sendTrackingOTP, verifyTrackingOTP } from '../controller/service.controller.js'
import { Router } from 'express'


const router = Router();


router.route("/").get(getAllServices)
router.route("/filter").get(getServiceByLocation)
router.route("/request-service").post(createServiceRequest)
router.get("/tracking/:requestId",getServiceRequestTracking)
router.post("/send-tracking-otp",sendTrackingOTP)
router.post("/verify-tracking-otp",verifyTrackingOTP)

export default router 