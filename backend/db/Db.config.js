import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });


    pool.connect((err) => {
        if (err) {
          console.error('Erro ao conectar: ' + err.stack);
          return;
        }
        console.log('Conectado como ID ' + connection.threadId);
      });
      

export default pool;
