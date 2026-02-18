const Task = require("./tasksModel");
const User = require("./userModel");
const Group = require("./groupmodel");
const GroupMember = require("./groupmembersmodel");
const TaskAssignment = require("./taskassignment");
const Comment = require("./commentsModel");

Task.hasMany(Comment, {
  foreignKey: "task_id",
  as: "comments",
});

Comment.belongsTo(Task, {
  foreignKey: "task_id",
  as: "task",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
  as: "userComments",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
  as: "author",
});

Comment.hasMany(Comment, {
  foreignKey: "parent_comment_id",
  as: "replies",
});

Comment.belongsTo(Comment, {
  foreignKey: "parent_comment_id",
  as: "parent",
});
Task.belongsToMany(User, {
  through: TaskAssignment,
  foreignKey: "task_id",
  as: "assignedUsers",
});

User.belongsToMany(Task, {
  through: TaskAssignment,
  foreignKey: "user_id",
  as: "assignedTasks",
});

Group.belongsToMany(User, {
  through: GroupMember,
  foreignKey: "group_id",
  as: "members",
});

User.belongsToMany(Group, {
  through: GroupMember,
  foreignKey: "user_id",
  as: "groups",
});


GroupMember.belongsTo(Group, {
  foreignKey: "group_id",
  as: "group",
});

GroupMember.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

Group.hasMany(GroupMember, {
  foreignKey: "group_id",
  as: "groupMembers",
});

User.hasMany(GroupMember, {
  foreignKey: "user_id",
  as: "userMemberships",
});

Group.hasMany(Task, {
  foreignKey: "group_id",
  as: "tasks",
});

Task.belongsTo(Group, {
  foreignKey: "group_id",
  as: "group",
});

Task.belongsTo(User, {
  foreignKey: "created_by",
  as: "creator",
});
User.hasMany(Task, {
  foreignKey: "created_by",
  as: "createdTasks",
});