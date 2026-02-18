const express = require("express");
const AdminRouter = express.Router();
const verifyToken = require("../middleware/authmiddleware");
const authorizeRoles = require("../middleware/authroles");
// const {assignrole, removeRole} = require("../controllers/Functionalitywise/Admincontrol");
const {createTask,DeleteTask,ViewTask,UpdateTask} = require("../controllers/TaskController");

// Admin routes for role management Change user role
// AdminRouter.post("/assign-role",verifyToken,authorizeRoles("Owner"),assignrole);
// AdminRouter.post("/remove-role",verifyToken,authorizeRoles("Owner"),removeRole);


//all roles who can create task - Owner, Maintainer, Developer, Tester, Designer
AdminRouter.post("/create-task",verifyToken,authorizeRoles("Owner","Maintainer","Developer","Tester"),createTask);

//delete task - only Owner and Maintainer can delete task
AdminRouter.post("/delete-task/:taskId",verifyToken,authorizeRoles("Owner","Maintainer"),DeleteTask);

//view task - all roles can view task except Guest
AdminRouter.get("/view-task/:taskId",verifyToken,authorizeRoles("Owner","Maintainer","Developer","Tester"),ViewTask);

//update task - only Owner and Maintainer can update task
AdminRouter.post("/update-task/:taskId",verifyToken,authorizeRoles("Owner","Maintainer"),UpdateTask);

module.exports = AdminRouter;