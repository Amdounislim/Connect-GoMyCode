const express = require("express");
const {
  validator,
  editAccountValidation
} = require("../middlewares/checkValidator");
const {
  editUser,
  deleteUser,
  getAllUsers,
  getUserById
} = require("../controllers/usersController");
const isAuth = require("../middlewares/passport-setup");
const router = express.Router();

//@route GET  api/users/
//@desc  GET ALL USERS
//@acess Publoc
router.get("/", getAllUsers);

//@route GET  api/users/:id
//@desc  GET user by id
//@acess Publoc
router.get("/:id", getUserById);

//@route PUT api/users/
//@desc  EDIT User
//@acess Private
router.put("/", editAccountValidation(), validator, isAuth(), editUser);

//@route DELETE api/users/
//@desc  DELETE User && Profile
//@acess Private
router.delete("/", isAuth(), deleteUser);

module.exports = router;
