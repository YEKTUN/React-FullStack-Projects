const UserInfo = require("../models/userInfoModel");
const Auth = require("../models/authModel");
const updateInfo = async (req, res) => {
  try {
    const userId = req.params.id;
    
    const user = await UserInfo.findOne({ user: userId });

    const { name, surname, tel, about,email } = req.body;
    


    if (!user) {
      const authUser = await Auth.findById(userId);
      
      if (!authUser) {
        
        return res.status(404).json({ message: "Auth user not found" });
      }

      const userInfo = new UserInfo({
        name: name || "",
        surname: surname || "",
        tel: tel || "",
        about: about || "",
        user: req.user._id,
        email: authUser.email,
         // Auth'tan email al
      });
      
      await userInfo.save();
      
    } else {
      
      user.name = name || user.name;
      user.surname = surname || user.surname;
      user.tel = tel || user.tel;
      user.about = about || user.about;

      user.email = email || user.email; 
      if (!user.email) {
        const authUser = await Auth.findById(userId);
        if (authUser) {
          user.email = authUser.email; 
        }
      }

      await user.save();
      
    }

    res.status(200).json({ message: "User information updated successfully" });
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


const getInfo = async (req, res) => {
  try {
    const userId = req.params.id;
    const customUser = await Auth.findById(userId);
    const user = await UserInfo.findOne({ user: userId });
    if (!user) {
      const tempUser=new UserInfo({user:userId,email:customUser.email})
      await tempUser.save()
      
    }
    if (!userId) {
      throw new Error("User ID is required");
    }
    res.status(200).json( user );
    
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
const searchUsers = async (req, res) => {
  try {
    const { username } = req.params;
    const currentUser = req.user._id;
    if (username.trim === "") return;

    const users = await Auth.find({
      username: { $regex: username, $options: "i" },
      _id: { $ne: currentUser },
    });

    res.status(200).json({ users });
  } catch (error) {
    
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  updateInfo,
  getInfo,
  searchUsers,
};
