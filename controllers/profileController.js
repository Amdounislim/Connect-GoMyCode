const Profile = require("../models/Profile");

const profileController = {
  createOrEditProfile: async (req, res) => {
    const { location, status, bio, linkedin, github } = req.body;
    const profileFields = {};

    profileFields.user = req.user._id;
    if (location) profileFields.location = location;
    if (status) profileFields.status = status;
    if (bio) profileFields.bio = bio;

    //build a social object
    profileFields.social = {};

    if (linkedin) profileFields.social.linkedin = linkedin;
    if (github) profileFields.social.github = github;

    try {
      let profile = await Profile.findOne({ user: req.user._id });
      if (profile) {
        //Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user._id },
          { $set: profileFields },
          { new: true }
        );
        return res.send(profile);
      }
      //Create a profile
      profile = new Profile(profileFields);
      await profile.save();
      res.send(profile);
    } catch (error) {
      console.log(error);
      res.status(500).send(`Server Error ! :${error.message}`);
    }
  },
  /**
   * @desc Add Experience or education or gomycode certificate or project
   */
  addNewInformation: async (req, res, infoName) => {
    const newInfo = {
      ...req.body
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });

      //Avoid Double skill
      // const existingSkill = profile.skills.find(
      //   skill => skill.skill.toLowerCase() === newInfo.skill.toLowerCase()
      // );

      if (
        infoName === "skills" &&
        profile.skills.find(
          skill => skill.skill.toLowerCase() === newInfo.skill.toLowerCase()
        )
      ) {
        return res.status(401).send({ errors: ["Skill already Existing !"] });
      }

      //Avoid Duration issues
      if (
        (infoName === "education" || infoName === "experiences") &&
        !newInfo.current &&
        !newInfo.to
      ) {
        return res
          .status(401)
          .send({ errors: ["Please put the exact duration!"] });
      }

      profile[infoName].unshift(newInfo);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.log(error);
      res.status(500).send(`Server Error ! :${error.message}`);
    }
  },
  /**
   * @desc delete Experience or education or gomycode certificate or project
   */
  deleteInformation: async (req, res, infoName) => {
    try {
      const profile = await Profile.findOne({ user: req.user._id });

      profile[infoName] = profile[infoName].filter(
        info => info._id.toString() !== req.params.id
      );

      await profile.save();
      res.send(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error !");
    }
  },
  getAllgrantedProfiles: async (req, res) => {
    try {
      const profiles = await Profile.find().populate("user", [
        "name",
        "lastName",
        "email",
        "phone",
        "isGranted"
      ]);
      res.send(profiles);
    } catch (error) {
      res.status(500).send(`Server Error ! :${error.message}`);
    }
  },
  getProfileById: async (req, res, userId) => {
    try {
      const profile = await Profile.findOne({ user: userId }).populate("user", [
        "name",
        "lastName",
        "email",
        "phone",
        "isGranted"
      ]);
      if (!profile) {
        return res.status(400).json({ msg: "profile not found" });
      }
      res.send(profile);
    } catch (error) {
      res.status(500).send(`Server Error ! :${error.message}`);
    }
  }
};

module.exports = profileController;
