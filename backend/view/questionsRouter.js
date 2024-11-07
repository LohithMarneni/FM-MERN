import express from "express";
import {getQuestions,getSuggestions}  from "../controllers/questionsController.js";
import {isAuthenticated} from "../middleware.js/auth.js";
const router=express.Router();
router.get("/get-questions",isAuthenticated,getQuestions);
router.post('/get-suggestions',isAuthenticated,getSuggestions);
export default router;