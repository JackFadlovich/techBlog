const router = require("express").Router();
const { Post } = require("../models");
const authMiddleware = require("../middleware/auth");


router.get("/", authMiddleware, async (req, res) => {
  try {
    const posts = await Post.findAll({ where: { userId: req.session.user_id } });
    res.render("dashboard", { posts });
  } catch (err) {
    res.status(500).json(err);
  }});



module.exports = router;
