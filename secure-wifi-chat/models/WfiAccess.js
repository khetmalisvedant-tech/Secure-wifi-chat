const mongoose = require('mongoose');

const wifiAccessSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ssid: { type: String, required: true },
  macAddress: { type: String },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  deviceDetails: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('WifiAccess', wifiAccessSchema);
