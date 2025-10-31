const express = require('express')
const router = express.Router()
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController')

// GET /api/tasks - Get all tasks
router.get('/', getTasks)

// POST /api/tasks - Create a new task
router.post('/', createTask)

// PUT /api/tasks/:id - Update a task
router.put('/:id', updateTask)

// DELETE /api/tasks/:id - Delete a task
router.delete('/:id', deleteTask)

module.exports = router
