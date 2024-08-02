const router = require('express').Router();
const { Post, User, Comment } = require('../models');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [User],
    });

    const posts = postData.map((post) => post.get({ plain: true }));
//render homepage
    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
 } catch (err) {
    res.status(500).json(err);
  }});

// Single post 
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [User, { model: Comment, include: [User] }],});

    if (!postData) {
      res.status(404).json({ message: "can not find post" });
      return;
    }

    const post = postData.get({ plain: true });

    res.render('single-post', {
      post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }});

module.exports = router;
