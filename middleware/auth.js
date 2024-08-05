module.exports = (req, res, next) => {
  if (req.session.user_id) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized. Please log in to continue." });
  }
};
