import jwt from "jsonwebtoken";

export const verifyERP = (req,res,next) => {
    const token = req.cookies.erpToken

    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }

    try {
        const decoded = jwt.verify(token,process.env.ERP_JWT_SECRET);
        if(decoded.role !== "erp") throw new Error()

        req.erp = decoded;
        next()   
    } catch (error) {
        return res.status(401).json({message: "Unauthorized"})
    } 

};