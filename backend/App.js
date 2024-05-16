import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/ItemsRouter.js';
import createDBConnection from './db/Db.config.js';

dotenv.config();
const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

// Create database connection
const db = createDBConnection();

// Pass database connection to the router
router.db = db;

// Add item routes
app.use('/api', router);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
