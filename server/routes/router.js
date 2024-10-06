import { Router } from 'express';

const router = Router();

router.get('/home', (req, res) => {
  res.send('Hello World');
});

export default router;
