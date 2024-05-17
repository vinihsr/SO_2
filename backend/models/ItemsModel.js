import pkg from 'mysql';
const { query } = pkg;

export const getAllItems = async () => {
  const [rows] = await query('SELECT * FROM items');
  return rows;
};

export const addItem = async (item) => {
  const { name, photo, description, price, sellPrice, amount, minStock, category, location } = item;
  const [result] = await query(
    'INSERT INTO items (name, photo, description, price, sellPrice, amount, minStock, category, location) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [name, photo, description, price, sellPrice, amount, minStock, category, location]
  );
  return { id: result.insertId, ...item };
};

export default {
  getAllItems,
  addItem
};
