const express = require('express');
const userRouter = express.Router();
const {signup,verifySignupOtp} = require("../controllers/Auth/userRegister");
const loginuser = require("../controllers/Auth/userLogin");
const {sendotpforget,checkforgetotp,changePassword} = require("../controllers/Auth/userForgetPassword");
userRouter.get("/", (req, res) => {
  res.send("User route is working");
});
//signup route
userRouter.get("/register", (req, res) => {
    res.send("User registration route is working");
});
userRouter.post("/register",signup );
userRouter.post("/verify-otp", verifySignupOtp);

//login route
userRouter.get("/login", (req, res) => {
    res.send("User login route is working");
});
userRouter.post("/login",loginuser);

//forget password route
userRouter.post("/forget-password",sendotpforget);
userRouter.post("/check-forget-otp",checkforgetotp);
userRouter.post("/change-password",changePassword);

userRouter.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});
module.exports = userRouter;