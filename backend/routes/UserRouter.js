// router.js

import { Router} from 'express';
const router = Router();
import { UserController } from '../controllers/UserController.js';


router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    await UserController.registerUser(username, password);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserController.loginUser(username, password);
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    const token = UserController.generateToken(user.id);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
