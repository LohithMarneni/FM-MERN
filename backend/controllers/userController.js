import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import errorHandler, { sendCookie } from "../utils/feature.js";
const JWT_SECRET = process.env.JWT_SECRET;
export const userRegister=async (req, res,next)=>{
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    
    try {
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return next(new errorHandler("User already Exist", 409));
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user=await User.create({
            username,email,password:hashedPassword
        });
        sendCookie(user, res, "Registered Successfully", 201);
    }
    catch(e){
        next(e);
    }
}
export const userLogin=async (req, res,next)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({message:"All fields are required"});
    }
    try{
        const user=await User.findOne({email}).select("+password");
        if(!user){
            return next(new errorHandler("User not Exist", 401));
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return next(new errorHandler("Invalid Credentials", 401));
        }
        sendCookie(user, res, "Login Successfully", 200);
    }
    catch(e){
        next(e);
    }
}
export const userLogout=async(req,res)=>{
    res.status(200).cookie("token","",{
        httpOnly:true,
        maxAge:new Date(Date.now()),
        sameSite:process.env.NODE_ENV==="Development"?"lax":"none",
        secure:process.env.NODE_ENV==="Development"?false:true,
   }).json({
       success:true,
       message:"Logged Out Succesfully",
   });
}
export const userDetailsUpdate=async(req,res)=>{
    const {username,email,password}=req.body;
    try{
        const updates={};
        if(username) updates.username=username;
        if(email) updates.email=email;
        if(password) updates.password=await bcrypt.hash(password,10);
        const user=await User.findByIdAndUpdate(req.user._id,updates,{new:true,runValidators: true});
        sendCookie(user, res, "Updated Successfully", 200);
    }
    catch(e){
        next(e);
    }
}
export const getMe=async(req,res)=>{
    res.status(200).json({
        success:true,
        user:req.user,
    });
}
