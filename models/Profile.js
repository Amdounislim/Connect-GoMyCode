const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },

  location: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },

  skills: [
    {
      skill: {
        type: String,
        required: true
      },
      level: {
        type: String,
        required: true
      }
    }
  ],
  bio: {
    type: String
  },

  gomycode: [
    {
      track: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      checkpoint: {
        type: String
      },
      onetoone: {
        type: String
      }
    }
  ],

  //Array of Object
  experiences: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  //Array of Object

  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldofstudy: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],

  projects: [
    {
      title: {
        type: String,
        required: true
      },
      githubLink: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      image: {
        type: String
      }
    }
  ],

  social: {
    linkedin: {
      type: String
    },
    github: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
