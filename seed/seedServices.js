import { Services } from "../models/service.model.js";
import connectDB from "../db/index.js";
import dotenv from 'dotenv'




dotenv.config()
await connectDB()

const services = [
  {
    name: "Cleaning",
    route: "cleaning",
    description: "Home, office and deep cleaning services.",
    availableLocations: ["Bhopal", "Indore", "Delhi"],
    isActive: true,
  },
  {
    name: "Repair",
    route: "repair",
    description: "AC, fridge, washing machine and home appliance repair.",
    availableLocations: ["Bhopal", "Indore"],
    isActive: true,
  },
  {
    name: "Sales & Manager",
    route: "manager",
    description: "Sales executives, managers and field work roles.",
    availableLocations: ["Bhopal", "Indore"],
    isActive: true,
  },
  {
    name: "Legal Consultant",
    route: "legal",
    description: "Legal advice, documents, property and court matters.",
    availableLocations: ["Bhopal", "Delhi"],
    isActive: true,
  },
  {
    name: "Medical & Nursing",
    route: "medical",
    description: "Nursing staff, ward boys, home care and medical support.",
    availableLocations: ["Bhopal", "Indore", "Pune"],
    isActive: true,
  },
  {
    name: "Cooking",
    route: "cooking",
    description: "Home cooks, chefs and catering services.",
    availableLocations: ["Bhopal", "Indore"],
    isActive: true,
  },
  {
    name: "Beauty & Makeup",
    route: "beauty",
    description: "Makeup artists, beauty services and home salon.",
    availableLocations: ["Bhopal", "Indore", "Delhi"],
    isActive: true,
  },
  {
    name: "Fitness",
    route: "fitness",
    description: "Personal trainers, yoga and fitness coaching.",
    availableLocations: ["Bhopal", "Pune"],
    isActive: true,
  },
  {
    name: "Education",
    route: "education",
    description: "Home tutors, competitive exam preparation and classes.",
    availableLocations: ["Bhopal", "Indore", "Delhi"],
    isActive: true,
  },
  {
    name: "Astrology",
    route: "astrology",
    description: "Astrologers, horoscope and kundli reading.",
    availableLocations: ["Bhopal"],
    isActive: true,
  },
  {
    name: "Government Services",
    route: "govt",
    description: "PAN, Aadhar, license, certificates and other govt form help.",
    availableLocations: ["Bhopal", "Indore"],
    isActive: true,
  },
  {
    name: "Photography",
    route: "photography",
    description: "Wedding, event, portfolio and product photography.",
    availableLocations: ["Bhopal", "Indore", "Delhi"],
    isActive: true,
  },
  {
    name: "Agriculture",
    route: "agriculture",
    description: "Farm advisory, tools and agriculture-based assistance.",
    availableLocations: ["Bhopal", "Rural Areas"],
    isActive: true,
  },
  {
    name: "Startup Help",
    route: "startup",
    description: "Startup guidance, mentorship and strategy building.",
    availableLocations: ["Bhopal", "Delhi", "Pune"],
    isActive: true,
  },
  {
  name: "Pest Control",
  route: "pest-control",
  description: "Pest control for homes, offices, termites, rodents and insects.",
  availableLocations: ["Bhopal", "Indore", "Delhi"],
  isActive: true,
},
{
  name: "Law & Order Consultant",
  route: "law-order",
  description: "Legal compliance, dispute handling, police and law advisory services.",
  availableLocations: ["Bhopal", "Delhi"],
  isActive: true,
},
{
  name: "Rail Yatra",
  route: "rail-yatra",
  description: "Railway ticket assistance, travel planning and rail journey support.",
  availableLocations: ["All India"],
  isActive: true,
},
{
  name: "Air Yatra",
  route: "air-yatra",
  description: "Flight booking, travel assistance and air journey support.",
  availableLocations: ["All India"],
  isActive: true,
},
{
  name: "Banking & Finance",
  route: "banking-finance",
  description: "Loans, insurance, account opening and financial consultancy.",
  availableLocations: ["Bhopal", "Indore", "Delhi"],
  isActive: true,
},
{
  name: "Stock Market",
  route: "stock-market",
  description: "Stock market advisory, trading guidance and investment support.",
  availableLocations: ["All India"],
  isActive: true,
},
{
  name: "Part Time Jobs",
  route: "part-time-job",
  description: "Part-time work opportunities, freelance and temporary jobs.",
  availableLocations: ["Bhopal", "Indore", "Delhi", "Pune"],
  isActive: true,
},
{
  name: "Film & Documentary",
  route: "film-documentary",
  description: "Film making, documentary production and media projects.",
  availableLocations: ["Mumbai", "Delhi", "Bhopal"],
  isActive: true,
},
{
  name: "Artificial Intelligence",
  route: "ai",
  description: "AI solutions, automation, ML models and AI consulting.",
  availableLocations: ["All India"],
  isActive: true,
},
{
  name: "Editing",
  route: "editing",
  description: "Video editing, photo editing and post-production services.",
  availableLocations: ["All India"],
  isActive: true,
},
{
  name: "Coding & Development",
  route: "coding",
  description: "Website, app development, software and coding services.",
  availableLocations: ["All India"],
  isActive: true,
},

  
];

const seedServices = async() => {
    try {
        await Services.deleteMany();
        await Services.insertMany(services)
        console.log("services seeded successfully")
        process.exit()
    } catch (error) {
        console.error("❌ Error seeding services:", error);
    process.exit(1)
    }
}
seedServices()