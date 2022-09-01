const express = require("express");
const router = express.Router();
const postController = require('../controllers/postController');
const upload = require('../middleware/uploadMiddleware');

router.get("/", postController.getAllPosts);
router.post("/", upload.uploadImage, postController.createNewPost);
router.get("/user/:id", postController.getUserPostCount);
router.delete("/:id", postController.deletePost);
router.put("/:id", postController.updatePost);
router.post("/:id", postController.likePost);

// Commentaires
router.post("/comment/:id", postController.commentPost);
router.post("/deleteComment/:id", postController.deleteCommentPost);
router.post("/modifyComment/:id", postController.editCommentPost);
//


module.exports = router;