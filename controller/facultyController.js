import { compPass } from "../helper/bcryptPass.js";
import { Faculty } from "../model/facultySchema.js";
import jwt from "jsonwebtoken";

export const facultyController = {
  signIn: async (req, res) => {
    try {
      const user = await Faculty.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({ message: "USer not found!" });
      }
      // console.log(user)

      const compare = compPass(req.body.password, user.password);
      if (!compare) {
        return res.status(401).json({ message: "Password incorrect" });
      }

      const payload = {
        id: user._id,
        email: user.email,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      return res
        .status(200)
        .json({ message: "Sign successfully", token: token });
    } catch (error) {
      return res.status(500).json({ message: "Error in signin", error });
    }
  },

  updateProfile: async (req, res) => {
    try {
      await Faculty.findOneAndUpdate(
        { _id: req.user.id },
        {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phone: req.body.phone,
          country: req.body.country,
          state: req.body.state,
          city: req.body.city,
          dialCode: req.body.dialCode,
        }
      );

      return res.status(200).json({ message: "Updation completed" });
    } catch (error) {
      return res.status(500).json({ message: "Error in updating", error });
    }
  },

  approveStudent: async (req, res) => {
    try {
      const user = await Faculty.findOne({ _id: req.params.id });
      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }

      await user.updateOne({
        status: "ACTIVE",
      });

      return res.status(200).json({ message: "Approved", Status: user.status });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error in student approving", error });
    }
  },
};
