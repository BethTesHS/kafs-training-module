const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { validateRequest } = require('../middleware/validation');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');
const { updateProfileSchema } = require('../schemas/auth.schema');

// Protected routes - these require Supabase JWT token
router.get('/profile', authMiddleware, userController.getProfile);
router.put('/profile', authMiddleware, validateRequest(updateProfileSchema), userController.updateProfile);
router.get('/stats', authMiddleware, userController.getStats);
router.delete('/account', authMiddleware, userController.deleteAccount);

module.exports = router;