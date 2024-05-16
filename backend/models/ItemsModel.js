import createDBConnection from '../db/Db.config.js';

const db = createDBConnection();

export const getAllItems = () => {
    // Implement getAllItems logic here
};

export const createItem = (item) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO items SET ?', item, (error, results) => {
            if (error) {
                console.error('Error inserting item:', error);
                reject(error);
            } else {
                resolve(results.insertId);
            }
        });
    });
};

export const updateItem = (itemId, updatedItem) => {
    // Implement updateItem logic here
};

export const deleteItem = (itemId) => {
    // Implement deleteItem logic here
};

export default {
    getAllItems,
    createItem,
    updateItem,
    deleteItem,
};
