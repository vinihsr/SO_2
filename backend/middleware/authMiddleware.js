import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token inválido.' });
  }
};

export default authMiddleware;
