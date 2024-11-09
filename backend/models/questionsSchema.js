import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  userAnswer: { type: String, default: null },
});

const questionsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User model
  questions: { type: [questionSchema], required: true },
  createdAt: { type: Date, default: Date.now },
});

const Questions = mongoose.model("Questions", questionsSchema);

export default Questions;
