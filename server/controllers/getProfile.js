import User from '../models/User.js';

export const getProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized access!' });
    }

    const userId = req.user.id; // Extracted from the token by verifyToken middleware

    const user = await User.findById(userId).select('-password -role -__v');

    // const user = await User.findById(userId).select('-password -__v role'); // Fetch the user without the password

    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    res.status(200).json({ profile: user });
  } catch (error) {
    console.error('Error fetching profile:', error); // Log the error for debugging
    res.status(500).json({ message: 'Server error' });
  }
};
