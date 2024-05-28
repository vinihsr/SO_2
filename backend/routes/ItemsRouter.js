import express from 'express';
import { ItemsController, upload } from '../controllers/ItemsController.js';

const router = express.Router();

router.get('/items', ItemsController.getAll);
router.post('/items', upload.single('photo'), ItemsController.addItems);
router.delete('/items/:id', ItemsController.deleteItem);
router.get('/search', ItemsController.searchItems);

export default router;


