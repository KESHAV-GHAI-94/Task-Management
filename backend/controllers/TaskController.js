const Task = require("../models/tasksModel");

const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      assigned_to,
    } = req.body;
    const created_by = req.user.id;
    let imageBuffer = null;
    let mimetype = null;
    if (req.file) {
      imageBuffer = req.file.buffer;      //task controller me assigntask add krn ah multiple user k liye
      mimetype = req.file.mimetype;
    }
    const task = await Task.create({
      title,
      description,
      priority,
      assigned_to,
      created_by,
      image: imageBuffer,
      image_mimetype: mimetype,
    });
    res.status(201).json({
      message: "Task created successfully",
      taskId: task.id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = { createTask };
