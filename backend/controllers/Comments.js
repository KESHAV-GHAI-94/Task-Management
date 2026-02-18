const Task = require("../models/tasksModel");
const Comment = require("../models/commentsModel");
const TaskAssignment = require("../models/taskassignment");

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




module.exports = { addComment };