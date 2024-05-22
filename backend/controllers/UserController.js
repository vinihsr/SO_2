// UserController.js

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db/Db.config.js';

const UserController = {
  registerUser: async (email, senha) => {
    const hashedPassword = await bcrypt.hash(senha, 10);
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO user (id, email, senha) VALUES (?, ?, ?)', [email, hashedPassword], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  getUserByUsername: async (email) => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM user WHERE email = ?', [email], (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.length === 0) {
            resolve(null);
          } else {
            resolve(results[0]);
          }
        }
      });
    });
  },

  loginUser: async (email, senha) => {
    const user = await UserController.getUserByUsername(email);
    if (!user) {
      return null;
    }
    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) {
      return null;
    }
    return user;
  },

  generateToken: (userId) => {
    return jwt.sign({ userId }, 'testeSo');
  }
};

export { UserController };

