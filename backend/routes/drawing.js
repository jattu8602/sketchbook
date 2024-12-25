const express = require('express');
const { saveDrawing, fetchDrawings } = require('../controllers/drawingController');

const router = express.Router();
// hi
// Save a drawing
router.post('/save', saveDrawing);

// Fetch drawings
router.get('/', fetchDrawings);

module.exports = router;
