require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth')
const drawingRoutes = require('./routes/drawing')
const path = require('path')

const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, '../frontend')))

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.log(err))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/drawing', drawingRoutes)

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'))
})

const PORT = process.env.PORT || 5001 // Use a different port if 5000 is busy
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
)
