import jwt from "jsonwebtoken";
import { compPass, hashPass } from "../helper/bcryptPass.js";
import { Course } from "../model/courseSchema.js";
import { Faculty } from "../model/facultySchema.js";
import { State } from "country-state-city";

const otp = Math.floor(1000 + Math.random() * 9000);

export const studentController = {
  signUp: async (req, res) => {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      course,
      country,
      countryCode,
      state,
      city,
      dialCode,
    } = req.body;
    try {
      const user = await Faculty.findOne({ email: email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }
      const hash = await hashPass(password);
      // console.log(hash)
      const getStates = () => {
        try {
          return State.getStatesOfCountry(countryCode);
        } catch (error) {
          return "Error in getting State", error;
        }
      };

      const allStates = await getStates();

      // if (!allStates.find({ name: state })) {
      //   return res.status(400).json({ message: "State not found" });
      // }

      const dept = await Course.findOne({ name: course });

      const message = `Your OTP for verification is ${otp}`;
      const subject = "OTP for verification";
      sendEmail(email, message, subject);

      const qr = await QRCode.toDataURL(firstName, lastName, email, course)
      .then(url => {
        console.log(url)
      })
      .catch(err => {
        console.error(err)
      })

      const student = await Faculty.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        password: hash,
        course: course,
        departmentId: dept.deptId,
        country: country,
        state: state,
        city: city,
        dialCode: dialCode,
        qr: qr,
      });

      return res
        .status(200)
        .json({ message: "Student created successfully", student });
    } catch (error) {
      return res.status(500).json({ message: "Error in sign up", error });
    }
  },

  signIn: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await Faculty.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const pass = compPass(password, user.password);
      if (!pass) {
        return res.status(400).json({ message: "Invalid password" });
      }

      if (user.isVerified === false) {
        return res.status(400).json({ message: "User not verified" });
      }

      const payload = {
        id: user._id,
        email: user.email,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      return res.status(200).json({ message: "Sign in successful", token });
    } catch (error) {
      return res.status(500).json({ message: "Error in sign in", error });
    }
  },

  getProfile: async (req, res) => {
    try {
      const user = await Faculty.findOne({ _id: req.user.id });
      return res.status(200).json({ message: "User found", user });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error in getting profile", error });
    }
  },

  updateProfile: async (req, res) => {
    const { email,firstName, lastName, phone, country, state, city, dialCode } =
      req.body;
    try {
      const query = {$or: [{ email: email }, { phone: phone }]};
      const user = await Faculty.findOne(query);
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }
      await Faculty.findOneAndUpdate(
        { _id: req.user.id },
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
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

  deleteProfile: async (req, res) => {
    try {
      await Faculty.findOneAndUpdate(
        { _id: req.user.id },
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
};
