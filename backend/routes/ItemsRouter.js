import express from 'express';
import { ItemsController } from '../controllers/ItemsController.js';
import upload from '../bucket/middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/items', ItemsController.getAll);
router.post('/items', upload.single('photo'), ItemsController.addItems);
router.delete('/items/:id', ItemsController.deleteItem);
router.get('/search', ItemsController.searchItems);
router.post('/upload', upload.single('file'), ItemsController.uploadFile);

export default router;