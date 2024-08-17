const router = require("express").Router();
const { Comment } = require("../models");
const authMiddleware = require("../middleware/auth");

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { postId, content } = req.body;
    const dateCreated = new Date();
    await Comment.create({ content, postId, userId: req.session.user_id , dateCreated });
    //res.redirect(`/posts/${postId}`);
  } catch (err) {
    res.status(500).json(err);
  }});

module.exports = router;