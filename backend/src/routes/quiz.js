const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quiz.controller');

// POST /api/quiz/submit
router.post('/submit', quizController.submitQuiz);

// GET /api/quiz/:moduleId/submission?user_id=123
router.get('/:moduleId/submission', quizController.getSubmission);

module.exports = router;