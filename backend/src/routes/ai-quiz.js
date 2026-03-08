const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const aiQuizController = require('../controllers/ai-quiz.controller');

// POST /api/ai-quiz/grade - AI-powered quiz grading
router.post('/grade', authMiddleware, aiQuizController.gradeAiQuiz);

module.exports = router;
