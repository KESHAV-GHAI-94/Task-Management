const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");
const { sendEmailotp } = require("../../utils/sendVerifyotp");

const loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required",
      });
    }
    const user = await User.findOne({
      where: { email: email },
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    if (!user.is_active) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
      
      await user.update({
        signup_otp: otp,
        signup_otp_expiry: otpExpiry
      });

      sendEmailotp(user.email, otp).catch(err => {
        console.error("Email error:", err.message);
      });

      return res.status(200).json({
        success: false,
        unverified: true,
        email: user.email,
        message: "Email not verified. A new OTP has been sent.",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err.message);
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = loginuser;
