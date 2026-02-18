import { Services } from "../models/service.model.js";
import { ServiceRequest } from "../models/serviceRequests.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const getAllServices = async (req, res) => {
    try {
        const services = await Services.find({ isActive: true });

        res.status(200).json({
            success: true,
            count: services.length,
            services
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching all services",
            error: error.message,
        })
    }
}


export const getServiceByLocation = async (req, res) => {
    try {
        const { location } = req.query;
        if (!location) {
            return res.status(400).json({
                success: false,
                message: "Locatioin is required"
            })

        }
        const services = await Services.find({
            isActive: true,
            availableLocations: location
        })

        res.status(200).json({
            success: true,
            count: services.length,
            services
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error filtering services",
            error: error.message,

        })
    }
}

import { sendOTP } from "../utils/sendOTP.js";
import { verifyOTP1 } from "../utils/verifyOTP1.js";

//const generateOTP = () => 
//  //Math.floor(100000 + Math.random() * 900000).toString();

export const createServiceRequest = asyncHandler(async (req, res) => {
    console.log("REQ BODY:", req.body);

    const { name, serviceId, phoneNumber, city } = req.body;
    //const city = req.cookies.location

    if (!city || !name || !serviceId || !phoneNumber) {
        throw new ApiError(400, "req fields missing")
    }
    //const otp = generateOTP()
    const service = await Services.findById(serviceId);
    const serviceName = service?.name;
    const sessionId = await sendOTP(phoneNumber);

    const request = await ServiceRequest.create({
        name,
        serviceId,
        serviceName,
        phoneNumber,
        city,
        verificationOTP: sessionId,

        trackingStatus: "REQUEST_SUBMITTED",

        trackingHistory: [
            { status: "REQUEST_SUBMITTED" }
        ]
    })



    return res
        .status(201)
        .json(new ApiResponse(201, request, "Request submitted"))
})

export const getServiceRequestTracking = asyncHandler(async(req,res)=> {
    const {requestId} = req.params;

    if(!requestId){
        return res.status(400).json({message:"Request ID is req"})
    }

    const request = await ServiceRequest.findById(requestId)

    if(!request){
        return res.status(404).json({message:"Req not found"})
    }

    return res.status(200).json({
        success:true,
        trackingStatus:request.trackingStatus,
        trackingHistory:request.trackingHistory,
        adminStatus:request.status,
        jobAssigned:request.jobAssigned
    })
})

const trackingOtpStore = new Map();


export const sendTrackingOTP = asyncHandler(async(req,res)=> {
    const {phoneNumber} = req.body;

    if(!phoneNumber){
        return res.status(400).json({message:"Phone Number is req"})
    }

    const existingRequests = await ServiceRequest.find({phoneNumber})

    if(!existingRequests){
        return res.status(404).json({message:"No req found"})
    }

    const sessionId = await sendOTP(phoneNumber)

    trackingOtpStore.set(phoneNumber,sessionId)

    return res.status(200).json({
        success:true,
        message:"Tracking OTP sent"
    })


})

export const verifyTrackingOTP = asyncHandler(async(req,res)=>{
    const {phoneNumber,otp} = req.body

    if(!phoneNumber || !otp){
        return res.status(400).json({message:"Missing fields"})
    }

    const sessionId = trackingOtpStore.get(phoneNumber)

    if(!sessionId){
        return res.status(400).json({message:"OTP not requested or expired"})
    }

    const isValid = await verifyOTP1(sessionId,otp)

    if(!isValid){
        return res.status(400).json({message:"Invalid OTP"})
    }

    trackingOtpStore.delete(phoneNumber)

    const requests = await ServiceRequest.find({phoneNumber})
                     .sort({createdAt:-1})
                     .select("serviceName city trackingStatus createdAt")
    
    return res.status(200).json({
        success:true,
        requests
    })


})