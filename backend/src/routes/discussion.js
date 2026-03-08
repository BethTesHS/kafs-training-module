const express = require('express');
const router = express.Router();
const discussionController = require('../controllers/discussion.controller');
const { authMiddleware } = require('../middleware/auth');

// Get discussions for a module (public)
router.get('/modules/:moduleId', discussionController.getModuleDiscussions);

// Get specific discussion post (public)
router.get('/posts/:postId', discussionController.getPost);

// Protected routes
router.use(authMiddleware);

// Create a new discussion post
router.post('/modules/:moduleId', discussionController.createPost);

// Update discussion post
router.put('/posts/:postId', discussionController.updatePost);

// Delete discussion post
router.delete('/posts/:postId', discussionController.deletePost);

// Create a reply to a discussion
router.post('/posts/:postId/replies', discussionController.createReply);

// Delete a reply
router.delete('/replies/:replyId', discussionController.deleteReply);

module.exports = router;
