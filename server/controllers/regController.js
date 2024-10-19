import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
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

    // Save the new user in the database
    await newUser.save();

    // Send email confirmation
    emailConfirmation(email, name);

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

// Organizer email confirmation
export async function emailConfirmation(email, organizerName) {
  const DEV_LINK = process.env.DEV_LINK;
  // Configure the transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false, // use false for STARTTLS; true for SSL on port 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Message to be sent
  const message = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'Registration Successful - Welcome to Eventure!',
    text: `Hello ${organizerName},\n\nYour registration for Eventure has been successful!\n\nClick the link below to log in and manage your events:\n${DEV_LINK}/login\n\nBest Regards,\nEventure Team`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; color: #333;">
        <div style="text-align: center; padding: 10px;">
          <h1 style="font-size: 24px; color: #2a9df4;">Welcome to Eventure!</h1>
          <p style="font-size: 16px; color: #555;">Dear ${organizerName},</p>
          <p style="font-size: 16px; color: #555;">Your registration was successful! You're now ready to manage your events with ease.</p>
        </div>
  
        <div style="background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="font-size: 20px; color: #2a9df4;">Next Steps</h2>
          <p style="font-size: 16px;">To get started, click the button below to log in and start organizing your events:</p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="${DEV_LINK}/login" style="display: inline-block; background-color: #2a9df4; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">Log In to Eventure</a>
          </div>
        </div>
  
        <div style="background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-top: 20px;">
          <h2 style="font-size: 20px; color: #2a9df4;">Need Help?</h2>
          <p style="font-size: 16px;">If you have any questions, feel free to <a href="mailto:support@eventure.com" style="color: #2a9df4;">contact our support team</a>.</p>
        </div>
  
        <div style="margin-top: 20px; font-size: 14px; color: #777; text-align: center;">
          <p>&copy; 2024 Eventure, All rights reserved.</p>
        </div>
      </div>
    `,
  };

  // Send the email
  try {
    const info = await transporter.sendMail(message);
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error(`Email could not be sent: ${error.message}`);
  }
}
