import { Router } from 'express';
import { authJWT } from '../middleware/authMiddleware.js';
import { authorizeOrganizer } from '../middleware/roleMiddleware.js';
import { handleLoginAuth } from '../controllers/authController.js';
import { handleUserRegistration } from '../controllers/regController.js';
import { getProfile } from '../controllers/getProfile.js';
import {
  createEvent,
  updateEvent,
  deleteEvent,
  getEventAttendees,
} from '../controllers/events.js';
import Event from '../models/Event.js';

const organizerRouter = Router();

// Protect the organizer route with both authentication and authorization
organizerRouter.get('/', authJWT, authorizeOrganizer, async (req, res) => {
  const userId = req.user.id;
  // Showcase all events done by a user
  try {
    const eventsPosted = await Event.find({
      'organizer.organizerId': userId,
    }).select('-__v');
    res.status(200).json({ eventsPosted });
  } catch (error) {
    console.error('Error fetching events:', error); // Log the error for debugging
    res.status(500).json({ message: 'Server error' });
  }
});

// Auth for user login
organizerRouter.post('/login', handleLoginAuth, authJWT);

// Register organizer
organizerRouter.post('/register', handleUserRegistration);

// Get profile by UserID
organizerRouter.get('/profile', authJWT, authorizeOrganizer, getProfile);

// Create an event
organizerRouter.post('/event', authJWT, authorizeOrganizer, createEvent);

// Update an event
organizerRouter.put('/event/:id', authJWT, authorizeOrganizer, updateEvent);

// Delete an event
organizerRouter.delete('/event/:id', authJWT, authorizeOrganizer, deleteEvent);

// View event tickets
organizerRouter.get(
  '/event/:id/tickets',
  authJWT,
  authorizeOrganizer,
  getEventAttendees
);
export default organizerRouter;
