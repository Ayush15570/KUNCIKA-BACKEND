import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()

app.use(cors({
  origin: function (origin, callback) {
    const allowed = [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://frontend-user.vercel.app",
      "frontend-admin-s36m.vercel.app",
    ];
    if (!origin || allowed.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())



import serviceRouter from "./routes/service.router.js"
app.use("/kuncika/v1/service",serviceRouter)

import adminRouter from "./routes/admin.routes.js"
app.use("/kuncika/v1/admin",adminRouter)

import erpRouter from "./routes/erp.routes.js"
app.use("/kuncika/v1/erp",erpRouter)

export { app }