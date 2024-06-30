import { hashPass } from "../helper/bcryptPass.js";
import { generatePassword } from "../helper/generatePassword.js";
import { sendEmail } from "../helper/transporter.js";
import { Course } from "../model/courseSchema.js";
import { Department } from "../model/departmentSchema.js";
import { Faculty } from "../model/facultySchema.js";
import NodeCache from "node-cache";

// TODO: Need to check this line of code
// query.$or = [
//   { lastName: { $regex: req.body.search, $options: "i" } },
//   { email: { $regex: req.body.search, $options: "i" } },
// ];
export const adminController = {
  getFaculties: async (req, res) => {
    let query = { firstName: { $regex: req.body.search || "", $options: "i" } };
    const options = {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 8,
    };
    try {
      const users = await Faculty.find({ role: "FACULTY" });

      if (!users) {
        return res.status(404).json({ message: "Faculties not found!" });
      }

      const result = await Faculty.paginate(query, options);
      return res.status(200).json({ Faculties: result });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error in getting faculties", error });
    }
  },

  getStudents: async (req, res) => {
    let query = { firstName: { $regex: req.body.search || "", $options: "i" } };
    const options = {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 8,
    };
    try {
      let users;
      if (NodeCache.has("faculty")) {
        users = JSON.parse(NodeCache.get("faculty"));
      } else {
        users = await Faculty.find();
        NodeCache.setMaxListeners("faculty", JSON.stringify("faculty"));
      }
      const students = await users.find({ role: "STUDENT" }).populate(
        "departmentId"
      );

      if (!students) {
        return res.status(404).json({ message: "Students not found!" });
      }

      const result = await Faculty.paginate(query, options);

      return res.status(200).json({ Students: students });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error in getting faculties", error });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await Faculty.find({ _id: req.params.id });

      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }

      return res.status(200).json({ User: user });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error in getting faculties", error });
    }
  },

  getDept: async (req, res) => {
    let query = { name: { $regex: req.body.search || "", $options: "i" } };
    const options = {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 8,
    };
    try {
      const dept = await Department.find().populate("courses");
      if (!dept) {
        return res.status(404).json({ message: "Dept not found!" });
      }
      const result = await Department.paginate(query, options);

      return res.status(200).json({ Dept: dept });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error in getting department", error });
    }
  },

  createDept: async (req, res) => {
    try {
      const dept = await Department.findOne({ deptName: req.body.deptName });
      if (dept) {
        return res
          .status(400)
          .json({ message: "Department is already created." });
      }
      const deptjsdfg = await Department.create({
        name: req.body.name,
      });

      return res
        .status(200)
        .json({ message: "Department is created", Dept: deptjsdfg });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error in creating Department", error });
    }
  },

  updateDept: async (req, res) => {
    try {
      const dept = await Department.findOne({ name: req.body.name });

      if (!dept) {
        return res.status(404).json({ message: "Department not found!" });
      }

      dept.course.push(req.body.course);

      await Department.updateOne(
        { name: req.body.name },
        { course: dept.course }
      );

      return res.status(200).json({ message: "Updation complete." });
    } catch (error) {
      return res.status(500).json({ message: "Error in updating Department" });
    }
  },

  getCourse: async (req, res) => {
    const query = { name: { $regex: req.body.search || "", $options: "i" } };
    const options = {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 8,
    };
    try {
      const courses = await Course.find().populate("deptId");
      if (!courses) {
        return res.status(404).json({ message: "Courses not found!" });
      }

      const result = await Course.paginate(query, options);
      return res.status(200).json({ message: "Success", Courses: courses });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error in getting Courses", error });
    }
  },

  createCourse: async (req, res) => {
    try {
      const course = await Course.findOne({ name: req.body.name });
      if (course) {
        return res.status(400).json({ message: "Course is already created." });
      }
      const courseasd = await Course.create({
        name: req.body.name,
        deptId: req.body.dept,
      });

      return res
        .status(200)
        .json({ message: "Course is created", Course: courseasd });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error in creating Department", error });
    }
  },

  updateProfile: async (req, res) => {
    const { firstName, lastName, phone, country, state, city, dialCode } =
      req.body;
    try {
      await Faculty.findOneAndUpdate(
        { _id: req.user.id },
        {
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          country: country,
          state: state,
          city: city,
          dialCode: dialCode,
        },
        { upsert: true }
      );

      return res.status(200).json({ message: "updation seccess." });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error in updating profile", error });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const hash = hashPass(req.body.password);
      await Faculty.findOneAndUpdate({ _id: req.user.id }, { password: hash });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error in reseting password", error });
    }
  },

  createFaculty: async (req, res) => {
    try {
      const user = await Faculty.findOne({ email: req.body.email });

      if (user) {
        return res.status(400).json({ message: "Email is already exists." });
      }

      const password = generatePassword(10);
      const message = `Your password for login is ${password}`;

      const subject = "Password for Signin as Faculty";

      sendEmail(req.body.email, message, subject);

      const hash = await hashPass(password);

      const result = await Faculty.create({
        email: req.body.email,
        role: "FACULTY",
        status: "ACTIVE",
        password: hash,
        department: req.body.department,
      });

      return res.status(200).json({ message: "Faculty created" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error in creating faculty", error: error });
    }
  },

  deleteFaculty: async (req, res) => {
    try {
      await Faculty.findOneAndUpdate(
        { _id: req.params.id },
        {
          status: "DELETE",
        }
      );

      return res.status(200).json({ message: "User deleted..." });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error in Deleting faculty", error });
    }
  },

  updateFaculty: async (req, res) => {
    try {
      await Faculty.findOneAndUpdate(
        { email: req.body.email },
        {
          role: req.body.role,
        }
      );
      return res.status(200).json({ message: "Role updated..." });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error in Updating faculty role" });
    }
  },
};
