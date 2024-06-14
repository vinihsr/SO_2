import { Router } from 'express';
const router = Router();
import UserController from '../controllers/UserController.js';

router.post('/register', UserController.addUsers);
router.post('/login', UserController.logUser);

export default router;
