const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: false,
  },
  description: {
    type: String,
    default: '',
  },
  assignedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
status: {
  type: String,
  enum: ['Todo', 'In Progress', 'Completed'],
  default: 'Todo'
},
priority: {
  type: String,
  enum: ['Low', 'Medium', 'High'],
  default: 'Low'
}
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
