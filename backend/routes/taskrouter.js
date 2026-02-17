const express = require('express');
const taskRouter = express.Router();

taskRouter.get("/", (req, res) => {
  res.send("Task route is working");
}       
);

module.exports = taskRouter;