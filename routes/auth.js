const express = require("express");

const {
  validator,
  registerValidation,
  loginValidation
} = require("../middlewares/checkValidator");
const { register, login, current } = require("../controllers/authController");
const isAuth = require("../middlewares/passport-setup");

const router = express.Router();

//@route POST api/auth/register
//@desc  Register User
//@acess Public
router.post("/register", registerValidation(), validator, register);

//@route POST api/auth/login
//@desc  LOGIN User
//@acess Public
router.post("/login", loginValidation(), validator, login);

//@route POST api/auth/
//@desc  GET USERES
//@acess Private

router.get("/", isAuth(), current);

module.exports = router;
