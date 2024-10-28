import express from "express";
import {contactMe}  from "../controllers/contactMeController.js";
const router=express.Router();
router.get("/contactme",contactMe);
export default router;