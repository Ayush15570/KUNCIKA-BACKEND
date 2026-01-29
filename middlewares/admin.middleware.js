import  jwt  from "jsonwebtoken";

export const verifyAdmin = (req,res,next) => {
    const token = req.cookies.adminToken;

    if(!token) return res.status(401).json({message : "unauthorized"})

    try {
        const decoded = jwt.verify(token,process.env.ADMIN_JWT_SECRET)
        if(decoded.role !== "admin") throw new Error()
        
        req.admin = decoded
        next()
    } catch (error) {
        return res.status(401).json({message: "unauthorized"})
    }
}