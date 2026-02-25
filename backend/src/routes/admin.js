const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// Apply admin middleware to all routes
router.use(authMiddleware, roleMiddleware(['admin']));

// ===== USER MANAGEMENT =====
// Get all users
router.get('/users', adminController.getAllUsers);

// Get user details
router.get('/users/:userId', adminController.getUserDetails);

// Update user role
router.put('/users/:userId/role', adminController.updateUserRole);

// Delete user
router.delete('/users/:userId', adminController.deleteUser);

// ===== MODULE MANAGEMENT =====
// Get all modules
router.get('/modules', adminController.getAllModules);

// Create a new module
router.post('/modules', adminController.createModule);

// Update module
router.put('/modules/:moduleId', adminController.updateModule);

// Delete module
router.delete('/modules/:moduleId', adminController.deleteModule);

// Get module performance report
router.get('/modules/:moduleId/report', adminController.getModulePerformanceReport);

// ===== SYSTEM ANALYTICS =====
// Get system statistics
router.get('/stats', adminController.getSystemStats);

// Get activity log
router.get('/activity-log', adminController.getActivityLog);

module.exports = router;
