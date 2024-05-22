import pool from '../db/Db.config.js';

const ItemsController = {
  getAll: async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM items');
      res.json(rows);
    } catch (error) {
      console.error('Erro ao buscar items:', error);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  },

  addItems: async (req, res) => {
    try {
      const { name, photo, description, price, sell_price, amount, minimum_stock, category, location } = req.body;
      // Assuming you have a table named items with columns: name, photo, description, price, sell_price, amount, minimum_stock, category, location
      const query = 'INSERT INTO items (nameItem, photo, descriptionItem, price, sell_price, amount, minimum_stock, category, location) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
      const [result] = await pool.query(query, [name, photo, description, price, sell_price, amount, minimum_stock, category, location]);
      res.json({ message: 'Item adicionado com sucesso.', id: result.insertId });
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  },
  
deleteItem: async (req, res) => {
    const itemId = req.params.id;
    const query = 'DELETE FROM items WHERE id = ?';
     try {
      const [result] = await pool.query(query, [itemId]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Item not found.' });
      }
      res.json({ message: 'Item deleted successfully.' });
    } catch (error) {
      console.error('Error deleting item:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  }
};

export { ItemsController };

