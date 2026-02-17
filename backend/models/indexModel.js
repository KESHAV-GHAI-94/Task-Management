const Task = require("./tasksModel");
const User = require("./userModel");
const TaskAssignment = require("./taskassignment");

Task.belongsToMany(User, {
  through: TaskAssignment,
  foreignKey: "task_id",
});

User.belongsToMany(Task, {
  through: TaskAssignment,
  foreignKey: "user_id",
});
