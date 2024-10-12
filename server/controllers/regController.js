import bcrypt from 'bcrypt';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL; // Admin email from environment
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD; // Admin password from environment

export const handleUserRegistration = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Validate inputs
    if (!email || !name || !password) {
      return res
        .status(400)
        .json({ message: 'Name, email, and password are required!' });
    }

    // Prevent registering as 'admin' through public registration
    if (role === 'admin') {
      return res
        .status(403)
        .json({ message: 'Registration as admin is not allowed!' });
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
      role: role || 'organizer', // Default to 'organizer' if role is not provided
    });

    await newUser.save(); // Save the new user in the database

    // Send success response with JWT token
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// This can be used to initialize an admin manually (admin credentials from the .env file)
export const handleAdminRegistration = async () => {
  try {
    // Check if an admin is already registered
    const existingAdmin = await User.findOne({
      email: ADMIN_EMAIL,
      role: 'admin',
    });
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    // Hash the admin password
    const hashedAdminPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

    // Create and save the admin user
    const adminUser = new User({
      email: ADMIN_EMAIL,
      password: hashedAdminPassword,
      name: 'Eventure Admin', // Hardcoded admin name
      role: 'admin', // Assign 'admin' role
    });

    await adminUser.save();
    console.log('Admin user registered successfully');
  } catch (error) {
    console.error('Admin Registration Error:', error);
  }
};
