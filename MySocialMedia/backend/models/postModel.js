const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
     
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        required: true
      },
    ],
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Auth',
            required: true
        },
        comment: {
            type: String,
            required: true
        },
        commentPic: {
            type: String
        },
        commentUsername: {
            type: String
        },
       
    }],
    userPic: {
      type: String
    },
    usernamePost: {
      type: String
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
