import jwt from "jsonwebtoken";
import { Faculty } from "../model/facultySchema.js";

export const verifyFaculty = async (req, res, next) => {
  const authToken = req.headers.authorization;

  try {
    if (!authToken) {
      return res.status(404).json({ message: "Token not found!" });
    }

    const decode = jwt.verify(authToken, process.env.JWT_SECRET);
    // console.log(decode);

    const user = await Faculty.findOne({ _id: decode.id });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (user.status === "BLOCKED") {
      return res.status(401).json({ message: "Status is Blocked" });
    }

    if (user.status === "DELETE") {
      return res.status(401).json({ message: "Status is Blocked" });
    }

    if (user.role !== "FACULTY") {
      return res.status(401).json({ message: "Your is not a faculty" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Error at verify faculty", error });
  }
};

export const verifyAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  try {
    if (!authHeader) {
      return res.status(404).json({ message: "Token is not found" });
    }

    const decode = jwt.verify(authHeader, process.env.JWT_SECRET);

    const admin = await Faculty.findOne({ _id: decode.id });
    if (!admin) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (admin.status === "BLOCKED") {
      return res.status(401).json({ message: "Status is Blocked" });
    }

    if (admin.status === "DELETE") {
      return res.status(401).json({ message: "Status is Blocked" });
    }

    if (admin.role !== "ADMIN") {
      return res.status(401).json({ message: "Your is not a Admin" });
    }

    req.user = admin;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Error in verifying admin", error });
  }
};

export const verifyStudent = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  try {
    if (!authHeader) {
      return res.status(404).json({ message: "Token is not found" });
    }

    const decode = jwt.verify(authHeader, process.env.JWT_SECRET);

    const student = await Faculty.findOne({ _id: decode.id });
    if (!student) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (student.status === "BLOCKED") {
      return res.status(401).json({ message: "Status is Blocked" });
    }
    if (student.status === "DELETE") {
      return res.status(401).json({ message: "Status is Blocked" });
    }

    if (student.isVerified === false) {
      return res.status(401).json({ message: "Your account is not verified" });
    }

    req.user = student;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Error in verifying admin", error });
  }
};
