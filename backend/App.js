import Express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/ItemsRouter.js'; // Import your item routes

dotenv.config();
const app = Express();

app.use(Express.json());

// Configure CORS
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, 
}));

// Add your item routes
app.use('/api', router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
