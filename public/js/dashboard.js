const express = require('express');
const router = express.Router();
const { BlogPost } = require('../models'); // Adjust based on your actual model

// Middleware to check if user is authenticated (this is a placeholder)
function isAuthenticated(req, res, next) {
  if (req.session.user_id) {
    return next();
  }
  res.redirect('/login');
}

// Route to render the user dashboard
router.get('/', isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.user_id;

    // Fetch blog posts or any relevant data for the dashboard
    const blogPosts = await BlogPost.findAll({
      where: { userId: userId },
      order: [['createdAt', 'DESC']],
    });

    // Render the dashboard view with the blog posts data
    res.render('dashboard', { blogPosts });
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while loading the dashboard.');
  }
});

// Route to handle creating a new blog post
router.post('/create', isAuthenticated, async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.session.user_id;

    // Create a new blog post
    await BlogPost.create({
      title,
      content,
      userId,
    });

    // Redirect to the dashboard after creation
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while creating the blog post.');
  }
});

// Route to handle updating a blog post
router.post('/update/:id', isAuthenticated, async (req, res) => {
  try {
    const { title, content } = req.body;
    const postId = req.params.id;

    // Update the blog post
    await BlogPost.update(
      { title, content },
      { where: { id: postId } }
    );

    // Redirect to the dashboard after update
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while updating the blog post.');
  }
});

// Route to handle deleting a blog post

    // Redirect to the dashboard after del
