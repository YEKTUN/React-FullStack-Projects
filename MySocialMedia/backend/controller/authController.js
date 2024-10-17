const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Auth = require('../models/authModel');
const UserInfo = require('../models/userInfoModel');

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Kullanıcı adının varlığını kontrol et
        const existingUsername = await Auth.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // E-posta adresinin varlığını kontrol et
        const existingEmail = await Auth.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }
        if (existingEmail && existingUsername) {
            return res.status(400).json({ message: "Username and email already exists" });
        }

        // Şifreyi hash'leyin
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Kullanıcıyı oluşturun

            const user = await Auth.create({ username, email, password: hashedPassword });
            if (!user) {
                return res.status(500).json({ message: "User not created" });
            }
        

        res.status(201).json(user);
    } catch (error) {
        
        res.status(500).json({ message: 'Server error', error });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Kullanıcıyı veritabanında arayın
        const user = await Auth.findOne({ username });
        if (!user) return res.status(400).json({ message: "User not found" });

        // Şifreyi karşılaştırın
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // JWT oluşturun
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.cookie("jwt", token, { httpOnly: true ,  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
            secure: process.env.NODE_ENV === "production", maxAge: 24 * 60 * 60 * 1000 });

        res.status(200).json({ user, token });
    } catch (error) {
        
        res.status(500).json({ message: 'Server error', error });
    }
};
const logOut = async (req, res) => {
    try {
       
        res.clearCookie('jwt', {
            httpOnly: true,  
           sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
            secure: process.env.NODE_ENV === "production",
            path: '/'       
        });

        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        
        res.status(500).json({ message: 'Server error', error });
    }
};







module.exports = { register, login, logOut};
