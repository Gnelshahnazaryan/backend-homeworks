const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller.js");
const authController = require("../controllers/auth.controller.js");

const { isAdmin } = require("../middlewares/isAdmin.middleware.js");
const { authMiddleware } = require("../middlewares/auth.middleware.js");
const { validateUser } = require("../middlewares/validateUser.middleware.js");

router.get("/", authMiddleware, isAdmin, userController.getUsers);
router.get("/:id", authMiddleware, isAdmin, userController.getUser);
router.post("/register", validateUser, authController.registerUser);
router.post("/login", authMiddleware, authController.loginUser);
router.put("/:id", validateUser, userController.updateUser);
router.delete("/:id", authMiddleware, isAdmin, userController.deleteUser);

module.exports = router;
