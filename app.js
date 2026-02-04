import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()

app.use(cors({
    origin:"https://frontend-user-wxyu.vercel.app",
    credentials: true
}))

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