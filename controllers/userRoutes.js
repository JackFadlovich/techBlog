const router = require("express").Router();
const { User } = require("../models");
const bcrypt = require("bcrypt");
const authMiddleware = require("../middleware/auth");

router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword });
    req.session.user_id = user.id;
    res.redirect("/");
  } catch (err) {
    res.status(500).json(err);
  }});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (user && await bcrypt.compare(password, user.password)) {
      req.session.user_id = user.id;
      res.redirect("/");
    } else {
      res.status(400).json({ message: "Invalid credentials" });}
  } catch (err) {
    res.status(500).json(err);
  }});


router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });});

module.exports = router;
