const express = require("express");
const router = express.Router();
const postController = require('../controllers/postController');
router.get("/", postController.getAllPosts);
router.post("/", postController.createNewPost);

router.delete("/:id", postController.deletePost);
router.put("/:id", postController.updatePost);
router.post("/:id", postController.likePost);




module.exports = router;