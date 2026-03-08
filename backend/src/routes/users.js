const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');
const { validateRequest } = require('../middleware/validation');
const { updateProfileSchema } = require('../schemas/auth.schema');

// Get any user by ID (admin only)
// Note: User data is now managed by Supabase Auth
router.get('/:id', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  try {
    res.status(200).json({ 
      message: 'User management is handled by Supabase Auth',
      userId: req.params.id,
      note: 'Please use the Supabase console for user account details'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// List all users (admin only)
// Note: User data is now managed by Supabase Auth
router.get('/', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  try {
    res.status(200).json({ 
      message: 'User management is handled by Supabase Auth',
      note: 'Please use the Supabase console to view all users'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
