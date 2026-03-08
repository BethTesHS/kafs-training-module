module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY || '7d',
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173',
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
};