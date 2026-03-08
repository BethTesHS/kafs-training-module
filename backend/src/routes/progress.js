const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progress.controller');
const { authMiddleware } = require('../middleware/auth');

// All progress routes are protected
router.use(authMiddleware);

// Get overall progress
router.get('/', progressController.getOverallProgress);

// Get learning path recommendations
router.get('/learning-path', progressController.getLearningPath);

// Get earned certificates
router.get('/certificates', progressController.getCertificates);

// Get quiz performance summary
router.get('/quiz-performance', progressController.getQuizPerformance);

// Get user activity summary
router.get('/activity', progressController.getUserActivity);

// Get progress for specific module
router.get('/:moduleId', progressController.getModuleProgress);

// Update progress for specific module
router.put('/:moduleId', progressController.updateProgress);

module.exports = router;
