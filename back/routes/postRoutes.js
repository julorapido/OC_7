const express = require("express");
const router = express.Router();
const postController = require('../controllers/postController');

router.get("/", postController.getAllPosts);
router.post("/", postController.createNewPost);

router.delete("/:id", postController.deletePost);
router.put("/:id", postController.updateSauce);
router.post("/:id", postController.likePost);

module.exports = router;