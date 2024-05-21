import { Router } from 'express';
const router = Router();
import { ItemsController } from '../controllers/ItemsController.js';

router.get('/items', ItemsController.getAll);
router.post('/items', ItemsController.addItems);
router.delete('/items:id', ItemsController.deleteItem);

export default router;

