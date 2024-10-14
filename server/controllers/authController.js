import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_KEY;

export const handleLoginAuth = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email!' });
    }

    // Compare passwords using bcrypt
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password!' });
    }

    // Check if user exists
    if (!user && !isPasswordValid) {
        return res.status(401).json({ message: 'User does not exist!' });
    }

    // Generate JWT token with user id and role
    const token = jwt.sign(
      { id: user._id, role: user.role }, // Embed role in the token
      JWT_SECRET,
      { expiresIn: '1h' } // Token expiry time
    );

    // Send token back to client
    res.status(200).json({ token });

  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};