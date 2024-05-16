import { createConnection } from 'mysql';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const createDBConnection = () => {
    const connection = createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });

    connection.connect(function(err) {
        if (err) {
            console.error('Error connecting to MySQL database:', err);
            return;
        }
        console.log('Connected to MySQL database successfully!');
    });

    return connection;
};

export default createDBConnection;
