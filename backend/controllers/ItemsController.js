import { Items } from '../models/ItemsModel.js';

const ItemsController = {
  getAll: (req, res) => {
    db.query('SELECT * FROM Items', (err, rows) => {
      if (err) {
        console.error('Erro ao buscar items:', err);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
      }
      res.json(rows);
    });
  },

  
}

export const addItem = async (req, res) => {
  try {
    const newItem = await _addItem(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  ItemsController,
  addItem
};
