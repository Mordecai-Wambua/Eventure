import { Router } from 'express';
import { authJWT } from '../middleware/authMiddleware.js';
import { authorizeOrganizer } from '../middleware/roleMiddleware.js';
import { handleLoginAuth } from '../controllers/authController.js';
import { handleUserRegistration } from '../controllers/regController.js';
import { getProfile } from '../controllers/getProfile.js';

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

export default organizerRouter;
