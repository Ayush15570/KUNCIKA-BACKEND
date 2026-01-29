import express from 'express'
import { createServiceRequest, getAllServices,getServiceByLocation } from '../controller/service.controller.js'
import { Router } from 'express'


const router = Router();


router.route("/").get(getAllServices)
router.route("/filter").get(getServiceByLocation)
router.route("/request-service").post(createServiceRequest)

export default router 