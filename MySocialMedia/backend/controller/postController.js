const Post = require("../models/postModel");
const Auth = require("../models/authModel.js");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const upload = multer({ dest: "uploads/" });
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const getPost = async (req, res) => {
  try {
    const userId = req.params.id;
    const posts = await Post.find({ user: userId });
    res.status(200).json({ posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const createPost = async (req, res) => {
  try {
    const { description, likes, comments } = req.body;

   
    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }

    let newPost = {};

   
    if (req.file) {
      const filePath = req.file.path;
      const folderName = "MySocialApp";

     
      cloudinary.uploader.upload(
        filePath,
        { folder: folderName },
        async (error, result) => {
          if (error) {
            return res.status(500).json({ message: error.message });
          }

      
          fs.unlinkSync(filePath);

          
          newPost = new Post({
            description: description,
            image: result.secure_url,
            user: req.user._id,
            likes: likes,
            comments: comments,
            userPic: req.user.profilePic,
            usernamePost: req.user.username,
          });

          await newPost.save();
          res.status(200).json({ newPost });
        }
      );
    } else {
      // Resim yoksa sadece metinle yeni gönderi oluştur
      newPost = new Post({
        description: description, // Sadece metin
        user: req.user._id,
        likes: likes,
        comments: comments,
        userPic: req.user.profilePic,
        usernamePost: req.user.username,
      });

      await newPost.save();
      res.status(200).json({ newPost });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const likesUpdate = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // post.likes, null veya undefined olabileceği için kontrol et
    if (!post.likes) {
      post.likes = [];
    }

    const userIndex = post.likes.indexOf(userId);

    if (userIndex === -1) {
      
      post.likes.push(userId);
    } else {
      post.likes.splice(userIndex, 1);
    }

    
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { likes: post.likes }, 
      { new: true } 
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ post: updatedPost });
  } catch (error) {
    console.error("Error updating likes:", error); 
    res.status(500).json({ message: error.message });
  }
};

const commentUpdate = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    
    const newComment = {
      user: userId,
      comment: req.body.comment,
      commentPic: req.body.commentPic,
      commentUsername: req.body.commentUsername,
     
    };

  
    post.comments.push(newComment);
    


    await post.save();

   
    res.status(200).json({ post });
  } catch (error) {
    console.error("Error updating comments:", error);
    res.status(500).json({ message: error.message });
  }
};
const getComments = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ comments: post.comments });
  } catch (error) {
    console.error("Error getting comments:", error);
    res.status(500).json({ message: error.message });
  }
};
const updateProfilePic = async (req, res) => {
  try {
    if (!req.file) {
      
    }
    const filePath = req.file.path;
    const folderName = "ProfilePic";
    cloudinary.uploader.upload(
      filePath,
      { folder: folderName },
      async (error, result) => {
        if (error) {
          return res.status(500).json({ message: error.message });
        }
        fs.unlinkSync(filePath);
        
        const userId = req.user._id;
        const user = await Auth.findById(userId);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        user.profilePic = result.secure_url;
        await user.save();
        

        return res
          .status(200)
          .json({ message: "Profile picture uploaded successfully" });
      }
    );
  } catch (error) {
    
    return res.status(500).json({ message: "Server error", error });
  }
};
const getProfilPic = async (req, res) => {
  const userId = req.user._id; // req.user'dan userId alınıyor
  const userParam = req.params.id; // route parametresinden gelen user id

  let user;

  try {
    // Eğer parametrede bir user id varsa onu, yoksa mevcut kullanıcı id'sini al
    if (userParam) {
      user = await Auth.findById(userParam);
    } else {
      user = await Auth.findById(userId);
    }

    // Eğer kullanıcı bulunamazsa
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Kullanıcının profil fotoğrafını dön
    return res.status(200).json({ profilePic: user.profilePic });
  } catch (error) {
    // Hata durumunda hata mesajı döner
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

const getUserInfo = async (req, res) => {
  const userParam = req.params.id; // route parametresinden gelen user id
  let user; // user değişkeni if bloğunun dışında tanımlandı

  try {
    // Eğer parametrede bir user id varsa onu, yoksa mevcut kullanıcı id'sini al
    if (userParam) {
      user = await Auth.findById(userParam); // user if bloğunun içinde güncelleniyor
    }

    // Eğer kullanıcı bulunamazsa
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Kullanıcı bilgilerini döndür
    
    return res.status(200).json({ user });
  } catch (error) {
    // Hata durumunda hata mesajı döner
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const getUserProfileInfo = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await Auth.findById(userId);

   
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

   
    
    return res.status(200).json({ user });
  } catch (error) {
    // Hata durumunda hata mesajı döner
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
const mixGetPost = async (req, res) => {
  
  try {
    
    const posts = await Post.aggregate([
      { $sample: { size: 10 } }  
    ]);
  
    res.status(200).json({ posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.error("Error getting posts:", error,error.message);
  }
};
const followAdd = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await Auth.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const followingId = req.params.id;
    console.log("user and followingId",followingId, userId);
    if (userId.toString() === followingId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const following = await Auth.findById(followingId);
    if (!following) {
      return res.status(404).json({ message: "Following user not found" });
    }

    // Kullanıcı zaten takip ediyorsa
    if (user.followings.some(following => following.user.toString() === followingId.toString())) {
      return res.status(400).json({ message: "You are already following this user" });
    }
    if (following.followers.some(follower => follower.user.toString() === userId.toString())) {
      return res.status(400).json({ message: "You are already following this user" });
    }
  

    // Takip etme işlemi
    user.followings.push({
      user: followingId,
      followingPic: following.profilePic,
      followingUsername: following.username,
    });
    await user.save();

    following.followers.push({
      user: userId,
      followerPic: user.profilePic,
      followerUsername: user.username,
    });
    await following.save();

    return res.status(200).json({ message: "Followed successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const followSub = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await Auth.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const followingId = req.params.id;
    console.log("user and followingId",followingId, userId);
    if (userId.toString() === followingId) {
      return res.status(400).json({ message: "You cannot unfollow yourself" });
    }

    const following = await Auth.findById(followingId);
    if (!following) {
      return res.status(404).json({ message: "Following user not found" });
    }

    // Kullanıcıyı takip etmiyorsa
    const followingIndex = user.followings.findIndex(following => following.user.toString() === followingId.toString());
    if (followingIndex === -1) {
      return res.status(400).json({ message: "You are not following this user" });
    }

    // Unfollow işlemi
    user.followings.splice(followingIndex, 1); // Takipten çıkar
    await user.save();

    const followerIndex = following.followers.findIndex(follower => follower.user.toString() === userId.toString());
    if (followerIndex !== -1) {
      following.followers.splice(followerIndex, 1); // Diğer kullanıcının da takipçilerinden çıkar
      await following.save();
    }

    return res.status(200).json({ message: "Unfollowed successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getPost,
  createPost,
  likesUpdate,
  commentUpdate,
  getComments,
  updateProfilePic,
  getProfilPic,
  getUserInfo,
  getUserProfileInfo,
  mixGetPost,
  followAdd,
  followSub
};
