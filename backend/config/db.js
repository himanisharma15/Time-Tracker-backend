// Simple DB connect helper - uses MONGO_URI from environment if available
const mongoose = require('mongoose')

exports.connectDB = async () => {
  // Support multiple common env names so the project works whether the
  // environment variable is called MONGO_URI, MONGODB_URI or DATABASE_URL.
  let uri = process.env.MONGO_URI || process.env.MONGODB_URI || process.env.DATABASE_URL
  
  if (!uri) {
    // Not configured — resolve immediately so scaffold runs without a DB
    console.log('⚠️  No MongoDB URI found. Skipping database connection.')
    return Promise.resolve()
  }

  // Add database name if not present in the URI
  if (uri.includes('mongodb+srv://') && !uri.match(/\/[^/?]+\?/)) {
    // Insert database name before query parameters
    uri = uri.replace('/?', '/timetrackr?')
  } else if (uri.includes('mongodb://') && uri.endsWith('/')) {
    uri = uri + 'timetrackr'
  }
  
  try {
    // Mongoose 7+ no longer needs useNewUrlParser/useUnifiedTopology, but
    // passing them is harmless for compatibility with older versions.
    await mongoose.connect(uri, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000 // Timeout after 5 seconds
    })
    console.log('✅ MongoDB connected successfully')
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message)
    console.error('   Check: 1) Connection string is correct, 2) Network allows MongoDB Atlas, 3) IP is whitelisted in Atlas')
    // Don't throw - just log and continue so the server can run without DB
  }
}
