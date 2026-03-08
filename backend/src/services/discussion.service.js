const prisma = require('../config/database');

class DiscussionService {
  // Get discussions for a module
  async getModuleDiscussions(moduleId, page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;

      const discussions = await prisma.discussionPost.findMany({
        where: { moduleId },
        include: {
          author: {
            select: {
              id: true,
              fullName: true,
              username: true,
            },
          },
          _count: {
            select: { replies: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      });

      const total = await prisma.discussionPost.count({
        where: { moduleId },
      });

      return {
        discussions,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw new Error(`Failed to get module discussions: ${error.message}`);
    }
  }

  // Create a discussion post
  async createPost(userId, moduleId, data) {
    try {
      const post = await prisma.discussionPost.create({
        data: {
          title: data.title,
          content: data.content,
          userId,
          moduleId,
        },
        include: {
          author: {
            select: {
              id: true,
              fullName: true,
              username: true,
            },
          },
        },
      });

      return post;
    } catch (error) {
      throw new Error(`Failed to create discussion post: ${error.message}`);
    }
  }

  // Get single discussion with replies
  async getPost(postId) {
    try {
      const post = await prisma.discussionPost.findUnique({
        where: { id: postId },
        include: {
          author: {
            select: {
              id: true,
              fullName: true,
              username: true,
            },
          },
          replies: {
            include: {
              author: {
                select: {
                  id: true,
                  fullName: true,
                  username: true,
                },
              },
            },
            orderBy: { createdAt: 'asc' },
          },
        },
      });

      if (!post) {
        throw new Error('Discussion post not found');
      }

      return post;
    } catch (error) {
      throw new Error(
        `Failed to get discussion post: ${error.message}`
      );
    }
  }

  // Create a reply to a discussion
  async createReply(userId, postId, content) {
    try {
      const reply = await prisma.discussionReply.create({
        data: {
          content,
          userId,
          postId,
        },
        include: {
          author: {
            select: {
              id: true,
              fullName: true,
              username: true,
            },
          },
        },
      });

      return reply;
    } catch (error) {
      throw new Error(`Failed to create reply: ${error.message}`);
    }
  }

  // Update a discussion post
  async updatePost(userId, postId, data) {
    try {
      const post = await prisma.discussionPost.findUnique({
        where: { id: postId },
      });

      if (!post) {
        throw new Error('Discussion post not found');
      }

      if (post.userId !== userId) {
        throw new Error('You can only edit your own posts');
      }

      const updatedPost = await prisma.discussionPost.update({
        where: { id: postId },
        data: {
          title: data.title || post.title,
          content: data.content || post.content,
        },
        include: {
          author: {
            select: {
              id: true,
              fullName: true,
              username: true,
            },
          },
        },
      });

      return updatedPost;
    } catch (error) {
      throw new Error(`Failed to update discussion post: ${error.message}`);
    }
  }

  // Delete a discussion post
  async deletePost(userId, postId) {
    try {
      const post = await prisma.discussionPost.findUnique({
        where: { id: postId },
      });

      if (!post) {
        throw new Error('Discussion post not found');
      }

      if (post.userId !== userId) {
        throw new Error('You can only delete your own posts');
      }

      await prisma.discussionPost.delete({
        where: { id: postId },
      });

      return { message: 'Discussion post deleted successfully' };
    } catch (error) {
      throw new Error(`Failed to delete discussion post: ${error.message}`);
    }
  }

  // Delete a reply
  async deleteReply(userId, replyId) {
    try {
      const reply = await prisma.discussionReply.findUnique({
        where: { id: replyId },
      });

      if (!reply) {
        throw new Error('Discussion reply not found');
      }

      if (reply.userId !== userId) {
        throw new Error('You can only delete your own replies');
      }

      await prisma.discussionReply.delete({
        where: { id: replyId },
      });

      return { message: 'Discussion reply deleted successfully' };
    } catch (error) {
      throw new Error(`Failed to delete discussion reply: ${error.message}`);
    }
  }
}

module.exports = new DiscussionService();
