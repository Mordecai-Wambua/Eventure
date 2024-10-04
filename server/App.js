// Main entry point
const express = require('express');
const database = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
(async () => {
  await database.connect()
    const testCollection = database.connection.connection.db.collection('test');
    await testCollection.insertOne({ test: 'data' });
    console.log('Inserted test document');

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
