// Example Mongoose schema for a User (optional)
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  account: { type: String, default: 'Personal' },
}, { timestamps: true })

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)
