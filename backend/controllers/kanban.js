const Task  = require("../models/tasksModel");
const GetKanbanTasks = async (req, res) => {
    const groupId = req.params.groupId;
    console.log("Group ID for Kanban:", groupId);
  const tasks = await Task.findAll({
    where: {
      group_id: req.group_id
    },
    order: [["createdAt", "DESC"]]
  });
  const grouped = {
    TODO: [],
    IN_PROGRESS: [],
    IN_REVIEW: [],
    DONE: [],
    BLOCKED: []
  };
  tasks.forEach(task => {
    grouped[task.status].push(task);
  });
  res.json(grouped);
};
module.exports = {GetKanbanTasks};