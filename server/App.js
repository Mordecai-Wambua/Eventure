import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import home from './routes/router.js';
import adminRouter from './routes/adminRoutes.js';
import organizerRouter from './routes/organizerRoutes.js';
import database from './config/db.js';
import { authJWT } from './middleware/authMiddleware.js'; // Assuming you have this middleware

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_KEY;

if (!JWT_SECRET) {
  console.error('JWT_KEY is not set in the environment variables');
  process.exit(1);
}

app.use(express.json());

// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  credentials: true, // handles cookies or sessions
}));

// Existing routes
app.use('/', home);
app.use('/api/admin', adminRouter);
app.use('/api/organizer', organizerRouter);

// Connect to MongoDB and start server
(async () => {
  await database.connect();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  // Graceful shutdown handling
  process.on('SIGINT', async () => {
    await database.disconnect();
    console.log('Server shutting down gracefully');
    process.exit(0);
  });
})();