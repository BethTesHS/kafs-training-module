const aiService = require('../services/ai.service');

/**
 * POST /api/ai-quiz/grade
 * Body: { moduleData, questions, answers }
 *
 * Uses AI to grade free-text quiz answers against the module's
 * resources and content.
 */
const gradeAiQuiz = async (req, res) => {
  try {
    const { moduleData, questions, answers } = req.body;

    // Validate required fields
    if (!moduleData || !questions || !answers) {
      return res.status(400).json({
        error: 'Missing required fields: moduleData, questions, answers',
      });
    }

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({
        error: 'questions must be a non-empty array',
      });
    }

    if (typeof answers !== 'object' || Object.keys(answers).length === 0) {
      return res.status(400).json({
        error: 'answers must be a non-empty object mapping questionId to answer text',
      });
    }

    // Check that at least one answer is non-empty
    const hasContent = Object.values(answers).some(
      (a) => typeof a === 'string' && a.trim().length > 0
    );
    if (!hasContent) {
      return res.status(400).json({
        error: 'Please provide at least one non-empty answer',
      });
    }

    const result = await aiService.gradeAiQuiz({
      moduleData,
      questions,
      answers,
    });

    return res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('AI quiz grading error:', error);

    if (error.message?.includes('GEMINI_API_KEY')) {
      return res.status(503).json({
        error: 'AI grading service is not configured. Please contact an administrator.',
      });
    }

    return res.status(500).json({
      error: error.message || 'Failed to grade quiz. Please try again.',
    });
  }
};

module.exports = {
  gradeAiQuiz,
};
