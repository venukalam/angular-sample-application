const express = require("express");
const router = express.Router();
const userController = require("./userController");
const auth = require("../middleware/auth")

router.post("/register", userController.registerNewUser);
router.post("/login", userController.loginUser);
router.get("/analytics", userController.analytics);

module.exports = router;