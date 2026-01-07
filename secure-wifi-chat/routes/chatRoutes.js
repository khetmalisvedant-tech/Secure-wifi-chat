const express = require('express');
const router = express.Router();
const { saveMessage, getSavedMessages } = require('../controllers/chatController');
const protect = require('../middleware/authMiddleware');

const operatorOnly = (req, res, next) => {
  if (req.user && req.user.role === 'operator') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Operators only.' });
  }
};

router.post('/save', protect, operatorOnly, saveMessage);
router.get('/history', protect, operatorOnly, getSavedMessages);

module.exports = router;
