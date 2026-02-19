const Task = require("../models/tasksModel");
const User = require("../models/userModel");
const GroupMember = require("../models/groupmembersmodel");

const createTask = async (req, res) => {
  try {
    const { title, description, priority, assigned_to } = req.body;
    const group_id = req.group_id;
    const created_by = req.user.id;

    let imageBuffer = null;
    let mimetype = null;

    if (req.file) {
      imageBuffer = req.file.buffer;
      mimetype = req.file.mimetype;
    }

    let assignedUsersArray = [];

    if (assigned_to) {
      assignedUsersArray = Array.isArray(assigned_to)
        ? assigned_to
        : [assigned_to];
    }
    if (!assignedUsersArray.includes(created_by)) {
      assignedUsersArray.push(created_by);
    }

    const validMembers = await GroupMember.findAll({
      where: {
        group_id: group_id,
        user_id: assignedUsersArray,
      },
      attributes: ["user_id"],
    });

    const validUserIds = validMembers.map(m => m.user_id);

    if (validUserIds.length !== assignedUsersArray.length) {
      return res.status(400).json({
        message: "One or more assigned users are not members of this group",
      });
    }

    const task = await Task.create({
      title,
      description,
      priority,
      group_id,
      created_by,
      image: imageBuffer,
      image_mimetype: mimetype,
    });

    await task.setAssignedUsers(validUserIds);

    res.status(201).json({
      message: "Task created successfully",
      taskId: task.id,
      assignedUsers: validUserIds,
      creator: created_by,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

const DeleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    await task.destroy();
    res.status(200).json({
      message: `Task deleted successfully by ${req.user.name} (${req.groupRole})`
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

const ViewTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findByPk(taskId, {
      include: [
        {
          model: User,
          as: "assignedUsers",
          attributes: ["id", "name", "email"],
          through: { attributes: [] },
        },
      ],
    });
    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      task: {
        id: task.id,
        group_id: task.group_id,
        title: task.title,
        description: task.description,
        priority: task.priority,
        created_by: task.created_by,
        assigned_to: task.assignedUsers,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

const UpdateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, priority, assigned_to } = req.body;

    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    const updateData = {};

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (priority !== undefined) updateData.priority = priority;

    if (req.file) {
      updateData.image = req.file.buffer;
      updateData.image_mimetype = req.file.mimetype;
    }

    if (Object.keys(updateData).length > 0) {
      await task.update(updateData);
    }

    if (assigned_to !== undefined) {

      const assignedArray = Array.isArray(assigned_to)
        ? assigned_to
        : [assigned_to];

      const validMembers = await GroupMember.findAll({
        where: {
          group_id: task.group_id,
          user_id: assignedArray,
        },
        attributes: ["user_id"],
      });

      const validUserIds = validMembers.map(m => m.user_id);

      const invalidUsers = assignedArray.filter(
        id => !validUserIds.includes(id)
      );

      if (invalidUsers.length > 0) {
        return res.status(400).json({
          message: "Some users are not members of this group",
          invalidUsers,
        });
      }
      await task.setAssignedUsers(validUserIds);
    }

    res.status(200).json({
      message: `Task updated successfully by ${req.user.name} (${req.groupRole})`,
      taskId: task.id,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

const UpdateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    await task.update({ status });
    res.status(200).json({
      message: `Task status updated to ${status}`,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = { createTask, DeleteTask,UpdateTaskStatus, ViewTask, UpdateTask };
