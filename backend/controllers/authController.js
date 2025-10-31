// Simple controller stubs for auth - replace with real logic
// use bcryptjs (pure JS) to avoid native build issues in portable environments
const bcrypt = require('bcryptjs')

// NOTE: This scaffold uses an in-memory placeholder. Replace with DB calls (e.g., Mongoose) in production.
let _inMemoryUser = null

exports.signup = async (req, res) => {
  try {
    const { name, email, password, account } = req.body || {}
    if (!email || !password || !name) return res.status(400).json({ error: 'Name, email, and password are required' })

    // hash password (demo)
    const hashed = await bcrypt.hash(password, 10)
    _inMemoryUser = { id: 1, name, email: email.toLowerCase(), password: hashed, account }
    return res.status(201).json({ ok: true, message: 'User created (in-memory demo)', user: { id: 1, name, email, account } })
  } catch (error) {
    console.error('Signup error:', error)
    return res.status(500).json({ error: 'Signup failed: ' + error.message })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body || {}
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required' })
    if (!_inMemoryUser) return res.status(404).json({ error: 'No user found (in-memory demo)' })

    const ok = await bcrypt.compare(password, _inMemoryUser.password)
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' })

    // Demo token (replace with JWT in production)
    return res.json({ ok: true, message: 'Login success (demo)', user: { id: _inMemoryUser.id, name: _inMemoryUser.name, email: _inMemoryUser.email } })
  } catch (error) {
    console.error('Login error:', error)
    return res.status(500).json({ error: 'Login failed: ' + error.message })
  }
}
