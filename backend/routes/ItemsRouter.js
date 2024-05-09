// routes/itemRoutes.js
import { Router } from 'express';
const router = Router();
import { getAllItems, createItem, updateItem, deleteItem } from '../controllers/ItemsController.js';

// Route to get all items
router.get('/items', getAllItems);

// Route to create a new item
router.post('/items', createItem);

// Route to update an existing item
router.put('/items/:id', updateItem);

// Route to delete an item
router.delete('/items/:id', deleteItem);

export default router;
