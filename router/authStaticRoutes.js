import { Router } from "express";
import authController from "../controller/authController.js";
import { staticController } from "../controller/staticController.js";

const authStatic = Router();

authStatic.get("/verify", authController.verifyOtp);
authStatic.get("/resend", authController.resendOtp);

authStatic.get("/static/about-us", staticController.getAboutUs);

export default authStatic;
