const express = require('express');
const authRoutes = require('./auth');
const usersRoutes = require('./users');
const modulesRoutes = require('./modules');
const quizRoutes = require('./quiz');
const filesRoutes = require('./files');
const progressRoutes = require('./progress');
const discussionRoutes = require('./discussion');
const adminRoutes = require('./admin');
const aiQuizRoutes = require('./ai-quiz');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/modules', modulesRoutes);
router.use('/quiz', quizRoutes);
router.use('/files', filesRoutes);
router.use('/progress', progressRoutes);
router.use('/discussion', discussionRoutes);
router.use('/admin', adminRoutes);
router.use('/ai-quiz', aiQuizRoutes);

module.exports = router;
