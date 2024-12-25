const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Register a new user
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' })
    }

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    })
    res.status(201).json({ message: 'User registered successfully', user })
  } catch (err) {
    res.status(500).json({ error: 'Error registering user', details: err })
  }
}

// Login a user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'User not found' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' })

    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', {
      expiresIn: '1h',
    })

    res.json({ message: 'Login successful', token, user })
  } catch (err) {
    res.status(500).json({ error: 'Error logging in', details: err })
  }
}
