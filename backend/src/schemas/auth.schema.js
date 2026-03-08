const { z } = require('zod');

const updateProfileSchema = z.object({
  fullName: z.string().min(2).optional(),
  username: z.string().min(3).optional(),
  bio: z.string().optional(),
});

module.exports = {
  updateProfileSchema,
};
