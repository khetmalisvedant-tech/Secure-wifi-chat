const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Example protected route
router.get('/dashboard', protect, (req, res) => {
  res.json({ message: `Welcome, user ${req.user.email}` });
});

module.exports = router;
