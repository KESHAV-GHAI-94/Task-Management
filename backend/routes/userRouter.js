const express = require('express');
const userRouter = express.Router();
const {signup,verifySignupOtp} = require("../controllers/Auth/userRegister");
const loginuser = require("../controllers/Auth/userLogin");
const {sendotpforget,checkforgetotp,changePassword} = require("../controllers/Auth/userForgetPassword");
const verifyToken = require("../middleware/authmiddleware");
const {createGroup,showGroups}  = require("../controllers/Group/CreateGroup");
const {addGroupMember,showGroupMembers,searchUsers, removeGroupMember} = require("../controllers/Group/GroupMember");
const {GetGroupTasks,GetMyTasks} = require("../controllers/Group/CreateGroup");
const {GetKanbanTasks,GetTaskDetails} = require("../controllers/page view/kanbanview");
const authorizeRoles = require("../middleware/authroles");

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

//logout
userRouter.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

//making group route
userRouter.post("/groups", verifyToken, createGroup);

//searching members for adding in a group
userRouter.get("/search",verifyToken,authorizeRoles("Owner"),searchUsers);

//adding group member route
userRouter.post("/groups/:groupId/members", verifyToken, addGroupMember);

//remove group members from goup :
userRouter.post("/groups/:groupId/members/:userId/remove",verifyToken,authorizeRoles("Owner"),removeGroupMember);

//show groups route
userRouter.get("/groups", verifyToken, showGroups);
//show group members route
userRouter.get("/groups/:groupId/members",verifyToken,showGroupMembers);
// SHOW TASk of all group
userRouter.post("/groups/:groupId/tasks", verifyToken,GetGroupTasks);
// show my tasks 
userRouter.post("/groups/tasks", verifyToken,GetMyTasks);
//kanban section view
userRouter.post("/groups/:groupId/kanbanSection",verifyToken,authorizeRoles("Owner", "Maintainer", "Developer", "Tester"),GetKanbanTasks);
//get task details
userRouter.post("/tasks/:taskId/details",verifyToken,authorizeRoles("Owner", "Maintainer", "Developer", "Tester"),GetTaskDetails);

module.exports = userRouter;