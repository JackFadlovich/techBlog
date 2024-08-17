const router = require("express").Router();
const { Post, Comment } = require("../models");
const authMiddleware = require("../middleware/auth");


router.post("/new", authMiddleware, async (req, res) => {
  try {
    const { title, text } = req.body;
    const newPost =await Post.create({ title, text, userId: req.session.user_id });
    //res.redirect("/dashboard");
    res.json(newPost)
  } catch (err) {
    res.status(500).json(err);
  }});


router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [{ model: Comment, attributes: ["content", "createdAt"] }],
    });
    res.render("post", { post });
  } catch (err) {
    res.status(500).json(err);
  }});


module.exports = router;
