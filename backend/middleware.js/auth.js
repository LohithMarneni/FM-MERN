import jwt from "jsonwebtoken";
import User from "../models/userSchema.js"
export const isAuthenticated=async (req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Not Logged In",
        });
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
    req.user=await User.findById(decoded._id);
    next();
    }
    catch(e){
        return res.status(500).json({
            success:false,
            message:e.message,
        });
    }
}