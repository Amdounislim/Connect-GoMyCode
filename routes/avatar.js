const express = require("express");
const multer = require("multer");
const Avatar = require("../models/Avatar");
const isAuth = require("../middlewares/passport-setup");
const router = express.Router();

const upload = multer({
  limits: {
    fileSize: 1000000 // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg)$/)) {
      cb(new Error("only upload files with jpg or jpeg format."));
    }
    cb(undefined, true); // continue with upload
  }
});

router.post("/", isAuth(), upload.single("avatar"), async (req, res) => {
  try {
    const file = req.file.buffer;
    const newAvatar = { ...req.body, user: req.user._id };
    let avatar = await Avatar.findOne({ user: req.user._id });
    newAvatar.photo = file;
    if (avatar) {
      //Update
      await Avatar.findOneAndUpdate(
        { user: req.user._id },
        { $set: newAvatar },
        { new: true }
      );
      console.log("update");
      return res.json(avatar);
    }
    avatar = new Avatar(newAvatar);
    console.log("create");
    // avatar.photo = file;
    await avatar.save();
    res.json(avatar);
  } catch (error) {
    res.status(500).send({ errors: [error.message] });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await Avatar.findOne({ user: req.params.id });
    if (!result) {
      return res.status(500).send({ errors: ["Avatar not found"] });
    }
    res.set("Content-Type", "image/jpeg");
    res.send(result.photo);
  } catch (error) {
    res.status(400).send({ errors: ["Error while getting photo."] });
  }
});

module.exports = router;
