// db/dbConfig.js
import { createConnection } from 'mysql';

const createDBConnection = () => {
    const db = createConnection({
        host: 'localhost',
        user: 'root',
        password: 'vinielivia12345678',
        database: 'BancoSoTeste'
    });

    return db;
};

export default createDBConnection;
