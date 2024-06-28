import dotenv from "dotenv";
import Express from "express";
import dbConnection from "./dbConnection/index.js";
import { defaultAdmin } from "./model/facultySchema.js";
import adminRouter from "./router/adminRoutes.js";
import facultyRouter from "./router/facultyRoutes.js";
import { verifyAdmin } from "./middleware/verifyFaculty.js";
import studentRouter from "./router/studentRoutes.js";
import { defaultStatic } from "./model/staticSchema.js";

const app = Express();

dotenv.config();

dbConnection(defaultAdmin().then(() => defaultStatic()));

app.use(Express.json());

app.use("/api/admin", verifyAdmin, adminRouter);
app.use("/api/faculty", facultyRouter);
app.use("/api/student", studentRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on  ${process.env.PORT || 5000}`);
});
