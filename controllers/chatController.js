const ChatMessage = require('../models/ChatMessage');

// Send a chat message
exports.sendMessage = async (req, res) => {
  try {
    const { sender, message, ephemeral } = req.body;

    const chat = new ChatMessage({
      sender,
      message,
      ephemeral: ephemeral !== undefined ? ephemeral : true,
    });

    await chat.save();
    res.status(201).json({ message: 'Message sent', chat });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all messages (optionally only non-deleted)
exports.getMessages = async (req, res) => {
  try {
    const messages = await ChatMessage.find({ deleted: false }).populate('sender', 'username role');
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a message (soft delete)
exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await ChatMessage.findById(id);
    if (!message) return res.status(404).json({ message: 'Message not found' });

    message.deleted = true;
    await message.save();

    res.json({ message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
