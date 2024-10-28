import app from "./app.js";
import {config} from "dotenv";
import dbConnect from "./data/dbConnect.js";

config({
    path: "./config.env"
})
dbConnect();
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})
