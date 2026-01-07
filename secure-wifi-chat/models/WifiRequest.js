const WifiRequest = require("../models/WifiRequest");

exports.createRequest = async (req, res) => {
  try {
    const { ssid, macAddress } = req.body;

    const newReq = await WifiRequest.create({
      user: req.user.id,
      ssid,
      macAddress,
    });

    res.json({ message: "Request submitted", data: newReq });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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
