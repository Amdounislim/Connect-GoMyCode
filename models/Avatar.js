const mongoose = require("mongoose");

const AvatarSchema = mongoose.Schema({
  photo: {
    type: Buffer
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }
});

AvatarSchema.methods.toJSON = function() {
  const result = this.toObject();
  delete result.photo;
  return result;
};

const Avatar = mongoose.model("avatar", AvatarSchema);

module.exports = Avatar;
