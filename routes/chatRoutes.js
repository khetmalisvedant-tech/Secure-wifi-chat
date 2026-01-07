const express = require('express');
const router = express.Router();
const { sendMessage, getMessages, deleteMessage } = require('../controllers/chatController');

// Routes
router.post('/', sendMessage);        // Send a message
router.get('/', getMessages);         // Get all messages
router.delete('/:id', deleteMessage); // Delete a message (soft)

module.exports = router;
