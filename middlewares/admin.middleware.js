import  jwt  from "jsonwebtoken";

export const verifyAdmin = (req,res,next) => {
    const token = req.cookies.adminToken;
      console.log("🟡 verifyAdmin HIT");
  console.log("TOKEN:", req.cookies.adminToken);
  console.log("SECRET:", process.env.ADMIN_JWT_SECRET);
    if(!token) return res.status(401).json({message : "unauthorized"})

    try {
        const decoded = jwt.verify(token,process.env.ADMIN_JWT_SECRET)
        if(decoded.role !== "admin") throw new Error()
        
        req.admin = decoded
        next()
    } catch (error) {
        console.log("🔴 JWT VERIFY FAILED", error.message);
        return res.status(401).json({message: "unauthorized"})
    }
}