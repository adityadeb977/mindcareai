const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

/**
 * @desc    Register a new user
 * @route   POST /api/users/register
 * @access  Public
 */
const registerUser = async (req, res) => {
  // Get name, email, and password from the request body
  const { name, email, password } = req.body;

  // Check if a user with this email already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: 'User already exists' });
    return; // Stop execution
  }

  // Create a new user in the database
  // The password will be automatically hashed by the middleware in userModel.js
  const user = await User.create({
    name,
    email,
    password,
  });

  // If the user was created successfully
  if (user) {
    // Send back the user's data and a token
    res.status(201).json({
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

/**
 * @desc    Auth user & get token (Login)
 * @route   POST /api/users/login
 * @access  Public
 */
const authUser = async (req, res) => {
  const { email, password } = req.body;

  // Find the user by their email
  const user = await User.findOne({ email });

  // Check if user exists AND if the entered password matches the stored one
  if (user && (await user.matchPassword(password))) {
    res.json({
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } else {
    // Use a generic error message for security
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

module.exports = { registerUser, authUser };