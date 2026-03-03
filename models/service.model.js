import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    
    description: {
      type: String,
      default: "",
    },
    availableLocations: {
      type: [String], // ["Bhopal", "Indore"]
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    route:{
      type: String,
      default:""
    },
    image:{
      type:String
    }

    
  },
  { timestamps: true }
);

export const Services = mongoose.model("Services",serviceSchema)
