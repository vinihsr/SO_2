import pool from '../db/Db.config.js';

const UserController = {
  addUsers: async (req, res) => {
    try {
      const { id, email, senha } = req.body;
      // Assuming you have a table named items with columns: name, photo, description, price, sell_price, amount, minimum_stock, category, location
      const query = 'INSERT INTO user (id, email, senha) VALUES (?, ?, ?)';
      const [result] = await pool.query(query, [id, email, senha]);
      res.json({ message: 'Item adicionado com sucesso.', id: result.insertId });
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  },
  
  LogUser: async (req, res) => {
    try {
      const { id } = req.params;
      const query = 'SELECT * FROM user WHERE id = ?'; // Modify the query to select data
      const [rows] = await pool.query(query, [id]);
      res.json(rows);
    } catch (error) {
      console.error('Erro ao buscar items:', error);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }
  
};

export { UserController };

