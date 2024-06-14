import express, { json } from 'express';
import cors from 'cors';
import itemsRouter from './routes/ItemsRouter.js';
import UserRouter from './routes/UserRouter.js';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors({
  origin: 'http://3.144.249.248', // Allow only this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  credentials: true // Allow cookies to be sent
}));
app.use(bodyParser.json());
app.use(json());
app.use('/api', itemsRouter);
app.use('/api/users', UserRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
