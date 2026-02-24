const validateRequest = (schema) => {
  return async (req, res, next) => {
    try {
      const validated = await schema.parseAsync(req.body);
      req.body = validated;
      next();
    } catch (error) {
      res.status(400).json({ 
        error: 'Validation failed', 
        details: error.errors 
      });
    }
  };
};

module.exports = { validateRequest };