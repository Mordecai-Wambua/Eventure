import { Router } from 'express';

const organizerRouter = Router();

organizerRouter.get('/', (req, res) => {
  res.send('Organizer Home');
});

export default organizerRouter;
