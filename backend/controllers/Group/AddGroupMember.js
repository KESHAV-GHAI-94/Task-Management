const GroupMember = require("../../models/groupmembersmodel");
const User = require("../../models/userModel");
const Group = require("../../models/groupmodel");
const addGroupMember = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { userId, role } = req.body;
    const loggedInUserId = req.user.id;

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

    // ✅ CHECK IF ALREADY MEMBER
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
      members: formattedMembers,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = { addGroupMember, showGroupMembers };
