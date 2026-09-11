const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { requireAuth } = require("../middleware/authMiddleware");

// TODO (sesi backend): register, login, logout, get current user
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/me", requireAuth, authController.me);

module.exports = router;
