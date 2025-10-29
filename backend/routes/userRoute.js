import express from "express";
import { loginUser, userSignup } from "../controllers/userController.js";


const router = express.Router();

router.post("/",userSignup);
router.post("/login" , loginUser);

export default router;