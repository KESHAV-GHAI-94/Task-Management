const express = require('express');
const userRouter = express.Router();
const {signup,verifySignupOtp} = require("../controllers/userRegister");
const loginuser = require("../controllers/userLogin");
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

module.exports = userRouter;