function isGranted(req, res, next) {
  if (!req.user.isGranted) {
    return res.status(400).send({ errors: ["User is not Granted"] });
  }
  next();
}

module.exports = isGranted;
