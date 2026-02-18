const express = require('express');
const userRouter = express.Router();
const {signup,verifySignupOtp} = require("../controllers/Auth/userRegister");
const loginuser = require("../controllers/Auth/userLogin");
const {sendotpforget,checkforgetotp,changePassword} = require("../controllers/Auth/userForgetPassword");
const verifyToken = require("../middleware/authmiddleware");
const {createGroup,showGroups}  = require("../controllers/Group/CreateGroup");
const {addGroupMember,showGroupMembers} = require("../controllers/Group/AddGroupMember");
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
//making group route
userRouter.post("/groups", verifyToken, createGroup);
//adding group member route
userRouter.post("/groups/:groupId/members", verifyToken, addGroupMember);
//show groups route
userRouter.get("/groups", verifyToken, showGroups);
//show group members route
userRouter.get("/groups/:groupId/members",verifyToken,showGroupMembers);



module.exports = userRouter;