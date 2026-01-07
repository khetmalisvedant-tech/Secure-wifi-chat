const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

router.get("/dashboard", auth, (req, res) => {
    res.json({
        message: "Welcome to the protected dashboard!",
        userId: req.user
    });
});

module.exports = router;
