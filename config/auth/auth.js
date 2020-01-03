exports.ensure_authenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.json({ msg: "User must be logged in to view this resource" });
};
