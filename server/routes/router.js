import { Router } from 'express';
import { getEvents } from '../controllers/events.js';

const router = Router();

router.get('/', (req, res) => {
  res.send('Hello World');
});

router.get('/events', getEvents);

export default router;
