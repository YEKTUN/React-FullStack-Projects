const Auth = require('../models/authModel');
const jwt = require('jsonwebtoken');

const checkUser = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
         // Token'in gelip gelmediğini kontrol et

        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        const verifyUser = jwt.verify(token, process.env.JWT_SECRET);
        

        const user = await Auth.findById(verifyUser.id); // verifyUser.id yerine _id kullanın

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user; // Kullanıcıyı req.user içine koy
        next(); // Bir sonraki middleware'e geç
    } catch (error) {
        console.error("JWT Verification Error:", error.message); // Hata mesajını konsola yazdır
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = { checkUser };
