import mongoose from "mongoose";
import dotenv from 'dotenv'
import bcrypt from "bcryptjs";
import { Admin } from "../models/admin.model.js";
import connectDB from "../db/index.js";
dotenv.config()
await connectDB()

const seedAdmin = async() => {
    try {
        

        const hashedPassword = await bcrypt.hash("Admin123",10)
         await Admin.deleteMany();
        await Admin.create({
            fullName:"Arpit",
            email:"admin@gmail.com",
            password: hashedPassword,
            role: 'admin',
            city: 'Bhopal',
            
            },
            {
            fullName:"Aryan",
            email:"admin1@gmail.com",
            password: hashedPassword,
            role: 'admin',
            city: 'Pune' 
            }
    )
        console.log("✅ Admin seeded successfully");
        console.log("📧 Email: admin@kuncika.com");
        console.log("🔑 Password: Admin@123");
        process.exit(0)
    } catch (error) {
        console.error("❌ Seeding failed:", error);
        process.exit(1);  
    }
}

seedAdmin()