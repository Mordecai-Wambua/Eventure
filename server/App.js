import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import home from './routes/router.js';
import adminRouter from './routes/adminRoutes.js';
import organizerRouter from './routes/organizerRoutes.js';
import database from './config/db.js';
import logger from './middleware/logger.js';
import notFound from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_KEY;
const DEV_LINK = process.env.DEV_LINK;

if (!JWT_SECRET) {
  console.error('JWT_KEY is not set in the environment variables');
  process.exit(1);
}

app.use(express.json());
app.use(logger);

// Use CORS middleware
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [DEV_LINK, 'http://localhost:5173'];

      // If no origin is provided (e.g., non-browser request), allow it
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // Allow cookies and credentials
  })
);

// Existing routes
app.use('/', home);
app.use('/api/admin', adminRouter);
app.use('/api/organizer', organizerRouter);

// Not found middleware
app.use(notFound);

// Error handling middleware
app.use(errorHandler);

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
