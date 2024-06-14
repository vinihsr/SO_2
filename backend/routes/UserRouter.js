// router.js
import { Router } from 'express';
const router = Router();
import UserController from '../controllers/UserController.js';

router.post('/', UserController.addUsers);
router.post('/', UserController.logUser); // Nova rota de login

export default router;