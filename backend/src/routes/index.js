const express = require('express');
const authRoutes = require('./auth');

const router = express.Router();

router.use('/auth', authRoutes);

// Placeholder routes for other endpoints
router.get('/modules', (req, res) => {
  res.json({ message: 'Modules endpoint - coming in Phase 2' });
});

router.get('/quiz', (req, res) => {
  res.json({ message: 'Quiz endpoint - coming in Phase 2' });
});

module.exports = router;