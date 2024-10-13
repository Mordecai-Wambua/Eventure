import { Router } from 'express';
import { getEvents, bookEvent } from '../controllers/events.js';

const router = Router();

router.get('/', (req, res) => {
  res.send('Hello World');
});

// Retrieve all events
router.get('/events', getEvents);

// Book an event
router.post('/event/:id/book', bookEvent);

export default router;
