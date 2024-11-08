import express from "express";
import {contactMe}  from "../controllers/contactMeController.js";
const router=express.Router();
router.get("/aboutFM",contactMe);
export default router;