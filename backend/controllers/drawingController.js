const Drawing = require('../models/Drawing');

// Save a drawing
exports.saveDrawing = async (req, res) => {
  const { userId, data } = req.body;

  try {
    const drawing = await Drawing.create({ userId, data });
    res.status(201).json(drawing);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Fetch user drawings
exports.fetchDrawings = async (req, res) => {
  const { userId } = req.query;

  try {
    const drawings = await Drawing.find({ userId });
    res.json(drawings);
  } catch (err) {
    res.status(500).json(err);
  }
};
