import express from "express";
import { userRegister,userLogin,userLogout,userDetailsUpdate,getMe} from "../controllers/userController.js";
import  {isAuthenticated} from "../middleware.js/auth.js";
// userDetailsUpdate,userDelete,getUser
const router = express.Router();
router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/logout", isAuthenticated,userLogout);
router.patch("/update", isAuthenticated,userDetailsUpdate);
router.get("/getme",isAuthenticated,getMe)
export default router;