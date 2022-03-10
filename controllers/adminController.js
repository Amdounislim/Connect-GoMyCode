const User = require("../models/User");
const Profile = require("../models/Profile");
const Avatar = require("../models/Avatar");
const superAdminId = require("config").get("superAdminId");

const adminControler = {
  toggleGrantUser: async (req, res) => {
    const _id = req.params.id;
    try {
      //Protect super admin
      if (_id === superAdminId) {
        return res.status(401).send({
          errors: ["Cannot change accecss , this is a protected User"]
        });
      }

      const editedUser = await User.findById(_id);

      if (!editedUser) {
        return res.status(400).send({ errors: ["User dosent exist"] });
      }

      // toggle isGranted
      editedUser.isGranted = !editedUser.isGranted;

      await editedUser.save();
      res.send(editedUser);
    } catch (error) {
      console.log(error);
      res.status(500).send(`Server Error ! :${error.message}`);
    }
  },
  addScore: async (req, res) => {
    const { checkpoint, onetoone } = req.body;
    const _id = req.params.id;
    const gmcid = req.params.gomycodeId;
    console.log("gmc id ", gmcid);

    try {
      if (!checkpoint || !onetoone) {
        return res
          .status(400)
          .send({ errors: ["There is a missing information"] });
      }

      const profile = await Profile.findOne({ user: _id });
      if (!profile) {
        return res
          .status(400)
          .send({ errors: ["This user dont have a profile yet"] });
      }

      if (!profile.gomycode || !profile.gomycode[0]) {
        return res
          .status(400)
          .send({ errors: ["This user didn't add a gomycode certification"] });
      }

      profile.gomycode.map(certif => {
        if (certif._id.toString() === gmcid) {
          certif.onetoone = onetoone;
          certif.checkpoint = checkpoint;
        }
      });

      await profile.save();
      res.send(profile);
    } catch (error) {
      console.log(error);
      res.status(500).send(`Server Error ! :${error.message}`);
    }
  },

  deleteUser: async (req, res) => {
    const _id = req.params.id;
    try {
      //Protect super admin
      if (_id === superAdminId) {
        return res
          .status(401)
          .send({ errors: ["Cannot delete this protected User"] });
      }

      const deletedUser = await User.findOneAndRemove({ _id });
      // user dosent exist
      if (!deletedUser) {
        return res.status(400).send({ errors: ["User dosent exist"] });
      }

      await Profile.findByIdAndRemove({ _id });
      await Avatar.findByIdAndRemove({ _id });
      res.send({ msg: "Ok" });
    } catch (error) {
      console.log(error.message);
      res.status(500).send(`Server Error ! :${error.message}`);
    }
  },
  makeItAdmin: async (req, res) => {
    const _id = req.params.id;

    try {
      const editedUser = await User.findById(_id);

      //user dosent exist
      if (!editedUser) {
        return res.status(400).send({ errors: ["User dosent exist"] });
      }

      editedUser.role = "admin";
      editedUser.isGranted = true;

      await editedUser.save();
      res.send(editedUser);
    } catch (error) {
      console.log(error);
      res.status(500).send(`Server Error ! :${error.message}`);
    }
  }
};
module.exports = adminControler;
