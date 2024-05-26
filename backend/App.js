import express, { json } from 'express';
import cors from 'cors';
import itemsRouter from './routes/ItemsRouter.js';
import UserRouter from './routes/UserRouter.js';
import bodyParser from 'body-parser';
import path from 'path'; // Adiciona esta linha
import { fileURLToPath } from 'url'; // Adiciona esta linha
import { dirname } from 'path'; // Adiciona esta linha

const __filename = fileURLToPath(import.meta.url); // Adiciona esta linha
const __dirname = dirname(__filename); // Adiciona esta linha

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(json());
app.use('/api', itemsRouter);
app.use('/api', UserRouter);

// Servir arquivos estáticos da pasta uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

