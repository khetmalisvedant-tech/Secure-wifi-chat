const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const wifiController = require("../controllers/wifiController");

router.post("/request", auth, wifiController.createRequest);
router.get("/my-requests", auth, wifiController.getMyRequests);
router.get("/all", auth, wifiController.getAllRequests);
router.put("/update-status/:id", auth, wifiController.updateStatus);

module.exports = router;
