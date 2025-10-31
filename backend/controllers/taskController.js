const Task = require('../models/Task')

// Get all tasks for a user
exports.getTasks = async (req, res) => {
  try {
    // For demo, use a default userId. In production, get from auth token
    const userId = req.headers['x-user-id'] || 'demo-user'
    
    const tasks = await Task.find({ userId }).sort({ createdAt: -1 })
    res.json({ ok: true, tasks })
  } catch (error) {
    console.error('Get tasks error:', error)
    res.status(500).json({ error: 'Failed to fetch tasks: ' + error.message })
  }
}

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'demo-user'
    const { name, project, status, seconds, running } = req.body
    
    if (!name) {
      return res.status(400).json({ error: 'Task name is required' })
    }
    
    const task = new Task({
      name,
      project: project || '',
      status: status || 'Pending',
      seconds: seconds || 0,
      running: running || false,
      userId
    })
    
    await task.save()
    res.status(201).json({ ok: true, task })
  } catch (error) {
    console.error('Create task error:', error)
    res.status(500).json({ error: 'Failed to create task: ' + error.message })
  }
}

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'demo-user'
    const { id } = req.params
    const updates = req.body
    
    const task = await Task.findOne({ _id: id, userId })
    if (!task) {
      return res.status(404).json({ error: 'Task not found' })
    }
    
    // Update fields
    Object.keys(updates).forEach(key => {
      if (key !== '_id' && key !== 'userId') {
        task[key] = updates[key]
      }
    })
    task.updatedAt = Date.now()
    
    await task.save()
    res.json({ ok: true, task })
  } catch (error) {
    console.error('Update task error:', error)
    res.status(500).json({ error: 'Failed to update task: ' + error.message })
  }
}

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'demo-user'
    const { id } = req.params
    
    const task = await Task.findOneAndDelete({ _id: id, userId })
    if (!task) {
      return res.status(404).json({ error: 'Task not found' })
    }
    
    res.json({ ok: true, message: 'Task deleted' })
  } catch (error) {
    console.error('Delete task error:', error)
    res.status(500).json({ error: 'Failed to delete task: ' + error.message })
  }
}
