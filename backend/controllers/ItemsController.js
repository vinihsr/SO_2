import { getAllItems as _getAllItems, addItem as _addItem } from '../models/ItemsModel.js';

export const getAllItems = async (req, res) => {
  try {
    const items = await _getAllItems();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addItem = async (req, res) => {
  try {
    const newItem = await _addItem(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getAllItems,
  addItem
};
