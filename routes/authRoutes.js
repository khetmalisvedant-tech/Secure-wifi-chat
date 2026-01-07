const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Example protected route
router.get('/dashboard', protect, (req, res) => {
  res.json({ message: `Welcome, user ${req.user.email}` });
});

module.exports = router;
