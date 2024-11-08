import mongoose from "mongoose";

const questionsSchema = new mongoose.Schema({
    //fill the schema
});

const User=mongoose.model("questions",questionsSchema);

export default User;