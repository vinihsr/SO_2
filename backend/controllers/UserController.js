// UserController.js
import jwt from 'jsonwebtoken';
import pool from '../db/Db.config.js';
import bcrypt from 'bcrypt';

const UserController = {
  addUsers: async (req, res) => {
    try {
      const { email, senha } = req.body;
      const hashedPassword = await bcrypt.hash(senha, 10);

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

      // eslint-disable-next-line no-undef
      const token = jwt.sign({ id: user.id }, process.env.TOKEN_KEY, { expiresIn: '1h' });
      res.json({ message: 'Login bem-sucedido.', token, user: { id: user.id, email: user.email } });
    } catch (error) {
      console.error('Erro ao autenticar usuário:', error);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }
};

export default UserController;
