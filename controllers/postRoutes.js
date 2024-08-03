const router = require("express").Router();
const { Post, Comment } = require("../models");
const authMiddleware = require("../middleware/auth");

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [{ model: Comment, attributes: ["content", "createdAt"] }],
    });
    res.render("post", { post });
  } catch (err) {
    res.status(500).json(err);
  }});

router.post("/:id/comments", authMiddleware, async (req, res) => {
  try {
    const { content } = req.body;
    await Comment.create({
      content,
      postId: req.params.id,
      userId: req.session.user_id,
    });
    res.redirect(`/posts/${req.params.id}`);
  } catch (err) {
    res.status(500).json(err);
  }});

module.exports = router;
