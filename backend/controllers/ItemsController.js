// controllers/ItemController.js
import { getAllItems as _getAllItems, createItem as _createItem, updateItem as _updateItem, deleteItem as _deleteItem } from '../models/ItemsModel.js';

export const getAllItems = async (req, res) => {
    try {
        const items = await _getAllItems();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const createItem = async (req, res) => {
    try {
        const newItem = req.body;
        const itemId = await _createItem(newItem);
        res.status(201).json({ id: itemId });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updateItem = async (req, res) => {
    try {
        const itemId = req.params.id;
        const updatedItem = req.body;
        await _updateItem(itemId, updatedItem);
        res.status(200).send('Item updated successfully');
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteItem = async (req, res) => {
    try {
        const itemId = req.params.id;
        await _deleteItem(itemId);
        res.status(200).send('Item deleted successfully');
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default {
    getAllItems,
    createItem,
    updateItem,
    deleteItem
};
