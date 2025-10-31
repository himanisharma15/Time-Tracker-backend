const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  project: { type: String, default: '' },
  status: { type: String, default: 'Pending' },
  seconds: { type: Number, default: 0 },
  running: { type: Boolean, default: false },
  userId: { type: String, required: true }, // For multi-user support
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Task', taskSchema)
