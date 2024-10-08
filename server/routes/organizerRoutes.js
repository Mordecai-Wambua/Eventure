import { Router } from 'express';
import { authJWT } from '../middleware/authMiddleware.js';
import { authorizeOrganizer } from '../middleware/roleMiddleware.js'; // Import organizer authorizaton middleware
import { handleLoginAuth } from '../controllers/authController.js';
import { handleUserRegistration } from '../controllers/regController.js';

const organizerRouter = Router();

// Protect the organizer route with both authentication and authorization
organizerRouter.get('/', authJWT, authorizeOrganizer, (req, res) => {
  res.send('Organizer Home');
});

// Auth for user login
organizerRouter.post('/organizer-login', handleLoginAuth, authJWT, authorizeOrganizer, (req, res) => {
  res.send('Organizer login');
});

organizerRouter.post('/organizer-register', handleUserRegistration, authJWT, authorizeOrganizer, (req, res) => {
  res.send('Organizer registration')
})

export default organizerRouter;
