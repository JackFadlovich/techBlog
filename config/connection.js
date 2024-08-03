const Sequelize = require("sequelize");
require("dotenv").config();

let sequelize;

if (process.env.DB_URL) {
  sequelize = new Sequelize(process.env.DB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: "localhost",
      dialect: "postgres",
      // port: 3001
    }
  );
}

module.exports = sequelize;


// const router = require("express").Router();
// const { User, Post, Comment } = require("../../models");

// // User signup
// router.post("/signup", async (req, res) => {
//   try {
//     const newUser = await User.create({
//       username: req.body.username,
//       email: req.body.email,
//       password: req.body.password,
//     });

//     req.session.save(() => {
//       req.session.loggedIn = true;
//       req.session.userId = newUser.id;
//       res.json(newUser);
//     });
//   } catch (err) {
//     res.status(400).json(err);
//   }});

// // User login
// router.post("/login", async (req, res) => {
//   try {
//     const user = await User.findOne({ where: { username: req.body.username } });

//     if (!user || !user.checkPassword(req.body.password)) {
//       res.status(400).json({ message: "wrong username or password" });
//       return;
//     }

//     req.session.save(() => {
//       req.session.loggedIn = true;
//       req.session.userId = user.id;
//       res.json(user);
//     });
//   } catch (err) {
//     res.status(400).json(err);
//   }});

// // User logout
// router.post("/logout", (req, res) => {
//   req.session.destroy(() => {
//     res.redirect("/");
//   });});

// // Create new post
// router.post("/post", async (req, res) => {
//   try {
//     const newPost = await Post.create({
//       title: req.body.title,
//       content: req.body.content,
//       user_id: req.session.userId,
//     });

//     res.json(newPost);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// // Comment on post
// router.post("/comment", async (req, res) => {
//   try {
//     const newComment = await Comment.create({
//       comment_text: req.body.comment_text,
//       post_id: req.body.post_id,
//       user_id: req.session.userId,
//     });

//     res.json(newComment);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// // Delete post
// router.delete("/post/:id", async (req, res) => {
//   try {
//     const postData = await Post.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.userId,
//       },});

//     if (!postData) {
//       res.status(404).json({ message: "Can not find post" });
//       return;
//     }

//     res.json(postData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Update post
// router.put("/post/:id", async (req, res) => {
//   try {
//     const postData = await Post.update(req.body, {
//       where: {
//         id: req.params.id,
//         user_id: req.session.userId,
//       },});

//     if (!postData[0]) {
//       res.status(404).json({ message: "Can not find post" });
//       return;
//     }

//     res.json(postData);
//   } catch (err) {
//     res.status(500).json(err);
//   }});

// module.exports = router;
