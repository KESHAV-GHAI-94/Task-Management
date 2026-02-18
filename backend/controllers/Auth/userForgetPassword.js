const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const PasswordResetOtp = require("../../models/ForgetpassOtp");
const User = require("../../models/userModel");
const fgpass = require("../../utils/fgpass");
const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();
const sendotpforget = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    console.log("Received email for password reset:", email);
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({
        message: "Email not found",
      });
    }

    if (!user.is_active) {
      return res.status(403).json({
        message: "Email not registered",
      });
    }

    const otp = generateOtp();

    await PasswordResetOtp.destroy({
      where: { email },
    });

    await PasswordResetOtp.create({
      user_id: user.id,
      email: email,
      otp: otp,
      expires_at: new Date(Date.now() + 10 * 60 * 1000),
    });

    await fgpass(email, otp);

    res.status(200).json({
      message: "OTP sent to your email",
    });
    
  } catch (err) {
    console.error("LOGIN ERROR:", err.message);
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

const checkforgetotp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required",
      });
    }

    await PasswordResetOtp.destroy({
      where: {
        email,
        expires_at: {
          [Op.lt]: new Date(),
        },
      },
    });

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({
        message: "Email not found",
      });
    }

    if (!user.is_active) {
      return res.status(403).json({
        message: "User not active",
      });
    }

    const otpRecord = await PasswordResetOtp.findOne({
      where: {
        email,
        otp,
        is_used: false,
      },
    });

    if (!otpRecord) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }
    await otpRecord.update({
      is_used: true,
    });

    return res.status(200).json({
      message: "OTP verified successfully",
      user_id: user.id,
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err.message);
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};
const changePassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      return res
        .status(400)
        .json({ message: "Email and new password required" });
    }
    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (!user.is_active) {
      return res
        .status(403)
        .json({ message: "Account not verified. Cannot reset password." });
    }
    await PasswordResetOtp.destroy({
      where: {
        email,
        expires_at: {
          [Op.lt]: new Date(),
        },
      },
    });
    const otpRecord = await PasswordResetOtp.findOne({
      where: {
        email,
        is_used: true,
        expires_at: {
          [Op.gt]: new Date(),
        },
      },
      order: [["expires_at", "DESC"]],
    });

    if (!otpRecord) {
      return res.status(400).json({
        message: "Verify OTP first",
      });
    }
    const saltrounds = 10;
    const hashPassword = await bcrypt.hash(newPassword, saltrounds);
    await user.update({
      password_hash: hashPassword,
    });
    await PasswordResetOtp.destroy({
      where: {
        email,
        is_used: true,
      },
    });

    return res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message,
    });
  }
};
module.exports = { sendotpforget, checkforgetotp, changePassword };
