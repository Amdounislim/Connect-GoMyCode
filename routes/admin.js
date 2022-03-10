const express = require("express");
const isAdmin = require("../middlewares/isAdmin");
const isGranted = require("../middlewares/isGranted");
const { validator, scoreRules } = require("../middlewares/checkValidator");
const {
  toggleGrantUser,
  deleteUser,
  makeItAdmin,
  addScore
} = require("../controllers/adminController");
const isAuth = require("../middlewares/passport-setup");
const router = express.Router();

//@route PUT api/admin/:userId/:gmc_track_id
//@desc  grant User
//@acess Private
router.put("/:id", isAuth(), isAdmin, isGranted, toggleGrantUser);
//@route PUT api/admin/add_score/:userid/:gmc_id
//@desc  grant User
//@acess Private
router.put(
  "/add_score/:id/:gomycodeId",
  scoreRules(),
  validator,
  isAuth(),
  isAdmin,
  isGranted,
  addScore
);
//@route PUT api/admin/add_admin/:userId
//@desc  Make admin
//@acess Private
router.put("/add_admin/:id", isAuth(), isAdmin, isGranted, makeItAdmin);

//@route DELETE api/admin/:userId
//@desc  DELETE User && Profile
//@acess Private
router.delete("/:id", isAuth(), isAdmin, isGranted, deleteUser);

module.exports = router;
