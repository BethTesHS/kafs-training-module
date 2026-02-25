const express = require('express');
const authRoutes = require('./auth');
const usersRoutes = require('./users');
const modulesRoutes = require('./modules');
const quizRoutes = require('./quiz');
const filesRoutes = require('./files');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/modules', modulesRoutes);
router.use('/quiz', quizRoutes);
router.use('/files', filesRoutes);

module.exports = router;
