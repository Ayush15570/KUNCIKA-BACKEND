import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();


const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Mongob connected")
    } catch (error) {
        console.error("Mongodb connection failed:",error.message)
        console.log(error)
        process.exit(1)
    }

}

export default connectDB