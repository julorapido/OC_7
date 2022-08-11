const express = require("express");
const router = express.Router();
const postController = require('../controllers/postController');
const jwtAuth = require('../middleware/authMiddleware');
router.get("/", postController.getAllPosts);
router.post("/", postController.createNewPost);

router.delete("/:id", postController.deletePost);
router.put("/:id", postController.updateSauce);
router.post("/:id", postController.likePost);

router.use("/", jwtAuth.checkToken);


module.exports = router;