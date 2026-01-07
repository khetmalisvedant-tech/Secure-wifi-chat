// controllers/wifiController.js (add emits)

const WifiRequest = require("../models/WifiRequest");

// Create a new Wi-Fi request
exports.createRequest = async (req, res) => {
  try {
    const { ssid, macAddress } = req.body;

    const newReq = await WifiRequest.create({
      user: req.user.id,
      ssid,
      macAddress,
    });

    // emit event so operator dashboards update in real-time
    const io = req.app.get("io");
    if (io) io.emit("wifi:new-request", newReq);

    res.json({ message: "Request submitted", data: newReq });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get logged-in user's own Wi-Fi requests
exports.getMyRequests = async (req, res) => {
  try {
    const myReqs = await WifiRequest.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(myReqs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Operator: Get all Wi-Fi requests from all users
exports.getAllRequests = async (req, res) => {
  try {
    const data = await WifiRequest.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Operator: Approve or Reject request
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body; // expected: "approved" or "rejected"
    const { id } = req.params;

    const updated = await WifiRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    // emit update
    const io = req.app.get("io");
    if (io) io.emit("wifi:update-status", updated);

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
