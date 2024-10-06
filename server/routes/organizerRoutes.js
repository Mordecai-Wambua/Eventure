import { Router } from 'express';
import { authJWT } from '../middleware/authMiddleware.js';  // Import authentication middleware
import { authorizeOrganizer } from '../middleware/roleMiddleware.js'; // Import organizer authorization middleware

const organizerRouter = Router();

// Protect the organizer route with both authentication and authorization
organizerRouter.get('/', authJWT, authorizeOrganizer, (req, res) => {
  res.send('Organizer Home');
});

export default organizerRouter;
