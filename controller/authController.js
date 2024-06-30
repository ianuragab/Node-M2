import { Faculty } from "../model/facultySchema.js";
import { Otp } from "../model/otpSchema.js";

const authController = {
  verifyOtp: async (req, res) => {
    try {
      const { otp, email } = req.body;
      const user = await Otp.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (user.otp !== otp) {
        return res.status(200).json({ message: "Invalid OTP" });
      }

      await Faculty.updateOne({ email }, { $set: { isVerified: true } });
      await Otp.deleteOne({ email: email });

      res.status(400).json({ message: "OTP verified" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  resendOtp: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await Faculty.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const otp = Math.floor(100000 + Math.random() * 900000);
      const subject = "OTP for email verification";
      const message = `Your OTP for email verification is ${otp}`;
      await sendMail(email, message, subject);

      await Otp.updateOne(
        { email: email },
        { email: email, otp: otp, phone: user.phone },
        { upsert: true }
      );
      res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default authController;
