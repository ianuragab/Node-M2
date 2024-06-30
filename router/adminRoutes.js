import { Router } from "express";
import { adminController } from "../controller/adminController.js";
import { facultyController } from "../controller/facultyController.js";

const adminRouter = Router();

// Routes for Admin to get Faculties and Students
adminRouter.get("/faculty", adminController.getFaculties);
adminRouter.get("/students", adminController.getStudents);
adminRouter.get("/user/:id", adminController.getUserById);

// Routes for Approving Student
adminRouter.put("/:id", facultyController.approveStudent);

// Routes for Department and Course
adminRouter.get("/dept", adminController.getDept);
adminRouter.post("/dept", adminController.createDept);
adminRouter.put("/dept/add-course", adminController.updateDept);
adminRouter.get("/course", adminController.getCourse);
adminRouter.post("/course", adminController.createCourse);

// Routes for Faculty CRUD
adminRouter.post("/create", adminController.createFaculty);
adminRouter.put("/update-role", adminController.updateFaculty);
adminRouter.put("/:id", adminController.deleteFaculty);

export default adminRouter;
