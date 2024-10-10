// Admin routes
import { Router } from 'express';
import { authJWT } from '../middleware/authMiddleware.js';
import { authorizeAdmin } from '../middleware/roleMiddleware.js';
import { handleLoginAuth } from '../controllers/authController.js';
import { handleAdminRegistration } from '../controllers/regController.js';

const adminRouter = Router();

// Protect the admin route with both authentication and authorization
adminRouter.get('/', authJWT, authorizeAdmin, (req, res) => {
  res.send('Admin Home');
});

// Handles admin login
adminRouter.post('/admin-login', handleLoginAuth, (req, res) => {
  res.send('Admin Login');
});

// Handle admin registration
adminRouter.post('/admin-register', handleAdminRegistration, (req, res) => {
  res.send('Admin Registration');
});

export default adminRouter;
