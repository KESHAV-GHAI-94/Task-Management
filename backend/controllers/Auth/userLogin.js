const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");
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
    if (!user.is_active) {
      return res.status(403).json({
        message: "Please verify your email before logging in",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );
    res.cookie("authToken", token, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
    });
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  }catch (err) {
  console.error("LOGIN ERROR:", err.message);
  console.error(err);

  res.status(500).json({
    message: err.message,
  });
}

};
module.exports = loginuser;
