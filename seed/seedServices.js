import { Services } from "../models/service.model.js";
import connectDB from "../db/index.js";
import dotenv from 'dotenv'




dotenv.config()
await connectDB()
dotenv.config({ path: "../.env" });
const services = [
  {
    name: "Cleaning",
    route: "cleaning",
    image: "/assets/cleaning.png",
    description: "Home, office and deep cleaning services.",
    availableLocations: ["Bhopal", "Indore", "Delhi"],
    isActive: true,
  },
  {
    name: "Repair",
    route: "repair",
    image: "/assets/repairing.png",
    description: "AC, fridge, washing machine repair.",
    availableLocations: ["Bhopal", "Indore"],
    isActive: true,
  },
  {
    name: "Sales & Manager",
    route: "manager",
    image: "/assets/Sales.png",
    description: "Sales executives and managers.",
    availableLocations: ["Bhopal", "Indore"],
    isActive: true,
  },
  {
    name: "Legal Consultant",
    route: "legal",
    image: "/assets/consultant.png",
    description: "Legal advice and documentation support.",
    availableLocations: ["Bhopal", "Delhi"],
    isActive: true,
  },
  {
    name: "Medical & Nursing",
    route: "medical",
    image: "/assets/medical.png",
    description: "Home nursing and medical assistance.",
    availableLocations: ["Bhopal", "Indore", "Pune"],
    isActive: true,
  },
  {
    name: "Cooking",
    route: "cooking",
    image: "/assets/cooking.png",
    description: "Home cooks and catering services.",
    availableLocations: ["Bhopal", "Indore"],
    isActive: true,
  },
  {
    name: "Beauty & Makeup",
    route: "beauty",
    image: "/assets/makeup.png",
    description: "Makeup artists and home salon services.",
    availableLocations: ["Bhopal", "Indore", "Delhi"],
    isActive: true,
  },
  {
    name: "Fitness",
    route: "fitness",
    image: "/assets/fitness.png",
    description: "Personal trainers and yoga coaching.",
    availableLocations: ["Bhopal", "Pune"],
    isActive: true,
  },
  {
    name: "Education",
    route: "education",
    image: "/assets/education.png",
    description: "Home tutors and exam preparation.",
    availableLocations: ["Bhopal", "Indore", "Delhi"],
    isActive: true,
  },
  {
    name: "Astrology",
    route: "astrology",
    image: "/assets/astrology.png",
    description: "Astrology and horoscope services.",
    availableLocations: ["Bhopal"],
    isActive: true,
  },
  {
    name: "Government Services",
    route: "govt",
    image: "/assets/government.png",
    description: "PAN, Aadhar and govt documentation.",
    availableLocations: ["Bhopal", "Indore"],
    isActive: true,
  },
  {
    name: "Photography",
    route: "photography",
    image: "/assets/photography.png",
    description: "Wedding and event photography.",
    availableLocations: ["Bhopal", "Indore", "Delhi"],
    isActive: true,
  },
  {
    name: "Agriculture",
    route: "agriculture",
    image: "/assets/agriculture.png",
    description: "Farm advisory and assistance.",
    availableLocations: ["Bhopal", "Rural Areas"],
    isActive: true,
  },
  {
    name: "Startup Help",
    route: "startup",
    image: "/assets/startup.png",
    description: "Startup mentorship and guidance.",
    availableLocations: ["Bhopal", "Delhi", "Pune"],
    isActive: true,
  },
  {
    name: "Pest Control",
    route: "pest-control",
    image: "/assets/pest.png",
    description: "Pest control services.",
    availableLocations: ["Bhopal", "Indore", "Delhi"],
    isActive: true,
  },
  {
    name: "Law & Order Consultant",
    route: "law-order",
    image: "/assets/law.jpeg",
    description: "Legal compliance and dispute handling.",
    availableLocations: ["Bhopal", "Delhi"],
    isActive: true,
  },
  {
    name: "Rail Yatra",
    route: "rail-yatra",
    image: "/assets/rail-yatra.png",
    description: "Railway ticket and travel support.",
    availableLocations: ["All India"],
    isActive: true,
  },
  {
    name: "Air Yatra",
    route: "air-yatra",
    image: "/assets/air.jpg",
    description: "Flight booking and air travel support.",
    availableLocations: ["All India"],
    isActive: true,
  },
  {
    name: "Banking & Finance",
    route: "banking-finance",
    image: "/assets/bank.jpg",
    description: "Loans and financial consultancy.",
    availableLocations: ["Bhopal", "Indore", "Delhi"],
    isActive: true,
  },
  {
    name: "Stock Market",
    route: "stock-market",
    image: "/assets/stock.avif",
    description: "Investment and trading guidance.",
    availableLocations: ["All India"],
    isActive: true,
  },
  {
    name: "Part Time Jobs",
    route: "part-time-job",
    image: "/assets/part-time.webp",
    description: "Freelance and part-time work.",
    availableLocations: ["Bhopal", "Indore", "Delhi", "Pune"],
    isActive: true,
  },
  {
    name: "Film & Documentary",
    route: "film-documentary",
    image: "/assets/film.jpeg",
    description: "Film and documentary production.",
    availableLocations: ["Mumbai", "Delhi", "Bhopal"],
    isActive: true,
  },
  {
    name: "Artificial Intelligence",
    route: "ai",
    image: "/assets/AI.webp",
    description: "AI and automation services.",
    availableLocations: ["All India"],
    isActive: true,
  },
  {
    name: "Editing",
    route: "editing",
    image: "/assets/editing.jpg",
    description: "Video and photo editing services.",
    availableLocations: ["All India"],
    isActive: true,
  },
  {
    name: "Coding & Development",
    route: "coding",
    image: "/assets/coding.png",
    description: "Website and software development.",
    availableLocations: ["All India"],
    isActive: true,
  }
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