// Simple Express server for TimeTrackr (backend scaffold)
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')
const apiRouter = require('./routes')
const mongoose = require('mongoose')

// Load backend-specific .env (useful when starting the server from the repo root)
dotenv.config({ path: path.join(__dirname, '.env') })

const app = express()
app.use(cors())
app.use(express.json())

// Mount API routes first so server can start even if DB fails
app.use('/api', apiRouter)

app.get('/', (req, res) => res.json({ ok: true, message: 'TimeTrackr backend running' }))

// Global error handler - catches any unhandled errors in routes
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err)
  res.status(500).json({ 
    error: 'Internal server error', 
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
})

const PORT = process.env.PORT || 4000

// ✅ MongoDB Connection with database name
async function connectMongoDB() {
  try {
    // Get URI from env and add database name if not present
    let uri = process.env.MONGO_URI || process.env.MONGODB_URI
    
    if (!uri) {
      console.log('⚠️  No MONGO_URI found in .env. Server running without database.')
      return
    }
    
    // Add database name 'timetrackr' to the URI
    if (uri.endsWith('/')) {
      uri = uri + 'timetrackr'
    } else if (!uri.includes('mongodb.net/') || uri.match(/mongodb\.net\/\?/)) {
      // Replace /? with /timetrackr?
      uri = uri.replace(/\/\?/, '/timetrackr?')
    }
    
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    })
    console.log('✅ MongoDB connected successfully to database: timetrackr')
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message)
    console.error('   Tip: Check 1) credentials, 2) network access, 3) IP whitelist in Atlas')
  }
}

// Start the server first
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
  
  // Attempt to connect to MongoDB after server is running
  connectMongoDB()
})

// Handle server errors gracefully
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Please free the port or change PORT in .env`)
  } else {
    console.error('❌ Server error:', err.message)
  }
  process.exit(1)
})
