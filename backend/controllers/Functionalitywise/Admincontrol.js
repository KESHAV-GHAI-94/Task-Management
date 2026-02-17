const User = require("../../models/userModel");
const assignrole = async (req, res) => {
  try {
    const { userId, role } = req.body;
    if (!userId || !role) {
        return res.status(400).json({
            message: "User ID and role are required",
        });
    }
    const allowedRoles = [
      "Guest",
      "Developer",
      "Tester",
      "Designer",
      "Maintainer",
      "Owner",
    ];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        message: "Invalid role",
      });
    }
    const user = await User.findByPk(userId);
    if (!user) {
        return res.status(404).json({
            message: "User not found",
        });
    }
    await user.update({
      role: role,
      updated_at: new Date(),
    });
    res.status(200).json({
      message: "Role assigned successfully",
      userId: user.id,
      newRole: role,
    });
    }catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message,
    });
  }
};

const removeRole = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await user.update({
      role: "guest",
      updated_at: new Date(),
    });

    res.status(200).json({
      message: "Role removed successfully",
      userId: user.id,
      newRole: "Guest",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = { assignrole,removeRole };