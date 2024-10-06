// Main entry point
import express from 'express';
import home from './routes/router.js';
import adminRouter from './routes/adminRoutes.js';
import organizerRouter from './routes/organizerRoutes.js';
import database from './config/db.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Routes
app.use('/', home);
app.use('/api/admin', adminRouter);
app.use('/api/organizer', organizerRouter);

// Connect to MongoDB
(async () => {
  await database.connect();
  // const testCollection = database.connection.connection.db.collection('test');
  // await testCollection.insertOne({ test: 'data' });
  // console.log('Inserted test document');

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
