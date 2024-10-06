import { Router } from 'express';
import { authJWT } from '../middleware/authMiddleware.js';  // Import authentication middleware
import { authorizeAdmin } from '../middleware/roleMiddleware.js'; // Import admin authorization middleware

const adminRouter = Router();

// Protect the admin route with both authentication and authorization
adminRouter.get('/', authJWT, authorizeAdmin, (req, res) => {
  res.send('Admin Home');
});

export default adminRouter;
