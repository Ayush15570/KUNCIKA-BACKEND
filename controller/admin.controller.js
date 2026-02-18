import { ServiceRequest } from "../models/serviceRequests.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Admin } from "../models/admin.model.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { verifyOTP1 } from "../utils/verifyOTP1.js";
import { Job } from "../models/job.model.js";
import { sendOTP } from "../utils/sendOTP.js";
import ExcelJS from "exceljs";


export const exportPendingJobsExcel = async (req, res) => {
    const adminCity = req.admin.city;
    const jobs = await Job.find({
        status: { $ne: "closed" }, city: adminCity,
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Pending Jobs");

    // Columns
    worksheet.columns = [
        { header: "Job ID", key: "jobId", width: 15 },
        { header: "Client Name", key: "clientName", width: 20 },
        { header: "Client Phone", key: "clientPhone", width: 18 },
        { header: "City", key: "city", width: 15 },
        { header: "Service", key: "serviceName", width: 25 },
        { header: "Engineer", key: "engineerName", width: 20 },
        { header: "Engineer Phone", key: "engineerPhone", width: 18 },
        { header: "Job Status", key: "status", width: 15 },
        {
            header: "Reason for not completed (Admin to fill)",
            key: "reason",
            width: 40
        }
    ];

    // Rows
    jobs.forEach(job => {
        worksheet.addRow({
            jobId: job.jobId,
            clientName: job.clientName,
            clientPhone: job.clientPhone,
            city: job.city,
            serviceName: job.serviceName,
            engineerName: job.engineerName,
            engineerPhone: job.engineerPhone,
            status: job.status,
            reason: "" // empty on purpose
        });
    });

    // Header styling
    worksheet.getRow(1).font = { bold: true };

    res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
        "Content-Disposition",
        "attachment; filename=pending_jobs_report.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();
};

export const adminLogin = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    const admin = await Admin.findOne({ email })

    if (!admin) return res.status(401).json({ message: "Invalid credentials" })

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" })

    const token = jwt.sign(
        { id: admin._id, role: "admin", city: admin.city },
        process.env.ADMIN_JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("adminToken", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,

    })

    res.json({ success: true })

})

export const getAllServiceRequests = asyncHandler(async (req, res) => {
    const city = req.admin.city


    const requests = await ServiceRequest.find({ city })

        .sort({ createdAt: -1 })

        .sort({ createdAt: -1 })

    return res.status(200).json(
        new ApiResponse(
            200,
            requests

        )
    )
})

export const checkAdminSession = (req, res) => {

    const token = req.cookies.adminToken

    if (!token) {
        return res.status(401).json({ message: "Not authenticated" })
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.ADMIN_JWT_SECRET
        );

        if (decoded.role !== "admin") {
            return res.status(403).json({ message: "Forbidden" })
        }

        return res.status(200).json({
            success: true,
            adminId: decoded.id
        })
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

export const adminLogout = (req, res) => {
    res.clearCookie("adminToken", {
        httpOnly: true,
        sameSite: "none",
        secure: true

    })

    res.json({ success: true })
}


export const verifyServiceRequestOTP = asyncHandler(async (req, res) => {
    const { requestId, otp } = req.body

    if (!requestId || !otp) {
        return res.status(400).json({ message: "Missing data" });
    }

    const request = await ServiceRequest.findById(requestId)

    if (!request) {
        return res.status(404).json({ message: "Request not found" })
    }

    if (request.otpVerified) {
        return res.status(400).json({ message: "Already verified" })
    }
    // if(request.verificationOTP !== otp){
    //   return res.status(400).json({message: "Invalid OTP"})
    //}

    const isValid = await verifyOTP1(request.verificationOTP, otp);

    if (!isValid) {
        return res.status(400).json({ message: "Invalid OTP" });
    }

    request.otpVerified = true
    request.status = "contacted"
    request.trackingStatus = "EXECUTIVE_CONTACTED";

    request.trackingHistory.push({
        status: "EXECUTIVE_CONTACTED"
    });

    request.verificationOTP = null

    await request.save()

    return res.status(200).json({
        success: true,
        message: "Request marked as completed"
    })
})
const generateJobId = () => {
    return Math.floor(100000 + Math.random() * 900000);
};

export const assignJob = async (req, res) => {
    const { requestId, engineerName, engineerPhone } = req.body
    if (!requestId || !engineerName || !engineerPhone) {

        return res.status(400).json({ message: "Missing fields" });
    }

    const request = await ServiceRequest.findById(requestId)

    if (!request || !request.otpVerified) {
        return res.status(400).json({ messsage: "Request not verified" })
    }

    const existingJob = await Job.findOne({ serviceRequest: requestId })

    if (existingJob) {
        console.log("Job ALREADYYY")
        return res.status(400).json({ message: "Job already assigned" })
    }

    const job = await Job.create({
        jobId: generateJobId(),

        serviceRequest: request._id,
        clientName: request.name,
        clientPhone: request.phoneNumber,
        city: request.city,

        serviceName: request.serviceName,

        engineerName,
        engineerPhone
    });
    request.jobAssigned = true;



request.trackingHistory.push({
    status: "JOB_ID_ASSIGNED"
});

request.trackingHistory.push({
    status: "ENGINEER_ASSIGNED"
});
request.trackingStatus = "ENGINEER_ASSIGNED";

await request.save();

    return res.status(200).json({
        success: true,
        message: "Job assigned",
        job
    })

}

export const sendJobClosingOTP = async (req, res) => {
    const { jobId } = req.params

    const job = await Job.findOne({ jobId })

    if (!job) {
        return res.status(404).json({ message: "Job not found" })
    }

    if (job.closingOTPVerified) {
        return res.status(400).json({ message: "Job already closed" })
    }

    const sessionId = await sendOTP(job.clientPhone)

    job.closingOTP = sessionId
    await job.save();

    return res.status(200).json({
        success: true,
        message: "Closing OTP sed to client"
    })
}

export const verifyOTP = async (req, res) => {
    const { jobId, otp } = req.body
    if (!otp || !jobId) {
        return res.status(400).json({ message: "Missing field" })
    }
    const job = await Job.findOne({ jobId })
    if (!job) {
        return res.status(400).json({ message: "Job not found" })
    }
    if (job.closingOTPVerified) {
        return res.status(400).json({ message: "Job already closed" })
    }

    const isValid = await verifyOTP1(job.closingOTP, otp)
    if (!isValid) {
        return res.status(400).json({ message: "Invalid OTP" })
    }

    job.closingOTPVerified = true
    job.status = "closed"
    const request = await ServiceRequest.findById(job.serviceRequest);

if (request) {
    request.trackingStatus = "JOB_DONE";

    request.trackingHistory.push({
        status: "JOB_DONE"
    });

    await request.save();
}

    job.closingOTP = null
    await job.save()

    return res.status(200).json({
        success: true,
        message: "Job completed"
    })

}

export const getJobByServiceRequest = async (req, res) => {
    const { serviceRequestId } = req.params

    const job = await Job.findOne({ serviceRequest: serviceRequestId })

    if (!job) {
        return res.status(404).json({ message: "Job not found" })
    }

    res.status(200).json({ success: true, job })
}

export const getJobByJobId = async (req, res) => {
    const { jobId } = req.params;

    const job = await Job.findOne({ jobId })
        .populate("serviceRequest");

    if (!job) {
        return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ success: true, job });
};
