import { getAllItems as _getAllItems, createItem as _createItem, updateItem as _updateItem, deleteItem as _deleteItem } from '../models/ItemsModel.js';

export const getAllItems = async (req, res) => {
    try {
        const items = await _getAllItems();
        res.json(items);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const createItem = async (req, res) => {
    try {
        const newItem = req.body;
        const itemId = await _createItem(newItem);
        res.status(201).json({ id: itemId });
    } catch (error) {
        console.error('Error creating item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updateItem = async (req, res) => {
    // Implement updateItem logic here
};

export const deleteItem = async (req, res) => {
    // Implement deleteItem logic here
};

export default {
    getAllItems,
    createItem,
    updateItem,
    deleteItem
};
