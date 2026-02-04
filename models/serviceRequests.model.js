import mongoose from "mongoose";

const serviceRequestSchema = new mongoose.Schema(
  {
    name:{
      type:String,
      required : true
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    serviceName: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
   
    phoneNumber: {
      type: String,
      required: true,
    },
    verificationOTP:{
       
    },
    otpVerified: {
       type:Boolean,
       default:false,
    },
    status: {
      type: String,
      enum: ["pending", "contacted"],
      default: "pending",
    },
    jobAssigned:{
      type: Boolean,
      default:false
    }
  },
  { timestamps: true }
);

export const ServiceRequest = mongoose.model(
  "ServiceRequest",
  serviceRequestSchema
);
