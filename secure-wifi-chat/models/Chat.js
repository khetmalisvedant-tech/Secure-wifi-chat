const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  senderName: { type: String, required: true }, // Store name at time of message
  text: { type: String, required: true },
  savedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Operator who saved it
  originalTimestamp: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Chat', chatSchema);
