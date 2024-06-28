import { Router } from "express";
import { studentController } from "../controller/studentController.js";
import { verifyStudent } from "../middleware/verifyFaculty.js";

const studentRouter = Router();

studentRouter.post("/signup", studentController.signUp);
studentRouter.post("/signin", studentController.signIn);
studentRouter.get("/profile", verifyStudent, studentController.getProfile);
studentRouter.put("/update-profile", verifyStudent, studentController.updateProfile);
studentRouter.put("/delete", verifyStudent, studentController.deleteProfile);

export default studentRouter;
