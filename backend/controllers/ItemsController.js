// controllers/ItemsController.js
import pool from '../db/Db.config.js';
import { uploadFileToS3 } from '../s3Services.js'; // Corrigido o caminho do serviço S3

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
      const { name, description, price, sell_price, amount, minimum_stock, category, location } = req.body;
      let photoUrl = null;

      // Upload da imagem para o S3
      if (req.file) {
        const keyName = `items/${Date.now().toString()}-${req.file.originalname}`; // Nome do arquivo no S3
        const uploadResult = await uploadFileToS3(req.file.buffer, process.env.S3_BUCKET_NAME, keyName);
        photoUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${keyName}`;
      }

      const query = 'INSERT INTO items (nameItem, photo, descriptionItem, price, sell_price, amount, minimum_stock, category, location) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
      const [result] = await pool.query(query, [name, photoUrl, description, price, sell_price, amount, minimum_stock, category, location]);
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
        return res.status(404).json({ message: 'Item não encontrado.' });
      }
      res.json({ message: 'Item deletado com sucesso.' });
    } catch (error) {
      console.error('Erro ao deletar item:', error);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  },

  searchItems: async (req, res) => {
    const { query } = req.query;
    try {
      const [rows] = await pool.query('SELECT * FROM items WHERE nameItem LIKE ?', [`%${query}%`]);
      res.json(rows);
    } catch (error) {
      console.error('Erro ao buscar items:', error);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  },

  uploadFile: async (req, res) => {
    if (req.file) {
      res.status(200).json({
        message: 'Upload realizado com sucesso',
        fileUrl: req.file.location,
      });
    } else {
      res.status(400).json({ message: 'Falha no upload do arquivo' });
    }
  }
};

export { ItemsController };
