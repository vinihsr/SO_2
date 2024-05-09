// models/ItemModel.js
import createDBConnection from '../db/Db.config.js';

const db = createDBConnection();

export const getAllItems = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM items', (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

export const createItem = (item) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO items VALUES ?', item, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results.insertId);
            }
        });
    });
};

export const updateItem = (itemId, updatedItem) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE items SET ? WHERE id = ?', [updatedItem, itemId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results.affectedRows);
            }
        });
    });
};

export const deleteItem = (itemId) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM items WHERE id = ?', itemId, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results.affectedRows);
            }
        });
    });
};

export default {
    getAllItems,
    createItem,
    updateItem,
    deleteItem,
};
