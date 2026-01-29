import { Services } from "../models/service.model.js";
import { ServiceRequest } from "../models/serviceRequests.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const getAllServices = async(req,res) => {
    try {
        const services = await Services.find({isActive:true});

        res.status(200).json({
            success:true,
            count:services.length,
            services
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Error fetching all services",
            error:error.message,
        })
    }
}


export const getServiceByLocation = async(req,res) => {
    try {
        const {location} = req.query;
        if(!location){
            return res.status(400).json({
                success:false,
                message:"Locatioin is required"
            })

        }
        const services = await Services.find({
            isActive:true,
            availableLocations:location
        })

        res.status(200).json({
            success:true,
            count:services.length,
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


const generateOTP = () => 
    Math.floor(100000 + Math.random() * 900000).toString();

export const createServiceRequest = asyncHandler(async(req,res) => {
    const {name,serviceId,phoneNumber,city} = req.body;
   //const city = req.cookies.location
   
    if( !city || !name  || !serviceId  || !phoneNumber){
        throw new ApiError(400,"req fields missing")
    }
    const otp = generateOTP()
    const service = await Services.findById(serviceId);
const serviceName = service?.name;

    
    const request = await ServiceRequest.create({
        name,
        serviceId,
        serviceName,
        phoneNumber,
        city,
        verificationOTP:otp,
    })

    console.log("OTP SENT TO USER:", otp)
    return res
    .status(201)
    .json(new ApiResponse(201,request,"Request submitted"))
})