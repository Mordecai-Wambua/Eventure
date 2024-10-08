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

// Handle admin login
adminRouter.post('/admin-login', authJWT, authorizeAdmin, handleLoginAuth, (req, res) => {
  res.send('Admin Login')
});

adminRouter.post('/admin-register', authJWT, authorizeAdmin, handleAdminRegistration, (req, res) => {
  res.send('Admin Registration')
})

export default adminRouter;
