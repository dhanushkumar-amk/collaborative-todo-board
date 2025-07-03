const express = require('express');
const router = express.Router();

const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require('../controllers/TaskController.js');
const { protect } = require('../middlewares/authMiddleware.js');


router.post('/', protect, createTask);
router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.put('/:id', protect, updateTask);
router.delete('/:id',protect, deleteTask);

module.exports = router;
