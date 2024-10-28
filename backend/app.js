import express from "express";
import userRouter from "./view/userRouter.js";
import contactMeRouter from "./view/contactMeRouter.js";
import { errorMiddleWare } from "./middleware.js/error.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1',contactMeRouter);
app.use('/api/v1/user',userRouter);
app.use(errorMiddleWare);
export default app;
