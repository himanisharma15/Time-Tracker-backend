const express = require('express')
const router = express.Router()

// Import sub-routers
const authRouter = require('./auth')
const tasksRouter = require('./tasks')

router.use('/auth', authRouter)
router.use('/tasks', tasksRouter)

router.get('/health', (req, res) => res.json({ status: 'ok' }))

module.exports = router
