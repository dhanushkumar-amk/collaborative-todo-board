const ActionLog = require('../models/ActionLog.js');

// Create a new log entry
exports.createLog = async (req, res) => {
  try {
    const { task, action, message } = req.body;

    const log = await ActionLog.create({
      user: req.user._id, // pulled from auth middleware
      task,
      action,
      message,
    });

    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create action log', error: error.message });
  }
};

// Get all logs for a task
exports.getLogsByTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;

    const logs = await ActionLog.find({ task: taskId })
      .populate('user', 'username email')
      .sort({ createdAt: -1 });

    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch action logs', error: error.message });
  }
};
