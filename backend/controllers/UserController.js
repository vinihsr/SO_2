// UserController.js
import pool from '../db/Db.config.js';
import bcrypt from 'bcrypt'; // Certifique-se de instalar o bcrypt para hashing de senha

const UserController = {
  addUsers: async (req, res) => {
    try {
      const { email, senha } = req.body;
      const hashedPassword = await bcrypt.hash(senha, 10); // Hash da senha

      const query = 'INSERT INTO user (email, senha) VALUES (?, ?)';
      const [result] = await pool.query(query, [email, hashedPassword]);
      res.json({ message: 'Usuário adicionado com sucesso.', id: result.insertId });
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  },

  logUser: async (req, res) => {
    try {
      const { email, senha } = req.body;
      const query = 'SELECT * FROM user WHERE email = ?';
      const [rows] = await pool.query(query, [email]);

      if (rows.length === 0) {
        return res.status(401).json({ message: 'Usuário não encontrado.' });
      }

      const user = rows[0];
      const isPasswordValid = await bcrypt.compare(senha, user.senha);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Senha incorreta.' });
      }

      res.json({ message: 'Login bem-sucedido.', user });
    } catch (error) {
      console.error('Erro ao autenticar usuário:', error);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }
};

export default UserController;

