const express = require('express');
const taskRouter = express.Router();
const { createTask } = require("../controllers/TaskController");
const verifyToken = require("../middleware/authmiddleware");
const upload = require("../middleware/uploadTaskimage");
taskRouter.get("/", (req, res) => {
  res.send("Task route is working");
}       
);
//create task 
taskRouter.post("/create",verifyToken,upload.single("image"),createTask);


module.exports = taskRouter;