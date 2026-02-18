const   Task = require("../../models/tasksModel");
const User = require("../../models/userModel");
const Group = require("../../models/groupmodel");
const GroupMember = require("../../models/groupmembersmodel");

const createGroup = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.id; 

    if (!name) {
      return res.status(400).json({
        message: "Group name is required",
      });
    }
    const group = await Group.create({
      name,
      created_by: userId,
    });

    await GroupMember.create({
      group_id: group.id,
      user_id: userId,
      role: "Owner",
    });
    res.status(201).json({
      message: "Group created successfully",
      groupId: group.id,
      role: "Owner",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

const showGroups = async (req, res) => {
  try {
    const userId = req.user.id;
    const memberships = await GroupMember.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Group,
          as: "group",
          attributes: ["id", "name"],
        },
      ],
    });
    const groups = memberships.map(m => ({
      id: m.group.id, 
      name: m.group.name,
      role: m.role,
    }));
    res.status(200).json({
      groups,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
};
const GetGroupTasks = async (req, res) => {
  try {
    const { groupId } = req.params;
    const userId = req.user.id;
    const membership = await GroupMember.findOne({
      where: {
        group_id: groupId,
        user_id: userId,
        },
    });
    if (!membership) {
        return res.status(403).json({
            message: "You are not a member of this group",
            });
    }
    const tasks = await Task.findAll({
      where: {
        group_id: groupId,
         },
        include: {
            model: User,
            as: "assignedUsers",
            attributes: ["id", "name", "email"],
            through: { attributes: [] },
        },
        });
    res.status(200).json({
      tasks,
     });
  } catch (err) {
    console.error(err);
    res.status(500).json({
        message: err.message,
        });
    }
};
const GetMyTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await Task.findAll({
      include: [
        {
          model: User,
          as: "assignedUsers",
          attributes: ["id", "name", "email"],
          through: { attributes: [] },
          where: { id: userId },
          include: [
            {
              model: GroupMember,
              as:"userMemberships",
              attributes: ["role"],
              where: { user_id: userId },
              required: false,
            }
          ]
        }
      ],
      attributes: [
        "id",
        "title",
        "description",
        "priority",
        "status",
        "group_id",
        "created_by",
      ]
    });
    res.status(200).json({
      tasks,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {createGroup ,GetGroupTasks,showGroups,GetMyTasks};
