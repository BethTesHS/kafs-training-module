const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');
const { validateRequest } = require('../middleware/validation');
const { updateProfileSchema } = require('../schemas/auth.schema');

// Get any user by ID (admin only)
router.get('/:id', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  try {
    const prisma = require('../config/database');
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: {
        id: true,
        email: true,
        fullName: true,
        username: true,
        role: true,
        createdAt: true,
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// List all users (admin only)
router.get('/', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  try {
    const prisma = require('../config/database');
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        fullName: true,
        username: true,
        role: true,
        createdAt: true,
      },
      take: 50,
      skip: 0,
    });

    res.status(200).json({ data: users, total: users.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
