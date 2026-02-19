const Task = require("../models/tasksModel");
const Comment = require("../models/commentsModel");
const User = require("../models/userModel");
const TaskAssignment = require("../models/taskassignment");
const GroupMember= require("../models/groupmembersmodel");
//addcomment
const addComment = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user.id;
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }
    const assignment = await TaskAssignment.findOne({
      where: {
        task_id: taskId,
        user_id: userId
      }
    });
    if (!assignment) {
      return res.status(403).json({
        message: "Only assigned users can comment on this task"
      });
    }
    const newComment = await Comment.create({
      task_id: taskId,
      user_id: userId,
      comment: req.body.comment
    });
    res.status(201).json({
      message: "Comment added",
      comment: newComment
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
//check comments
const getTaskComments = async (req, res) => {
  try {

    const { taskId } = req.params;
    const userId = req.user.id;

    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const membership = await GroupMember.findOne({
      where: {
        group_id: task.group_id,
        user_id: userId,
      },
    });
    if (!membership) {
      return res.status(403).json({
        message: "You are not a member of this group",
      });
    }

    const comments = await Comment.findAll({
      where: {
        task_id: taskId,
        parent_comment_id: null,
      },
      attributes: ["id", "comment", "created_at"],
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "name"],
        },
        {
          model: Comment,
          as: "replies",
          attributes: ["id", "comment", "created_at"],
          include: [
            {
              model: User,
              as: "author",
              attributes: ["id", "name"],
            },
          ],
        },
      ],
      order: [["created_at", "DESC"]],
    });
    res.status(200).json({
      comments,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
//reply to comments
const replyToComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { comment } = req.body;
    const userId = req.user.id;
    const parentComment = await Comment.findByPk(commentId);
    if (!parentComment) {
      return res.status(404).json({
        message: "Parent comment not found",
      });
    }
    const reply = await Comment.create({
      task_id: parentComment.task_id,
      user_id: userId,
      comment,
      parent_comment_id: commentId,
    });
    res.status(201).json({
      message: "Reply added successfully",
      reply,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
//delete comments
const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;
    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({
        message: "Comment not found"
      });
    }
    if (comment.user_id !== userId) {
      return res.status(403).json({
        message: "You can delete only your comment"
      });
    }
    await comment.update({
      is_deleted: true
    });
    res.status(200).json({
      message: "Comment deleted successfully"
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};
//update comment
const updatecomment = async(req,res)=>{
  const {commentId}=req.params;
  const {comment}= req.body;
  const userId = req.user.id;
  if (!comment || comment.trim() === "") {
      return res.status(400).json({
        message: "Comment cannot be empty"
      });
    }
    const existingComment = await Comment.findByPk(commentId);
    
    if (!existingComment) {
      return res.status(404).json({
        message: "Comment not found"
      });
    }
    if(existingComment.is_deleted){
      return res.status(403).json({
        message:"cannot be update because you existing comment is temp deleted ."
      })
    }
    if (existingComment.user_id !== userId) {
      return res.status(403).json({
        message: "You can update only your own comment"
      });
    }

    const task = await Task.findByPk(existingComment.task_id);
    try{
    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }
    const membership = await GroupMember.findOne({
      where: {
        group_id: task.group_id,
        user_id: userId
      }
    });
    if (!membership) {
      return res.status(403).json({
        message: "You are not member of this group"
      });
    }

    await existingComment.update({
      comment: comment.trim()
    });
    res.status(200).json({
      message: "Comment updated successfully",
      commentId: existingComment.id
    });
}catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};
module.exports = { addComment,getTaskComments,replyToComment,deleteComment,updatecomment };