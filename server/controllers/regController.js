import bcrypt from 'bcrypt';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

// Handle user registration
export const handleUserRegistration = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Validate inputs
    if (!email || !name || !password) {
      return res
        .status(400)
        .json({ message: 'Name, email, and password are required!' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use!' });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds for bcrypt

    // Create a new user object and save it in the database (default to 'organizer' role)
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      role: 'organizer', // Default to 'organizer' if role is not provided
    });

    await newUser.save(); // Save the new user in the database

    // Send success response with JWT token
    res.status(201).json({ message: 'Organizer registered successfully' });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Handle admin registration
export const handleAdminRegistration = async () => {
  const { name, email, password } = req.body;

  try {
    // Validate inputs
    if (!email || !name || !password) {
      return res
        .status(400)
        .json({ message: 'Name, email, and password are required!' });
    }

    // Check if an admin is already registered
    const existingAdmin = await User.findOne({
      email,
    });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin user already exists!' });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds for bcrypt

    // Create a new user object and save it in the database (default to 'organizer' role)
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      role: 'admin',
    });

    await newUser.save(); // Save the new user in the database

    // Send success response with JWT token
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
