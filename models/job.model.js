import mongoose, { mongo } from "mongoose";
import { ServiceRequest } from "./serviceRequests.model.js";

const jobSchema = new mongoose.Schema({
    jobId:{
       type:String,
       unique:true,
       required:true
    },
    serviceRequest:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ServiceRequest",
        required:true,
        unique:true
    },
    clientName:String,
    clientPhone:String,
    city:String,

    serviceName:String,
    
    engineerName:{
        type:String,
        requried:true
    },
    engineerPhone:{
        type:String,
        required:true
    },

    status:{
        type:String,
        enum:["open","closed"],
        default:"open"
    },
    
    closingOTP:String,
    closingOTPVerified:{
        type:Boolean,
        default:false
    }

},{timestamps:true})

export const Job = mongoose.model("Job",jobSchema)