const express = require('express')
const commentRouter = express.Router();

commentRouter.get("/", (req, res) => {
  res.send("Comment route is working");
}); 

module.exports = commentRouter;