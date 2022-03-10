function isAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(400).send({ errors: ["Access denied"] });
  }
  next();
}

module.exports = isAdmin;
