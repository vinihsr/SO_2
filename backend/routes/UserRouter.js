// router.js

import { Router} from 'express';
const router = Router();
import { UserController } from '../controllers/UserController.js';


router.post('/users', UserController.addUsers);

router.get('/users', UserController.LogUser);

export default router;
