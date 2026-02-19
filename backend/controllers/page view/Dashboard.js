const User = require("../../models/userModel")
const Task = require("../../models/tasksModel")

const dashboard = async (req, res) => {
  try {

    const userId = req.user.id;
    const totalAssigned = await Task.count({
      include: {
        model: User,
        as: "assignedUsers",
        where: { id: userId },
        attributes: [],
        through: { attributes: [] }
      }
    });
    const todo = await Task.count({
      where: { status: "todo" },
      include: {
        model: User,
        as: "assignedUsers",
        where: { id: userId },
        attributes: []
      }
    });
    const inProgress = await Task.count({
      where: { status: "in_progress" },
      include: {
        model: User,
        as: "assignedUsers",
        where: { id: userId },
        attributes: []
      }
    });
    const completed = await Task.count({
      where: { status: "completed" },
      include: {
        model: User,
        as: "assignedUsers",
        where: { id: userId },
        attributes: []
      }
    });
    res.json({
      totalAssigned,
      todo,
      inProgress,
      completed
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

module.exports = {dashboard};