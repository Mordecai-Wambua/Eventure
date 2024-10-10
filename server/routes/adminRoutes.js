// Admin routes
import { Router } from 'express';
import { authJWT } from '../middleware/authMiddleware.js';
import { authorizeAdmin } from '../middleware/roleMiddleware.js';
import { handleLoginAuth } from '../controllers/authController.js';
import { handleAdminRegistration } from '../controllers/regController.js';
import { getProfile } from '../controllers/getProfile.js';

const adminRouter = Router();

// Protect the admin route with both authentication and authorization
adminRouter.get('/', authJWT, authorizeAdmin, (req, res) => {
  res.send('Admin Home');
});

// Handles admin login
adminRouter.post('/login', handleLoginAuth, (req, res) => {
  res.send('Admin Login');
});

// Handle admin registration
adminRouter.post('/register', handleAdminRegistration, (req, res) => {
  res.send('Admin Registration');
});

// Get Admin profile by UserID
adminRouter.get('/profile', authJWT, authorizeAdmin, getProfile);

export default adminRouter;
