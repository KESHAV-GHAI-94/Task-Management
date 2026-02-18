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

module.exports = {createGroup ,showGroups};
