// Admin routes
import { Router } from 'express';
import { authJWT } from '../middleware/authMiddleware.js';
import { authorizeAdmin } from '../middleware/roleMiddleware.js';
import { handleLoginAuth } from '../controllers/authController.js';
import { handleAdminRegistration } from '../controllers/regController.js';
import { getProfile } from '../controllers/getProfile.js';
import User from '../models/User.js';

const adminRouter = Router();

// Protect the admin route with both authentication and authorization
adminRouter.get('/', authJWT, authorizeAdmin, async (req, res) => {
  // Showcase all organizers registered in the database
  try {
    const organizers = await User.find({ role: 'organizer' }).select(
      '-password'
    );
    res.status(200).json({ organizers });
  } catch (error) {
    console.error('Error fetching organizers:', error); // Log the error for debugging
    res.status(500).json({ message: 'Server error' });
  }
});

// Handles admin login
adminRouter.post('/login', handleLoginAuth, (req, res) => {
  res.send('Admin Login');
});

// Handle admin registration
adminRouter.post('/register', authJWT, authorizeAdmin, handleAdminRegistration);

// Get Admin profile by UserID
adminRouter.get('/profile', authJWT, authorizeAdmin, getProfile);

export default adminRouter;
