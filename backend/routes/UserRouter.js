// router.js
import { Router } from 'express';
const router = Router();
import UserController from '../controllers/UserController.js';

router.post('/users', UserController.addUsers);
router.post('/login', UserController.logUser); // Nova rota de login

export default router;