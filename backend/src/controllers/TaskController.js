const Task = require('../models/Task.js');
const ActionLog = require('../models/ActionLog.js');
const User = require('../models/User.js')

// 📌 Create Task
exports.createTask = async (req, res) => {
  try {
    const { title, description, status, priority, assignedUser } = req.body;

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      assignedUser,
    });

    res.status(201).json({
        message: 'Task created successfully',
        task: {
            _id: task._id,
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            assignedUser: task.assignedUser,
        },
    });
  } catch (error) {
    res.status(500).json({ message: 'Task creation failed', error: error.message });
  }
};

// 📌 Get All Tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedUser', 'username email');
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tasks', error: error.message });
  }
};

// 📌 Get Task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('assignedUser', 'username email');

    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch task', error: error.message });
  }
};

// 📌 Update Task
exports.updateTask = async (req, res) => {
  try {
    const { title, description, status, priority, assignedUser, lastModified } = req.body;

    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    // 🛡️ Conflict detection
    if (lastModified && new Date(lastModified) < new Date(task.updatedAt)) {
      return res.status(409).json({
        message: 'Conflict: Task has been modified by another user.',
        task
      });
    }

    // 🧠 Smart assign logging
    if (assignedUser && task.assignedUser?.toString() !== assignedUser) {
      await ActionLog.create({
        user: req.user._id,
        task: task._id,
        action: 'assigned',
        message: `${req.user.username} assigned task to user ${assignedUser}`
      });
    }

    // Update task fields
    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.status = status ?? task.status;
    task.priority = priority ?? task.priority;
    task.assignedUser = assignedUser ?? task.assignedUser;

    const updatedTask = await task.save();

    res.status(200).json({
      message: 'Task updated successfully',
      task: updatedTask
    });
  } catch (error) {
    res.status(500).json({ message: 'Task update failed', error: error.message });
  }
};

// 📌 Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) return res.status(404).json({ message: 'Task not found' });

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Task deletion failed', error: error.message });
  }
};
