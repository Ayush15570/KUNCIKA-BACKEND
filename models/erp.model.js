import mongoose, { mongo } from "mongoose";

const erpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        default:"erp"
    }
},{timestamps:true})


export const ERP = mongoose.model("ERP",erpSchema)