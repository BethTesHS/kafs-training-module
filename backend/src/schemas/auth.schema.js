const { z } = require('zod');

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

const updateProfileSchema = z.object({
  fullName: z.string().min(2).optional(),
  username: z.string().min(3).optional(),
  bio: z.string().optional(),
});

module.exports = {
  registerSchema,
  loginSchema,
  updateProfileSchema,
};
