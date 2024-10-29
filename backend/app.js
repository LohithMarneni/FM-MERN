import express from "express";
import userRouter from "./view/userRouter.js";
import contactMeRouter from "./view/contactMeRouter.js";
import { errorMiddleWare } from "./middleware.js/error.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin:[process.env.FRONTEND_URL],
        methods:["GET","POST","PUT","DELETE","PATCH"],
        credentials:true,
    }
))
app.use('/api/v1',contactMeRouter);
app.use('/api/v1/user',userRouter);
app.use(errorMiddleWare);
export default app;
