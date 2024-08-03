const router = require("express").Router();
const { Post, Comment } = require("../models");


router.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: Comment, attributes: ["content"] }],
    });
    res.render("homepage", { posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
