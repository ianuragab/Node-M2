import mongoose, { Schema } from "mongoose";
import { hashPass } from "../helper/bcryptPass.js";
import mongoosePaginate from "mongoose-paginate-v2";

const facultySchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    phone: Number,
    password: String,
    role: {
      type: String,
      enum: ["ADMIN", "FACULTY", "STUDENT"],
      default: "STUDENT",
    },
    status: {
      type: String,
      enum: ["ACTIVE", "PENDING", "BLOCKED", "DELETE"],
      default: "PENDING",
    },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: "departments",
    },
    department: String,
    course: String,
    isVerified: { type: Boolean, default: false },
    country: String,
    state: String,
    city: String,
    dialCode: Number,
    qr: String,
  },
  { timestamps: true }
);

facultySchema.plugin(mongoosePaginate);
export const Faculty = mongoose.model("faculty", facultySchema);

export const defaultAdmin = async () => {
  try {
    const admin = await Faculty.findOne({ role: "ADMIN" });

    if (admin) {
      return console.log("Default Admin already exists.");
    }

    const password = await hashPass("Mobiloitte@1");

    await Faculty.create({
      firstName: "Tony",
      lastName: "Stark",
      email: "tony@email.com",
      phone: 9758713900,
      password: password,
      role: "ADMIN",
      status: "ACTIVE",
      country: "India",
      state: "Uttar Pradesh",
      city: "Ghaizabad",
      dialCode: 91,
    });
  } catch (error) {
    return console.log("Error in Creating admin", error);
  }
};
