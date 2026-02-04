import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ERP } from "../models/erp.model.js";
import { Admin } from "../models/admin.model.js";
import { ServiceRequest } from "../models/serviceRequests.model.js";
import { Job } from "../models/job.model.js";
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
        httpOnly: true,
        sameSite:"strict",
        secure: false
    })

    res.json({success: true})

};

export const createAdmin = async(req,res) => {
    const {fullName,email,password,city} = req.body

    if(!fullName || !email || !password || !city) {
        return res.status(400).json({message:"Missing fields"})
    }

    const existingAdmin = await Admin.findOne({email})
    if(existingAdmin){
        return res.status(400).json({message:"Admin already exist"})
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const admin = await Admin.create({
        fullName,
        email,
        password: hashedPassword,
        city
    })

    res.status(201).json({
        success: true,
        message: "Admin created successfully",
        admin: {
          fullName:admin.fullName,
          id: admin._id,
          email: admin.email,
          city: admin.city
        }
    })
}

export const viewAdmins = async(req,res) => {
    const {email,city} = req.query
    const filter = {isActive:true}
    if(email){
        filter.email = { $regex: email, $options: "i" };
    }
    if(city){
        filter.city = { $regex: city, $options: "i" };
    }
    const  admins = await Admin.find(filter).select("-password").sort({createdAt:-1})
    
    if(!admins){
        return res.status(400).json({message: "no admins created"})
    }
    res.status(200).json({
        success:true,
        count: admins.length,
        admins

    })
}

export const deleteAdmin = async(req,res) => {
    const {adminId} = req.params

    const admin = await Admin.findById(adminId)

    if(!admin){
        return res.status(404).json({message: "admin not found"})
    }
    
   admin.isActive = false
   await admin.save()

    res.status(200).json({
        success:true,
        message:"admin deactivated"
    })
 
}


export const checkErpSession = (req,res) => {
    res.status(200).json({ success: true })
}

export const erpLogout = (req,res) => {
    res.clearCookie("erpToken", {
 httpOnly: true,
        sameSite:"strict",
        secure: false
});

    res.json({success:true})
}

export const getAllRequestsForERP = async (req, res) => {
  const { city, status } = req.query;

  const filter = {};
  if (city) filter.city = city;
  if (status) filter.status = status;

  // 1️⃣ Get all service requests
  const requests = await ServiceRequest.find(filter)
    .sort({ createdAt: -1 })
    .lean(); // IMPORTANT

  // 2️⃣ Get jobs linked to these requests
  const jobs = await Job.find({
    serviceRequest: { $in: requests.map(r => r._id) }
  }).lean();

  // 3️⃣ Create lookup map
  const jobMap = {};
  jobs.forEach(job => {
    jobMap[job.serviceRequest.toString()] = job;
  });

  // 4️⃣ Attach job to request
  const finalData = requests.map(req => ({
    ...req,
    job: jobMap[req._id.toString()] || null
  }));

  res.status(200).json({
    success: true,
    count: finalData.length,
    data: finalData
  });
};

export const getJobByJobId = async (req, res) => {
  const { jobId } = req.params;

  const job = await Job.findOne({ jobId })
    .populate("serviceRequest");

  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  res.status(200).json({ success: true, job });
};


