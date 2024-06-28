import { Router } from "express";
import { adminController } from "../controller/adminController.js";

const adminRouter = Router();

adminRouter.get("/faculty", adminController.getFaculties);
adminRouter.get("/students", adminController.getStudents);
adminRouter.get("/user/:id", adminController.getUserById);

adminRouter.get("/dept", adminController.getDept);
adminRouter.post("/dept", adminController.createDept);
adminRouter.put("/dept/add-course", adminController.updateDept);
adminRouter.get("/course", adminController.getCourse)
adminRouter.post("/course", adminController.createCourse);

adminRouter.post("/create", adminController.createFaculty);
adminRouter.put("/:id", adminController.deleteFaculty);
adminRouter.put("/update-role", adminController.updateFaculty);

export default adminRouter;
