const express = require("express");
const router = express.Router();

// ✅ Test route
router.get("/", (req, res) => {
  res.send("✅ User routes are active and running fine!");
});

// Example user profile route
router.get("/profile", (req, res) => {
  res.json({
    name: "Ved Pawar",
    email: "ved@example.com",
    status: "Active User"
  });
});

module.exports = router;
