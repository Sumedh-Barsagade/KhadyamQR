// Replace the existing production allowedOrigins block with this snippet

// In production, only allow specific origins (read from env for flexibility)
const getAllowedOrigins = () => {
  const fromEnv = process.env.ALLOWED_ORIGINS;
  if (fromEnv) {
    // comma separated list in env: e.g. "https://khadyamqr-menusystem.netlify.app,https://example.com"
    return fromEnv.split(",").map(s => s.trim()).filter(Boolean);
  }
  return [
    'https://khadyam-qr.netlify.app',
    // Add more defaults here if you want
  ];
};

if (isDevelopment) {
  // ... existing dev CORS config ...
} else {
  const allowedOrigins = getAllowedOrigins();

  app.use(cors({
    origin: function(origin, callback) {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));
}
