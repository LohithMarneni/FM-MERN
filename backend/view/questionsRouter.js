import express from "express";
import {getQuestions,getSuggestions}  from "../controllers/questionsController.js";

const router=express.Router();
router.get("/get-questions",getQuestions);
router.post('/get-suggestions',getSuggestions);
export default router;