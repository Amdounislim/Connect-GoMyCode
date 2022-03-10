const { ExtractJwt, Strategy: JwtStrategy } = require("passport-jwt");
const passport = require("passport");
const config = require("config");

const User = require("../models/User");
const secretOrKey = config.get("secretOrKey");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.id).select("-password");
      user ? done(null, user) : done(null, false);
    } catch (error) {
      console.log("passport-setup", error);
    }
  })
);

module.exports = isAuth = () =>
  passport.authenticate("jwt", { session: false });
