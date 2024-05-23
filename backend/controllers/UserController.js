import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import User, { findOne } from '../models/User';

export async function register(req, res) {
    try {
        const { id, email, senha } = req.body;
        const hashedPassword = await hash(senha, 10);
        const user = new User({ id, email, senha: hashedPassword });
        await user.save();
        res.status(201).send('User registered successfully');
    } catch (err) {
        res.status(500).send('Server error');
    }
}

export async function login(req, res) {
    try {
        const { email, senha } = req.body;
        const user = await findOne({ email });
        if (!user) return res.status(400).send('Invalid email or senha');

        const isMatch = await compare(senha, user.senha);
        if (!isMatch) return res.status(400).send('Invalid email or senha');

        const token = sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).send('Server error');
    }
}

