import { Router } from 'express';
const router = Router();
import { getAllItems, addItem } from '../controllers/ItemsController.js';

router.get('/items', getAllItems);
router.post('/items', addItem);

export default router;
