const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

// ✅ Protected Operator Dashboard route
router.get("/dashboard", auth, (req, res) => {
  res.json({
    message: `Welcome ${req.user.id}, this is the protected Operator Dashboard.`,
    user: req.user
  });
});

module.exports = router;
