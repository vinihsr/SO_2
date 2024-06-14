import { Router } from 'express';
import UserController from '../controllers/UserController.js';
const router = Router();

router.post('/register', UserController.addUsers);
router.post('/login', UserController.logUser);

export default router;