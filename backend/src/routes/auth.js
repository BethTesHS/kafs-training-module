const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { validateRequest } = require('../middleware/validation');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');
const { registerSchema, loginSchema, updateProfileSchema } = require('../schemas/auth.schema');

// Public routes
router.post('/register', validateRequest(registerSchema), userController.register);
router.post('/login', validateRequest(loginSchema), userController.login);

// Protected routes
router.get('/profile', authMiddleware, userController.getProfile);
router.put('/profile', authMiddleware, validateRequest(updateProfileSchema), userController.updateProfile);
router.get('/stats', authMiddleware, userController.getStats);
router.delete('/account', authMiddleware, userController.deleteAccount);

module.exports = router;