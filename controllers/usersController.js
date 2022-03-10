const bcrypt = require("bcrypt");
const User = require("../models/User");
const Profile = require("../models/Profile");

const usersControler = {
  getUserById: async (req, res) => {
    const _id = req.params.id;
    try {
      const user = await User.findById(_id).select("-password");
      res.send(user);
    } catch (error) {
      res.status(500).send(`Server Error ! :${error.message}`);
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({ role: "user" }).select("-password");
      res.send(users);
    } catch (error) {
      res.status(500).send(`Server Error ! :${error.message}`);
    }
  },
  editUser: async (req, res) => {
    const _id = req.user._id;
    const {
      name,
      lastName,
      email,
      phone,
      currentPassword,
      newPassword
    } = req.body;

    let updatedUser = {};

    if (name) updatedUser.name = name;

    if (lastName) updatedUser.lastName = lastName;

    if (email) updatedUser.email = email;

    if (phone) updatedUser.phone = phone;

    try {
      if (!currentPassword && newPassword) {
        return res
          .status(400)
          .send({ errors: ["Both passwords required to make a change"] });
      }

      if (currentPassword) {
        //Find the user to access the password if needed
        const currentUser = await User.findById(_id);
        if (!newPassword || newPassword.length < 6 || newPassword.length > 20) {
          return res
            .status(400)
            .send({ errors: ["Enter a valid new Password"] });
        }
        //check the the credentials
        const isMatch = await bcrypt.compare(
          currentPassword,
          currentUser.password
        );
        console.log(isMatch);
        if (!isMatch) {
          return res.status(400).send({ errors: ["Invalid credentials!"] });
        }

        //hash the new password
        const salt = await bcrypt.genSalt(10);
        updatedUser.password = await bcrypt.hash(newPassword, salt);
      }

      const editedUser = await User.findOneAndUpdate(
        { _id },
        { $set: updatedUser },
        { new: true }
      );
      res.send(editedUser);
    } catch (error) {
      res.status(500).send(`Server Error ! :${error.message}`);
    }
  },

  deleteUser: async (req, res) => {
    const _id = req.user._id;
    try {
      const deletedUser = await User.findOneAndRemove({ _id });
      const deletedProfile = await Profile.findByIdAndRemove({ _id });
      res.send({ msg: "Ok", deletedUser, deletedProfile });
    } catch (error) {
      res.status(500).send(`Server Error ! :${error.message}`);
    }
  }
};
module.exports = usersControler;
