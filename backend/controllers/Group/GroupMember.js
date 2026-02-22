const { Op } = require("sequelize");
const GroupMember = require("../../models/groupmembersmodel");
const User = require("../../models/userModel");
const Group = require("../../models/groupmodel");

const searchUsers = async (req, res) => {
  try {
    const { query} = req.query;
    const groupId = req.params.groupId || req.query.groupId || req.body.groupId;
    const loggedInUserId = req.user.id;
    if (!query) {
      return res.status(400).json({
        message: "Search query is required",
      });
    }
    if (groupId) {
      const membership = await GroupMember.findOne({
        where: {
          group_id: groupId,
          user_id: loggedInUserId,
        },
      });
      if (!membership) {
        return res.status(403).json({
          message: "You are not a member of this group",
        });
      }
    }
    let existingUserIds = [];
    if (groupId) {
      const members = await GroupMember.findAll({
        where: { group_id: groupId },
        attributes: ["user_id"],
      });
      existingUserIds = members.map(m => m.user_id);
    }
    const users = await User.findAll({
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              { name: { [Op.iLike]: `%${query}%` } },
              { email: { [Op.iLike]: `%${query}%` } },
            ],
          },
          {
            id: {
              [Op.notIn]: existingUserIds,
            },
          },
        ],
      },
      attributes: ["id", "name", "email","phone"],
      limit: 20,
    });
    res.status(200).json({
      users,
    });
  } catch (err) {
  console.error("Search error:", err);
  res.status(500).json({
    message: err.message,
  });
}
};

const addGroupMember = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { userId, role } = req.body;
    const loggedInUserId = req.user.id;
    console.log(loggedInUserId)
    const owner = await GroupMember.findOne({
      where: {
        group_id: groupId,
        user_id: loggedInUserId,
        role: "Owner",
      },
    });
    if (!owner) {
      return res.status(403).json({
        message: "Only Owner can add members",
      });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const existingMember = await GroupMember.findOne({
      where: {
        group_id: groupId,
        user_id: userId,
      },
    });

    if (existingMember) {
      return res.status(400).json({
        message: "User is already a member of this group",
      });
    }

    const member = await GroupMember.create({
      group_id: groupId,
      user_id: userId,
      role: role || "Guest",
    });

    res.status(201).json({
      message: "Member added successfully",
      member,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const showGroupMembers = async (req, res) => {
  try {
    const groupId  = req.params.groupId;
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
    const group = await Group.findByPk(groupId, {
      attributes: ["id", "name"],
    });
    if (!group) {
      return res.status(404).json({
        message: "Group not found",
      });
    }
    const members = await GroupMember.findAll({
      where: { group_id: groupId },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email"],
        },
      ],
      attributes: ["role"],
    });
    const formattedMembers = members.map((m) => ({
      id: m.user.id,
      name: m.user.name,
      email: m.user.email,
      role: m.role,
    }));
    res.status(200).json({
      group: {
        id: group.id,
        name: group.name,
      },
      currentUserId:userId,
      members: formattedMembers,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

//delete group member
const removeGroupMember = async (req, res) => {
  try {
    const { groupId, userId } = req.params;
    const loggedInUserId = req.user.id;

    if (parseInt(userId) === loggedInUserId) {
      return res.status(400).json({
        message: "Owner cannot remove himself"
      });
    }
    const member = await GroupMember.findOne({
      where: {
        group_id: groupId,
        user_id: userId
      }
    });
    if (!member) {
      return res.status(404).json({
        message: "Member not found in this group"
      });
    }
    await member.destroy();
    res.status(200).json({
      message: "Member removed successfully"
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

module.exports = { addGroupMember, showGroupMembers,searchUsers,removeGroupMember};
