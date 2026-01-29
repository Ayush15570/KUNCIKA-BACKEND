import { ServiceRequest } from "../models/serviceRequests.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Admin } from "../models/admin.model.js";
import bcrypt from 'bcryptjs'; 
import  jwt  from "jsonwebtoken";
export const adminLogin = asyncHandler(async(req,res) => {
    const {email,password} = req.body

    const admin = await Admin.findOne({email})
    if(!admin) return res.status(401).json({message:"Invalid credentials"})
    
    const isMatch = await bcrypt.compare(password, admin.password);
    if(!isMatch) return res.status(401).json({message:"Invalid credentials"})

    const token = jwt.sign(
        {id:admin._id, role:"admin",city:admin.city},
        process.env.ADMIN_JWT_SECRET,
        {expiresIn: "1d"}
    )

    res.cookie("adminToken",token,{
        httpOnly: true,
        sameSite:"strict",
        secure: false
    })

    res.json({success:true})

})

export const getAllServiceRequests = asyncHandler(async(req,res) => {
    const city = req.admin.city
    const requests = await ServiceRequest.find({city})
    .sort({createdAt:-1})
    
    .sort({ createdAt: -1 })

    return res.status(200).json(
        new ApiResponse(
            200,
            requests
            
        )
    )
})

export const checkAdminSession = (req,res) => {
    const token = req.cookies.adminToken

    if(!token) {
        return res.status(401).json({message : "Not authenticated"})
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.ADMIN_JWT_SECRET
        );

        if(decoded.role !== "admin"){
            return res.status(403).json({message:"Forbidden"})
        }

        return res.status(200).json({
            success:true,
            adminId: decoded.id
        })
    } catch (err) {
         return res.status(401).json({ message: "Invalid token" });
    }
}

export const adminLogout = (req,res) => {
    res.clearCookie("adminToken" , {
        httpOnly:true,
        sameSite: 'strict',
        secure: false
    })

    res.json({success : true})
}

export const verifyServiceRequestOTP = asyncHandler(async(req,res) => {
    const {requestId,otp} = req.body

    if(!requestId || !otp){
        return res.status(400).json({message: "Missing data"});
    }

    const request = await ServiceRequest.findById(requestId)

    if(!request) {
        return res.status(404).json({message: "Request not found"})
    }

    if(request.otpVerified){
        return res.status(400).json({message:"Already verified"})
    }
    if(request.verificationOTP !== otp){
        return res.status(400).json({message: "Invalid OTP"})
    }

    request.otpVerified = true
    request.status = "contacted";
    request.verificationOTP = null

    await request.save()

    return res.status(200).json({
        success:true,
        message:"Request marked as completed"
    })
})
