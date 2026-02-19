const express = require('express');
const taskRouter = express.Router();
const verifyToken = require("../middleware/authmiddleware");
const authorizeRoles = require("../middleware/authroles");
const {createTask,DeleteTask,ViewTask,UpdateTask,UpdateTaskStatus} = require("../controllers/TaskController");

taskRouter.get("/", (req, res) => {
  res.send("Task route is working");
}       
);

//all roles who can create task - Owner, Maintainer, Developer, Tester, Designer
taskRouter.post("/create-task",verifyToken,authorizeRoles("Owner","Maintainer","Developer","Tester"),createTask);

//delete task - only Owner and Maintainer can delete task
taskRouter.post("/delete-task/:taskId",verifyToken,authorizeRoles("Owner","Maintainer"),DeleteTask);

//view task - all roles can view task except Guest
taskRouter.get("/view-task/:taskId",verifyToken,authorizeRoles("Owner","Maintainer","Developer","Tester"),ViewTask);

//update task - only Owner and Maintainer can update task
taskRouter.post("/update-task/:taskId",verifyToken,authorizeRoles("Owner","Maintainer"), UpdateTask);

//update task by owner and Maintainer
taskRouter.post("/update-task-status/:taskId",verifyToken,authorizeRoles("Owner","Maintainer"),UpdateTaskStatus);

module.exports = taskRouter;