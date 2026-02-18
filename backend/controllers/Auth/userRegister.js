const bcrypt = require("bcrypt");
const User = require("../../models/userModel");
const { sendEmailotp } = require("../../utils/sendVerifyotp");
const signup = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, password required",
      });
    }

    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    const user = await User.create({
      name,
      email,
      password_hash,
      phone,
      signup_otp: otp,
      signup_otp_expiry: otpExpiry,
      role: "Guest",
      is_verified: false,
      is_active: false,
    });
    await sendEmailotp(email, otp);
    res.status(201).json({
      success: true,
      message: "Signup successful. Verify OTP.",
      userId: user.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const verifySignupOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }
    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (user.is_active) {
      return res.status(400).json({
        success: false,
        message: "User already verified",
      });
    }
    if (new Date() > user.signup_otp_expiry) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }
    if (user.signup_otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }
    user.is_active = true;
    user.is_verified = true;
    user.signup_otp = null;
    user.signup_otp_expiry = null;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { signup, verifySignupOtp };
