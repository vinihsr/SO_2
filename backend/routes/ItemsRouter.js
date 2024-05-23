import { Router } from 'express';
const router = Router();
const auth = require('../auth/AuthMiddleware.js');
import { ItemsController } from '../controllers/ItemsController.js';

router.get('/items', auth,ItemsController.getAll);
router.post('/items', auth,ItemsController.addItems);
router.delete('/items/:id', auth,ItemsController.deleteItem);

export default router;

