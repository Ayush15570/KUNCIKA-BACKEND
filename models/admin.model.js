import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"admin"
    },
    
    city: {
        type:String,
        required:true
    },

    isActive:{
        type:Boolean,
        default:true
    }
},{timestamps:true})

export const Admin =  mongoose.model("Admin",adminSchema)