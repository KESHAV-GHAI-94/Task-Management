const { Op } = require("sequelize");
const Task = require("../../models/tasksModel");
const User = require("../../models/userModel");
const Comment = require("../../models/commentsModel");
const TaskAssignment = require("../../models/taskassignment");
const GetKanbanTasks = async (req, res) => {
  try {
    const groupId = req.group_id;
    const userId = req.user.id;
    console.log("Group ID:", groupId);
    console.log("User ID:", userId);
    const tasks = await Task.findAll({
      where: {
        group_id: groupId,
      },
      include: [
        {
          model: User,
          as: "assignedUsers",
          attributes: ["id", "name"],
          through: { attributes: [] },
          required: true, 
          where: {
            id: userId, 
          },
        },
      ],
      order: [["created_at", "DESC"]],
    });
    const grouped = {
      TODO: [],
      IN_PROGRESS: [],
      COMPLETED: [],
    };
    tasks.forEach((task) => {
      const statusMap = {
        todo: "TODO",
        in_progress: "IN_PROGRESS",
        completed: "COMPLETED",
      };
      const key = statusMap[task.status];
      if (key) {
        grouped[key].push(task);
      }
    });
    res.json(grouped);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const GetTaskDetails = async (req, res) => {
  try {

    const { taskId } = req.params;
    const task = await Task.findOne({
      where: {
        id: taskId
      },
      include: [
        {
          model: User,
          as: "assignedUsers",
          attributes: ["id", "name"],
          through: { attributes: [] }
        },
        {
          model: Comment,
          as: "comments",
          attributes: ["id", "comment", "created_at"],
          include: [
            {
              model: User,
              as: "user",
              attributes: ["id", "name"]
            }
          ]
        }
      ]
    });
    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
module.exports = { GetKanbanTasks,GetTaskDetails };