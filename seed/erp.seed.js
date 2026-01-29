import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { ERP } from "../models/erp.model.js";

import connectDB from "../db/index.js";





dotenv.config()
await connectDB()
const seedERP = async() => {
    const hashed = await bcrypt.hash("12345678",10)

    await ERP.create({
        email: "erp@gmail.com",
        password:hashed
    })

    console.log("erppp SAVED")
    process.exit(1)
 
}

seedERP()

export default seedERP

