import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ERP } from "../models/erp.model.js";
import { Admin } from "../models/admin.model.js";
import { ServiceRequest } from "../models/serviceRequests.model.js";

export const erpLogin = async(req,res) => {
    const {email,password} = req.body

    const erp = await ERP.findOne({email})
    if(!erp) {
        return res.status(401).json({messgae:"Invalid credentials"})
    }

    const isMatch = await bcrypt.compare(password,erp.password)

    if(!isMatch){
        return res.status(401).json({messgae:"Invalid credentials"})
    }

    const token = jwt.sign(
        {id:erp._id,role:"erp"},
        process.env.ERP_JWT_SECRET,
        {expiresIn: "1d"}
    )

    res.cookie("erpToken",token, {
        httpOnly:true,
        sameSite: "none",
        secure: true
    })

    res.json({success: true})

};

export const createAdmin = async(req,res) => {
    const {email,password,city} = req.body

    if(!email || !password || !city) {
        return res.status(400).json({message:"Missing fields"})
    }

    const existingAdmin = await Admin.findOne({email})
    if(existingAdmin){
        return res.status(400).json({message:"Admin already exist"})
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const admin = await Admin.create({
        email,
        password: hashedPassword,
        city
    })

    res.status(201).json({
        success: true,
        message: "Admin created successfully",
        admin: {
          id: admin._id,
          email: admin.email,
          city: admin.city
        }
    })
}



export const checkErpSession = (req,res) => {
    res.status(200).json({ success: true })
}

export const erpLogout = (req,res) => {
    res.clearCookie("erpToken", {
  httpOnly: true,
  sameSite: "none",
  secure: true
});

    res.json({success:true})
}

export const getAllRequestsForERP = async(req,res) => {
    const {city,status} = req.query

    const filter = {}

    if(city){
        filter.city = city
    }

    if(status){
        filter.status = status;
    }

    const requests = await ServiceRequest.find(filter)
                    .sort({createdAt : -1 })

    res.status(200).json({
        success:true,
        count:requests.length,
        data: requests
    })
}


