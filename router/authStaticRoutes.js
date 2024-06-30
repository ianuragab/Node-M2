import { Router } from "express";
import authController from "../controller/authController.js";
import { staticController } from "../controller/staticController.js";

const authStatic = Router();

// Routes for OTP verification
authStatic.get("/verify", authController.verifyOtp);
authStatic.get("/resend", authController.resendOtp);

// Routes for static pages
authStatic.get("/static/about-us", staticController.getAboutUs);
authStatic.get("/static/faqs", staticController.getFaqs);
authStatic.get("/static/privacy-policy", staticController.getPrivacyPolicy);
authStatic.get("/static/terms-and-conditions", staticController.getTermsAndConditions);

authStatic.post("static/about-us", staticController.addAboutUs);
authStatic.post("static/faqs", staticController.addFaq);
authStatic.post("static/privacy-policy", staticController.addPrivacyPolicy);
authStatic.post("static/terms-and-conditions", staticController.addTermsAndConditions);

export default authStatic;
