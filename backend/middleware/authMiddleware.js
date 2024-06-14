/* eslint-disable no-undef */
import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // O token é geralmente enviado no formato "Bearer TOKEN"
  
  if (!token) {
    return res.status(401).json({ message: 'Acesso não autorizado. Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded; // Armazena os dados do token decodificado no objeto req
    next(); // Passa o controle para o próximo middleware ou rota
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido.' });
  }
};

export default authMiddleware;
