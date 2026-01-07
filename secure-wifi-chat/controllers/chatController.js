const Chat = require('../models/Chat');

// Save a message (Operator only)
exports.saveMessage = async (req, res) => {
  try {
    const { senderId, senderName, text, originalTimestamp } = req.body;

    const savedMessage = new Chat({
      sender: senderId,
      senderName,
      text,
      savedBy: req.user.id,
      originalTimestamp,
    });

    await savedMessage.save();
    res.status(201).json({ message: 'Message saved', data: savedMessage });
  } catch (error) {
    console.error('Save message error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get saved messages (Operator only)
exports.getSavedMessages = async (req, res) => {
  try {
    const messages = await Chat.find().sort({ originalTimestamp: -1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error('Get saved messages error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
