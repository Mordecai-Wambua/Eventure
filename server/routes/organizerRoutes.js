import { Router } from 'express';
import { authJWT } from '../middleware/authMiddleware.js';
import { authorizeOrganizer } from '../middleware/roleMiddleware.js';
import { handleLoginAuth } from '../controllers/authController.js';
import { handleUserRegistration } from '../controllers/regController.js';
import { getProfile } from '../controllers/getProfile.js';
import { createEvent } from '../controllers/events.js';

const organizerRouter = Router();

// Protect the organizer route with both authentication and authorization
organizerRouter.get('/', authJWT, authorizeOrganizer, (req, res) => {
  res.send('Organizer Home');
});

// Auth for user login
organizerRouter.post('/login', handleLoginAuth, authJWT, (req, res) => {
  res.send('Organizer login');
});

// Register organizer
organizerRouter.post('/register', handleUserRegistration, (req, res) => {
  res.send('Organizer registration');
});

// Get profile by UserID
organizerRouter.get('/profile', authJWT, authorizeOrganizer, getProfile);

// Create an event
organizerRouter.post('/event', authJWT, authorizeOrganizer, createEvent);

// Update an event
// organizerRouter.put('/event/:id', authJWT, authorizeOrganizer, updateEvent);

// Delete an event
// organizerRouter.delete('/event/:id', authJWT, authorizeOrganizer, deleteEvent);

export default organizerRouter;
