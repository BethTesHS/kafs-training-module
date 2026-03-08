const express = require('express');
const router = express.Router();
const fileController = require('../controllers/file.controller');
const { authMiddleware } = require('../middleware/auth');

// Protected routes
router.post('/upload', authMiddleware, fileController.uploadFile);
router.get('/', authMiddleware, fileController.getUserFiles);
router.get('/:id', authMiddleware, fileController.getFileById);
router.delete('/:id', authMiddleware, fileController.deleteFile);

// Public routes
router.get('/module/:moduleId/resources', fileController.getModuleResources);

module.exports = router;
