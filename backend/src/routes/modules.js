const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/module.controller');
const { authMiddleware } = require('../middleware/auth');

// Public routes
router.get('/', moduleController.getAllModules);
router.get('/:id', moduleController.getModuleById);
router.get('/:id/overview', moduleController.getModuleOverview);
router.get('/:id/resources', moduleController.getModuleResources);
router.get('/:id/assignments', moduleController.getModuleAssignments);

// Protected routes
router.post('/:id/complete', authMiddleware, moduleController.markModuleComplete);
router.put('/:id/progress', authMiddleware, moduleController.updateProgress);

module.exports = router;
