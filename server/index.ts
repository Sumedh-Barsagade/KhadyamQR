import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { listRestaurants, createRestaurant, uploadQrAndSave, deleteRestaurant, toggleRestaurantStatus, createRestaurantLogin, resetRestaurantPassword } from "./routes/admin";
import { listMenuItems, createMenuItem, deleteMenuItem, setMenuItemAvailability } from "./routes/menu";
import contactRouter from "./routes/contact";

export function createServer() {
  const app = express();

  // Body parsing with limits (must be before CORS)
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // CORS configuration
  const isDevelopment = process.env.NODE_ENV !== 'production';

  if (isDevelopment) {
    // In development, allow all origins for easier testing
    app.use(cors({
      origin: true, // Allow all origins in development
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true
    }));
  } else {
    // In production, only allow specific origins
    const allowedOrigins = [
      'https://khadyam-qr.netlify.app',
      // Add Vercel domain after deployment: 'https://your-app-name.vercel.app',
      // Add other production domains here
    ];

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

  // Security headers
  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    next();
  });

  // Diagnostic endpoint to check server health
  app.get("/api/health", (_req, res) => {
    const env = {
      supabaseUrl: process.env.SUPABASE_URL ? '✅ Set' : '❌ Missing',
      supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Set' : '❌ Missing',
      nodeEnv: process.env.NODE_ENV || 'development',
      viteUrl: process.env.VITE_SUPABASE_URL ? '✅ Set' : '❌ Missing',
      viteKey: process.env.VITE_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing',
    };
    res.json({ 
      status: 'ok',
      message: 'Server is running',
      environment: env,
      timestamp: new Date().toISOString()
    });
  });

  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Admin helpers (no login; guarded by server service role)
  app.get("/api/restaurants", listRestaurants);
  app.post("/api/restaurants", createRestaurant);
  app.post("/api/restaurants/qr", uploadQrAndSave);
  app.post("/api/restaurants/create-login", createRestaurantLogin);
  app.delete("/api/restaurants/:id", deleteRestaurant);
  app.patch("/api/restaurants/:id/status", toggleRestaurantStatus);
  
  // Reset restaurant password (admin only)
  app.post("/api/admin/reset-restaurant-password", resetRestaurantPassword);

  // Menu items
  app.get("/api/restaurants/:restaurantId/menu-items", listMenuItems);
  app.post("/api/restaurants/:restaurantId/menu-items", createMenuItem);
  app.delete("/api/menu-items/:itemId", deleteMenuItem);
  app.patch("/api/menu-items/:itemId/availability", setMenuItemAvailability);

  // Contact form route
  app.use("/api/contact", contactRouter);

  // Error handling
  app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(err.stack);
    return (res as any).status(500).json({ error: 'Something went wrong!' });
  });

  // Handle 404
  app.use((_req, res) => {
    res.status(404).json({ error: 'Not Found' });
  });

  return app;
}

export const app = createServer();

// Start the server
const port = process.env.PORT || 3001; // Changed from 3000 to 3001 to match Vite proxy config

try {
  app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
    console.log(`📡 API endpoints available at http://localhost:${port}/api/*`);
    
    // Check environment variables
    const hasSupabaseUrl = !!(process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL);
    const hasServiceKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!hasSupabaseUrl || !hasServiceKey) {
      console.warn('');
      console.warn('⚠️  WARNING: Supabase environment variables are missing!');
      console.warn('   The server will start, but database operations will fail.');
      console.warn('   Please create a .env file with:');
      console.warn('   - SUPABASE_URL or VITE_SUPABASE_URL');
      console.warn('   - SUPABASE_SERVICE_ROLE_KEY');
      console.warn('');
    }
  });
} catch (error) {
  console.error('❌ Failed to start server:', error);
  if (error instanceof Error) {
    console.error('Error details:', error.message);
  }
  process.exit(1);
}
