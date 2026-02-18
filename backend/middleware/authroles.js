const GroupMember = require("../models/groupmembersmodel");
const Task = require("../models/tasksModel");

const authorizeRoles = (...allowedRoles) => {

  return async (req, res, next) => {
    try {
      let group_id;
      if (req.body && req.body.group_id) {
        group_id = req.body.group_id;
      }
      else if (req.params.groupId) {
        group_id = req.params.groupId;
      }
      else if (req.params.taskId) {
        const task = await Task.findByPk(req.params.taskId);
        if (!task) {
          return res.status(404).json({
            message: "Task not found",
          });
        }
        group_id = task.group_id;
      }
      else if (req.group_id) {
        group_id = req.group_id;
      }
      else {
        return res.status(400).json({
          message: "Group ID not found",
        });
      }
      const member = await GroupMember.findOne({
        where: {
          group_id,
          user_id: req.user.id,
        },
        attributes: ["role"],
      });
      if (!member) {
        return res.status(403).json({
          message: "You are not a member of this group",
        });
      }
      if (!allowedRoles.includes(member.role)) {
        return res.status(403).json({
          message: `Access denied. Required role: ${allowedRoles.join(", ")}`,
        });
      }
      req.group_id = group_id;
      req.groupRole = member.role;
      next();
    } catch (err) {
      console.error("AuthorizeRoles Error:", err);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  };
};
module.exports = authorizeRoles;
