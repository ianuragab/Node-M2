import { Router } from "express";
import { facultyController } from "../controller/facultyController.js";
import { verifyFaculty } from "../middleware/verifyFaculty.js";

const facultyRouter = Router();

facultyRouter.post("/signin", facultyController.signIn);
facultyRouter.put("/", verifyFaculty, facultyController.updateProfile);
facultyRouter.put("/:id", verifyFaculty, facultyController.approveStudent);

export default facultyRouter;
