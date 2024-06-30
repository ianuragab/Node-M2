// Otp mongoose model schema
const otpSchema = new mongoose.Schema(
  {
    otp: String,
    email: String,
    phone: Number,
  },
  { timestamps: true }
);
export const Otp = mongoose.model("otps", otpSchema);
