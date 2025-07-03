const express = require('express');
const router = express.Router();
const { createLog, getLogsByTask } = require('../controllers/actionLogController.js');
const { protect } = require('../middlewares/authMiddleware.js');

router.post('/', protect, createLog);
router.get('/:taskId', protect, getLogsByTask);

module.exports = router;
