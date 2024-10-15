const mongoose = require("mongoose");
const { type } = require("os");

const authSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    followers: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Auth",
          required: true,
        },
        followerPic: {
          type: String,
          default:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        },
        followerUsername: {
          type: String,
          required: true,
        },
      },
    ],
    followings: [
        {
            user: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Auth",
              required: true,
            },
            followingPic: {
              type: String,
              default:
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            },
            followingUsername: {
              type: String,
              required: true,
            },
          },
        ]
  },

  { timestamps: true }
);
module.exports = mongoose.model("Auth", authSchema);
