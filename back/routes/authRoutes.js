const express = require("express");
const router = express.Router();
const authController = require('../controllers/authController');
const upload = require('../middleware/uploadMiddleware');

router.post("/signup", authController.signup);
router.post("/login", authController.login);
//router.get("/logout", authController.logout);
router.get("/", authController.getAllMembers);
router.get("/users", authController.getUserCount);
router.get("/:id", authController.getSpecificUser);

router.put("/:id", upload.uploadImage, authController.updateUserPicture);
router.post("/:id", authController.editUser);

module.exports = router;