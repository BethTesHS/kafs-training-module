const discussionService = require('../services/discussion.service');

class DiscussionController {
  async getModuleDiscussions(req, res, next) {
    try {
      const { moduleId } = req.params;
      const { page = 1, limit = 10 } = req.query;

      const discussions = await discussionService.getModuleDiscussions(
        moduleId,
        parseInt(page),
        parseInt(limit)
      );

      res.status(200).json({
        message: 'Module discussions retrieved successfully',
        data: discussions,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createPost(req, res, next) {
    try {
      const userId = req.user.id;
      const { moduleId } = req.params;
      const { title, content } = req.body;

      if (!title || !content) {
        return res.status(400).json({
          error: 'Title and content are required',
        });
      }

      const post = await discussionService.createPost(userId, moduleId, {
        title,
        content,
      });

      res.status(201).json({
        message: 'Discussion post created successfully',
        data: post,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getPost(req, res, next) {
    try {
      const { postId } = req.params;
      const post = await discussionService.getPost(postId);

      res.status(200).json({
        message: 'Discussion post retrieved successfully',
        data: post,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createReply(req, res, next) {
    try {
      const userId = req.user.id;
      const { postId } = req.params;
      const { content } = req.body;

      if (!content) {
        return res.status(400).json({
          error: 'Content is required',
        });
      }

      const reply = await discussionService.createReply(userId, postId, content);

      res.status(201).json({
        message: 'Discussion reply created successfully',
        data: reply,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updatePost(req, res, next) {
    try {
      const userId = req.user.id;
      const { postId } = req.params;
      const { title, content } = req.body;

      const post = await discussionService.updatePost(userId, postId, {
        title,
        content,
      });

      res.status(200).json({
        message: 'Discussion post updated successfully',
        data: post,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deletePost(req, res, next) {
    try {
      const userId = req.user.id;
      const { postId } = req.params;

      const result = await discussionService.deletePost(userId, postId);

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteReply(req, res, next) {
    try {
      const userId = req.user.id;
      const { replyId } = req.params;

      const result = await discussionService.deleteReply(userId, replyId);

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new DiscussionController();
