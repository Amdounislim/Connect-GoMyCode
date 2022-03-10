const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../models/User");
const secret = config.get("secretOrKey");

const authControler = {
  register: async (req, res) => {
    const { name, lastName, email, password, phone } = req.body;
    try {
      let user = await User.findOne({ email });

      //Chek if user exists
      if (user) {
        return res.status(400).send({ errors: ["User Already exists"] });
      }

      //Create new User
      user = new User({
        name,
        lastName,
        email,
        phone,
        password,
        role: "user",
        isGranted: false
      });

      //Hash the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      //Save the new User
      await user.save();

      //Sign in the user
      const payload = {
        id: user._id
      };
      const token = await jwt.sign(payload, secret);
      res.send({
        token: `Bearer ${token}`,
        user: {
          _id: user._id,
          name,
          lastName,
          email,
          phone,
          role: "user",
          isGranted: false
        }
      });
    } catch (error) {
      res.status(500).send(`Server Error ! :${error.message}`);
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });

      //check if user exists
      if (!user) {
        return res.status(400).send({ errors: ["Invalid credentials !"] });
      }

      //check password match
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).send({ errors: ["Invalid credentials !"] });
      }

      //Sign in the user
      const payload = {
        id: user._id
      };
      const token = await jwt.sign(payload, secret);

      res.send({
        token: `Bearer ${token}`,
        user
      });
    } catch (error) {
      res.status(500).send(`Server Error ! :${error.message}`);
    }
  },

  current: async (req, res) => {
    try {
      res.send(req.user);
    } catch (error) {
      res.status(500).send(`Server Error ! :${error.message}`);
    }
  }
};

module.exports = authControler;
