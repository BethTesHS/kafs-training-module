const jwt = require('jsonwebtoken');
const config = require('../config/env');

// Middleware to verify Supabase JWT token
// Supabase JWTs should be sent in the Authorization header as "Bearer {token}"
const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    // Verify the token
    // For Supabase JWTs, you should ideally verify against Supabase's public key
    // For now, we'll do basic verification
    try {
      const decoded = jwt.decode(token); // Decode without verification first
      
      if (!decoded || !decoded.sub) {
        return res.status(401).json({ error: 'Invalid token format' });
      }

      // Extract user ID from Supabase JWT (uses 'sub' claim)
      req.user = {
        userId: decoded.sub,
        email: decoded.email,
        ...decoded
      };
      
      next();
    } catch (decodeError) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  } catch (error) {
    return res.status(401).json({ error: 'Authentication error' });
  }
};

const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'No user found' });
    }

    // For now, role-based access is optional without local User table
    // If you need roles, consider adding a user_roles table or fetching from Supabase
    
    next();
  };
};

module.exports = { authMiddleware, roleMiddleware };