const express = require('express')
const commentRouter = express.Router();
const verifyToken = require("../middleware/authmiddleware")
const {addComment,getTaskComments,replyToComment, deleteComment, updatecomment} = require("../controllers/Comments")
commentRouter.get("/", (req, res) => {
  res.send("Comment route is working");
}); 

//add comment in the task 
commentRouter.post("/:taskId/addcomment",verifyToken,addComment);

//check comments in the task 
commentRouter.post("/:taskId/comments",verifyToken,getTaskComments);

//reply to the comment 
commentRouter.post("/:commentId/reply",verifyToken,replyToComment);

//delete comment:
commentRouter.post("/:commentId/delete",verifyToken,deleteComment);

//update comment:
commentRouter.post("/:commentId/update",verifyToken,updatecomment)

module.exports = commentRouter;